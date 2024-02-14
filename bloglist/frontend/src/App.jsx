import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import Login from './components/Login'
import blogService from './services/blogs'
import axios from 'axios'
import { displayMessage } from './reducers/notificationReducer'
import {
  setBlogs,
  addBlog,
  selectBlogs,
  removeBlog,
  updateBlog,
} from './reducers/blogReducer'
import { useDispatch, useSelector } from 'react-redux'

const App = () => {
  const [user, setUser] = useState(null)
  const dispatch = useDispatch()
  const blogs = useSelector(selectBlogs)

  useEffect(() => {
    blogService.getAll().then((response) => {
      dispatch(setBlogs(response))
    })
  }, [])

  useEffect(() => {
    const loggedInUser = window.localStorage.getItem('loggedInUser')
    if (loggedInUser !== null) {
      setUser(JSON.parse(loggedInUser))
    }
  }, [])

  const sortBlogs = () =>
    blogs.toSorted((a, b) => {
      return b.likes - a.likes
    })

  const handleLogout = async (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedInUser')
    setUser(null)
    dispatch(displayMessage('Logout successful !', 'green'))
  }

  const blogFormRef = useRef()

  const handleCreateBlog = async (newBlog) => {
    try {
      const response = await axios.post('/api/blogs', newBlog, {
        headers: { Authorization: 'Bearer ' + user.token },
      })

      blogFormRef.current.toggleVisibility()
      const completeNewUser = response.data
      completeNewUser.user = {
        username: user.username,
        name: user.name,
        id: user.id,
      }
      dispatch(addBlog(completeNewUser))
      dispatch(
        displayMessage(
          `a new blog ${response.data.title} by ${response.data.author} added`,
          'green'
        )
      )
    } catch (error) {
      dispatch(displayMessage(error.response.data.error, 'red'))
    }
  }

  const handleLike = async (blog) => {
    try {
      await axios.put(
        `/api/blogs/${blog.id}`,
        { ...blog, likes: blog.likes + 1 },
        { headers: { Authorization: 'Bearer ' + user.token } }
      )

      dispatch(updateBlog({ ...blog, likes: blog.likes + 1 }))
      dispatch(
        displayMessage(
          `likes for ${blog.title} have been updated : ${blog.likes + 1}`,
          'green'
        )
      )
    } catch (error) {
      dispatch(displayMessage(error.response.data.error, 'red'))
    }
  }

  const handleRemove = async (blog) => {
    if (!window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      return null
    }

    try {
      console.log('trying to delete', blog)
      await axios.delete(`/api/blogs/${blog.id}`, {
        headers: { Authorization: 'Bearer ' + user.token },
      })
      dispatch(removeBlog(blog))
      dispatch(
        displayMessage(`${blog.title} was deleted successfully`, 'green')
      )
    } catch (error) {
      dispatch(displayMessage(error.response.data.error, 'red'))
    }
  }

  if (user === null) {
    return (
      <div>
        <Notification />
        <Login setUser={(user) => setUser(user)} />
      </div>
    )
  }

  return (
    <div>
      <Notification />
      <h2>blogs</h2>
      <p>
        {user.name} logged in
        <button onClick={handleLogout}>Logout</button>
      </p>
      <Togglable buttonLabel='new blog' ref={blogFormRef}>
        <BlogForm handleCreateBlog={handleCreateBlog} />
      </Togglable>
      {sortBlogs().map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          handleLike={() => handleLike(blog)}
          handleRemove={() => handleRemove(blog)}
        />
      ))}
    </div>
  )
}

export default App
