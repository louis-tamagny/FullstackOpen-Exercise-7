import { useEffect, useState } from 'react'
import userService from '../services/users'
import { useParams } from 'react-router-dom'

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
    <div>
      <h3>added blogs</h3>
      <ul>
        {user.blogs.map((b) => (
          <li key={b.id}>{b.title}</li>
        ))}
      </ul>
    </div>
  )
}

export default SingleUserView
