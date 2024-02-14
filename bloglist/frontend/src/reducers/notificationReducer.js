import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: { text: '', color: 'red' },
  reducers: {
    changeTo(state, action) {
      state.text = action.payload.text
      state.color = action.payload.color
    },
    clear(state) {
      state.text = ''
    },
  },
  selectors: {
    selectText(state) {
      return state.text
    },
    selectColor(state) {
      return state.color
    },
  },
})

export const { changeTo, clear } = notificationSlice.actions

export const displayMessage = (text, color) => (dispatch) => {
  dispatch(changeTo({ text, color }))
  setTimeout(() => dispatch(clear()), 5000)
}

export const { selectText, selectColor } = notificationSlice.selectors
export default notificationSlice.reducer
