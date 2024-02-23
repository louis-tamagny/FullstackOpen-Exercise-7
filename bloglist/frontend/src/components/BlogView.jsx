import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { selectBlog, updateBlog } from '../reducers/blogReducer'
import { displayMessage } from '../reducers/notificationReducer'
import blogService from '../services/blogs'
import { selectUser } from '../reducers/userReducer'

const BlogView = () => {
  const params = useParams()
  const blog = useSelector((state) => selectBlog(state, params.blogId))
  const user = useSelector(selectUser)
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
    </div>
  )
}

export default BlogView
