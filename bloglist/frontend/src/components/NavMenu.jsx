import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { selectUser, setUser } from '../reducers/userReducer'
import { displayMessage } from '../reducers/notificationReducer'

const NavMenu = () => {
  const dispatch = useDispatch()
  const user = useSelector(selectUser)

  const handleLogout = async (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedInUser')
    dispatch(setUser({}))
    dispatch(displayMessage('Logout successful !', 'green'))
  }

  const displayStyle = {
    backgroundColor: 'lightGrey',
  }

  return (
    <div style={displayStyle}>
      <Link to=''>blogs</Link> <Link to='users'>users</Link>{' '}
      <>
        {user.name} logged in <button onClick={handleLogout}>Logout</button>
      </>
    </div>
  )
}

export default NavMenu
