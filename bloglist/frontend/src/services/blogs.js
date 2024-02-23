import axios from 'axios'
const baseUrl = '/api/blogs'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then((response) => response.data)
}

const updateBlog = async (blog, user) => {
  await axios.put(`/api/blogs/${blog.id}`, blog, {
    headers: { Authorization: 'Bearer ' + user.token },
  })
}

export default { getAll, updateBlog }
