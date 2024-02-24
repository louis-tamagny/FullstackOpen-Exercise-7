import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: { text: '', severity: 'success' },
  reducers: {
    changeTo(state, action) {
      state.text = action.payload.text
      state.severity = action.payload.severity
    },
    clear(state) {
      state.text = ''
    },
  },
  selectors: {
    selectText(state) {
      return state.text
    },
    selectSeverity(state) {
      return state.severity
    },
  },
})

export const { changeTo, clear } = notificationSlice.actions

export const displayMessage = (text, severity) => (dispatch) => {
  dispatch(changeTo({ text, severity }))
  setTimeout(() => dispatch(clear()), 5000)
}

export const { selectText, selectSeverity } = notificationSlice.selectors
export default notificationSlice.reducer
