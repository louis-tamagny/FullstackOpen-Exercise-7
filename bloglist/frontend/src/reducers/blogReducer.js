import { createSlice } from '@reduxjs/toolkit'
import blogsService from '../services/blogs'

const blogSlice = createSlice({
  name: 'blogs',
  initialState: { listBlogs: [] },
  reducers: {
    addBlog(state, { payload }) {
      state.listBlogs.push(payload)
    },
    setBlogs(state, { payload }) {
      state.listBlogs = payload
    },
    removeBlog(state, { payload }) {
      state.listBlogs = state.listBlogs.filter((b) => b.id !== payload.id)
    },
    updateBlog(state, { payload }) {
      state.listBlogs[state.listBlogs.findIndex((b) => b.id === payload.id)] =
        payload
    },
  },
  selectors: {
    selectBlogs(state) {
      return state.listBlogs
    },
    selectBlog(state, blogId) {
      return state.listBlogs.find((b) => b.id === blogId)
    },
  },
})

export const { addBlog, setBlogs, removeBlog, updateBlog } = blogSlice.actions
export const { selectBlogs, selectBlog } = blogSlice.selectors
export default blogSlice.reducer
