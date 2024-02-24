import { useSelector } from 'react-redux'
import { selectText, selectSeverity } from '../reducers/notificationReducer'
import { Alert } from '@mui/material'

const Notification = () => {
  const message = useSelector(selectText)
  const severity = useSelector(selectSeverity)

  if (message !== '') {
    return (
      <Alert id='notification' severity={severity}>
        {message}
      </Alert>
    )
  }
}

export default Notification
