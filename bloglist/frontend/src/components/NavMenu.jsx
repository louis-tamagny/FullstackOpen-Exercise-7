import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { selectUser, setUser } from '../reducers/userReducer'
import { displayMessage } from '../reducers/notificationReducer'
import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material'

const NavMenu = () => {
  const dispatch = useDispatch()
  const user = useSelector(selectUser)

  const handleLogout = async (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedInUser')
    dispatch(setUser({}))
    dispatch(displayMessage('Logout successful !', 'green'))
  }

  return (
    <AppBar position='static'>
      <Toolbar>
        <Link to=''>
          <Button color='inherit'>blogs</Button>
        </Link>
        <Link to='users'>
          <Button color='inherit'>users</Button>
        </Link>
        <Typography
          textAlign='right'
          width='100%'
          component='div'
          color='inherit'
        >
          {user.name}
        </Typography>
        <Button color='inherit' onClick={handleLogout}>
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  )
}

export default NavMenu
