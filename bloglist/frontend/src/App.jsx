import { useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import Login from './components/Login'
import blogService from './services/blogs'
import axios from 'axios'
import { displayMessage } from './reducers/notificationReducer'
import { setUser, selectUser } from './reducers/userReducer'
import {
  setBlogs,
  addBlog,
  selectBlogs,
  removeBlog,
  updateBlog,
} from './reducers/blogReducer'
import { useDispatch, useSelector } from 'react-redux'
import { Route, Routes } from 'react-router-dom'
import UserView from './components/UserView'
import SingleUserView from './components/SingleUserView'
import BlogView from './components/BlogView'
import NavMenu from './components/NavMenu'

const App = () => {
  const dispatch = useDispatch()
  const blogs = useSelector(selectBlogs)
  const user = useSelector(selectUser)

  useEffect(() => {
    blogService.getAll().then((response) => {
      dispatch(setBlogs(response))
    })
  }, [])

  useEffect(() => {
    const loggedInUser = window.localStorage.getItem('loggedInUser')
    if (loggedInUser !== null) {
      dispatch(setUser(JSON.parse(loggedInUser)))
    }
  }, [])

  const sortBlogs = () =>
    blogs.toSorted((a, b) => {
      return b.likes - a.likes
    })

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

  if (user.username === undefined) {
    return (
      <div>
        <Notification />
        <Login />
      </div>
    )
  }

  return (
    <div>
      <NavMenu />
      <Notification />
      <h2>blogs</h2>
      <Routes>
        <Route path='/users' element={<UserView />} />
        <Route path='/users/:userId' element={<SingleUserView />} />
        <Route path='/blogs/:blogId' element={<BlogView />} />
        <Route
          path='/'
          element={
            <>
              <Togglable buttonLabel='new blog' ref={blogFormRef}>
                <BlogForm handleCreateBlog={handleCreateBlog} />
              </Togglable>
              {sortBlogs().map((blog) => (
                <Blog
                  key={blog.id}
                  blog={blog}
                  handleRemove={() => handleRemove(blog)}
                />
              ))}
            </>
          }
        />
      </Routes>
    </div>
  )
}

export default App
