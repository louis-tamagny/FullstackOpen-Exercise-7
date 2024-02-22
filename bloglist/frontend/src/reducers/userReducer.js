import { createSlice } from '@reduxjs/toolkit'

const userSlice = createSlice({
  name: 'user',
  initialState: { value: {} },
  reducers: {
    setUser(state, { payload }) {
      state.value = payload
    },
  },
  selectors: {
    selectUser(state) {
      return state.value
    },
  },
})

export const { selectUser } = userSlice.selectors
export const { setUser } = userSlice.actions
export default userSlice.reducer
