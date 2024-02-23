import { useState, useEffect } from 'react'
import usersService from '../services/users'
import { Link } from 'react-router-dom'

const UserView = () => {
  const [users, setUsers] = useState([])
  useEffect(() => {
    usersService.getAll().then((response) => {
      setUsers(response)
    })
  }, [])
  return (
    <>
      <h2>Users</h2>
      <table>
        <tbody>
          <tr>
            <td></td>
            <td>
              <b>blogs created</b>
            </td>
          </tr>
          {users.map((user) => (
            <tr key={user.id}>
              <td>
                <Link to={user.id}>{user.name}</Link>
              </td>
              <td>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}

export default UserView
