import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { selectBlog, updateBlog } from '../reducers/blogReducer'
import { displayMessage } from '../reducers/notificationReducer'
import blogService from '../services/blogs'
import { selectUser } from '../reducers/userReducer'
import { useState } from 'react'

const BlogView = () => {
  const params = useParams()
  const blog = useSelector((state) => selectBlog(state, params.blogId))
  const user = useSelector(selectUser)
  const [comment, setComment] = useState('')
  const dispatch = useDispatch()

  const handleLike = async () => {
    try {
      await blogService.updateBlog({ ...blog, likes: blog.likes + 1 }, user)

      dispatch(updateBlog({ ...blog, likes: blog.likes + 1 }))
      dispatch(
        displayMessage(
          `likes for ${blog.title} have been updated : ${blog.likes + 1}`,
          'green'
        )
      )
    } catch (error) {
      console.log(error)
      //dispatch(displayMessage(error.response.data.error, 'red'))
    }
  }

  const handleCreateComment = async (event) => {
    event.preventDefault()
    if (comment.length === 0) {
      dispatch(
        displayMessage('comment must be at least one character long', 'red')
      )
    }
    try {
      await blogService.addComment(blog.id, user, comment)

      dispatch(updateBlog({ ...blog, comments: blog.comments.concat(comment) }))
      dispatch(
        displayMessage(
          `A new comment for ${blog.title} have been added : ${comment}`,
          'green'
        )
      )
    } catch (error) {
      console.log(error)
    }
  }

  if (!blog) {
    return <div>loading</div>
  }

  return (
    <div>
      <h2>
        {blog.title} {blog.author}
      </h2>
      <p>
        {blog.url}
        <br />
        {blog.likes} likes{' '}
        <button className='likeButton' onClick={handleLike}>
          like
        </button>
        <br />
        added by {blog.user.name}
      </p>
      <h3>comments</h3>
      <form>
        <input
          type='text'
          value={comment}
          onChange={(event) => setComment(event.target.value)}
        ></input>
        <button type='submit' onClick={(event) => handleCreateComment(event)}>
          comment
        </button>
      </form>
      <ul>
        {blog.comments.map((comment, i) => (
          <li key={i}>{comment}</li>
        ))}
      </ul>
    </div>
  )
}

export default BlogView
