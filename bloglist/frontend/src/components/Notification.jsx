import { useSelector } from 'react-redux'
import { selectText, selectColor } from '../reducers/notificationReducer'

const Notification = () => {
  const message = useSelector(selectText)
  const color = useSelector(selectColor)

  if (message !== '') {
    return (
      <p id='notification' style={{ color, borderColor: color }}>
        {message}
      </p>
    )
  }
}

export default Notification
