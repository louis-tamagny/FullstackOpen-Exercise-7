import { useState } from 'react'
import PropTypes from 'prop-types'
import { TextField, Button, FormControl } from '@mui/material'

const BlogForm = ({ handleCreateBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const createBlog = (event) => {
    event.preventDefault()

    handleCreateBlog({ title, author, url })

    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div>
      <h2>Create new blog</h2>
      <form onSubmit={createBlog}>
        <FormControl fullWidth={true}>
          <TextField
            variant='filled'
            label='Title:'
            id='titleInput'
            type='text'
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
          <br />
          <TextField
            variant='filled'
            label='Author:'
            id='authorInput'
            type='text'
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
          <br />
          <TextField
            variant='filled'
            label='url:'
            id='urlInput'
            type='text'
            value={url}
            onChange={({ target }) => setUrl(target.value)}
          />
          <br />
          <Button id='submitInput' type='submit'>
            Create new blog
          </Button>
        </FormControl>
      </form>
    </div>
  )
}

BlogForm.proptypes = {
  handleCreateBlog: PropTypes.func.isRequired,
}

export default BlogForm
