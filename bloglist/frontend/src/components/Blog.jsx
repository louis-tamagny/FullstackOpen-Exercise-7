import { useState } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const Blog = ({ blog, handleRemove }) => {
  const blogStyle = {
    padding: 5,
    border: '1px solid',
    margin: '2px',
  }

  return (
    <div className='blog' style={blogStyle}>
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
