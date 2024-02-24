import { useState } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Divider, ListItemText } from '@mui/material'

const Blog = ({ blog, handleRemove }) => {
  return (
    <div className='blog' style={{ width: '100%' }}>
      <div id='titleAuthor'>
        <Link to={'blogs/' + blog.id}>
          {blog.title} {blog.author}
        </Link>
      </div>
    </div>
  )
}

Blog.proptypes = {
  blog: PropTypes.object.isRequired,
  handleRemove: PropTypes.func.isRequired,
}

export default Blog
