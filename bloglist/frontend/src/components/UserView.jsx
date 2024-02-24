import { useState, useEffect } from 'react'
import usersService from '../services/users'
import { Link } from 'react-router-dom'
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
} from '@mui/material'

const UserView = () => {
  const [users, setUsers] = useState([])
  useEffect(() => {
    usersService.getAll().then((response) => {
      setUsers(response)
    })
  }, [])
  return (
    <>
      <Typography variant='h2' color='primary'>
        Users
      </Typography>
      <Table>
        <TableBody>
          <TableRow>
            <TableCell></TableCell>
            <TableCell>
              <b>blogs created</b>
            </TableCell>
          </TableRow>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell>
                <Link to={user.id}>{user.name}</Link>
              </TableCell>
              <TableCell>{user.blogs.length}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  )
}

export default UserView
