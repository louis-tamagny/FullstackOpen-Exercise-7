import { useState, useEffect } from 'react'
import usersService from '../services/users'

const UserView = () => {
  const [users, setUsers] = useState([])
  useEffect(() => {
    usersService.getAll().then((response) => {
      console.log(response)
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
            <tr>
              <td>{user.name}</td>
              <td>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}

export default UserView
