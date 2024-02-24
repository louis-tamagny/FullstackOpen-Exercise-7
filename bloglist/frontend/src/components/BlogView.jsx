import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { selectBlog, updateBlog } from '../reducers/blogReducer'
import { displayMessage } from '../reducers/notificationReducer'
import blogService from '../services/blogs'
import { selectUser } from '../reducers/userReducer'
import { useState } from 'react'
import {
  Box,
  Button,
  Divider,
  FormControl,
  Input,
  List,
  ListItem,
  ListItemText,
  TextField,
  Typography,
} from '@mui/material'

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
          'success'
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
        displayMessage('comment must be at least one character long', 'error')
      )
      return null
    }
    try {
      await blogService.addComment(blog.id, user, comment)

      dispatch(updateBlog({ ...blog, comments: blog.comments.concat(comment) }))
      dispatch(
        displayMessage(
          `A new comment for ${blog.title} have been added : ${comment}`,
          'success'
        )
      )
      setComment('')
    } catch (error) {
      console.log(error)
    }
  }

  if (!blog) {
    return <div>loading</div>
  }

  return (
    <Box>
      <Typography variant='h2' color='primary' component='div'>
        Blogs
      </Typography>
      <Typography variant='h3' color='primary' component='div'>
        Title: {blog.title} {blog.author}
      </Typography>
      <Typography variant='body1'>
        <Box padding={'5px'}>
          {blog.url}
          <br />
          {blog.likes} likes{' '}
          <Button
            variant='outlined'
            className='likeButton'
            onClick={handleLike}
          >
            like
          </Button>
          <br />
          added by {blog.user.name}
        </Box>
      </Typography>
      <Typography variant='h3' color='primary' component='div'>
        Comments:
      </Typography>
      <form type='submit'>
        <FormControl>
          <TextField
            label='Your comment'
            variant='filled'
            type='text'
            value={comment}
            onChange={(event) => setComment(event.target.value)}
          ></TextField>
          <Button
            variant='outlined'
            type='submit'
            onClick={(event) => handleCreateComment(event)}
          >
            comment
          </Button>
        </FormControl>
        <List>
          {blog.comments.map((comment, i) => (
            <ListItem key={i}>
              {comment}
              <Divider variant='fullWidth' />
            </ListItem>
          ))}
        </List>
      </form>
    </Box>
  )
}

export default BlogView
