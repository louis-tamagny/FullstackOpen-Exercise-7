import { useEffect, useState } from 'react'
import userService from '../services/users'
import { useParams } from 'react-router-dom'
import { Divider, List, ListItemText, Typography, Box } from '@mui/material'

const SingleUserView = () => {
  const [user, setUser] = useState({})
  const params = useParams()

  useEffect(() => {
    userService
      .getUser(params.userId)
      .then((res) => setUser(res))
      .catch((err) => console.log(err))
  }, [])

  if (!user.blogs) return <h3>loading</h3>

  return (
    <Box>
      <Typography variant='h3' color='primary'>
        Added blogs
      </Typography>
      <List divider={<Divider />}>
        {user.blogs.map((b) => (
          <ListItemText key={b.id}>{b.title}</ListItemText>
        ))}
      </List>
    </Box>
  )
}

export default SingleUserView
