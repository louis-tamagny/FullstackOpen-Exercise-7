import { useState } from 'react'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { displayMessage } from '../reducers/notificationReducer'

const Login = ({ setUser }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const response = await axios.post('/api/login', {
        username: username,
        password: password,
      })

      if (response.data) {
        setUser(response.data)
        setUsername('')
        setPassword('')
        window.localStorage.setItem(
          'loggedInUser',
          JSON.stringify(response.data)
        )
        dispatch(displayMessage('Login successful !', 'green'))
      }
    } catch (error) {
      dispatch(displayMessage(error.response.data.error, 'red'))
    }
  }

  return (
    <div>
      <h2>Log in to application</h2>
      <form id='loginForm' type='submit' onSubmit={handleLogin}>
        <label>Username: </label>
        <input
          id='usernameInput'
          value={username}
          onChange={({ target }) => setUsername(target.value)}
          type='text'
        ></input>
        <br />
        <label>Password: </label>
        <input
          id='passwordInput'
          value={password}
          onChange={({ target }) => setPassword(target.value)}
          type='password'
        ></input>
        <br />
        <input id='loginFormSubmit' type='submit' value='Login'></input>
      </form>
    </div>
  )
}

export default Login
