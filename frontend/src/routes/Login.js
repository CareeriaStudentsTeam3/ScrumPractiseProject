import React, { useState, useEffect } from 'react'

// React-router-dom imports
import { Redirect } from 'react-router-dom'

// Component imports
import LoginForm from '../components/admin/LoginForm/LoginForm'

// Material UI imports
import Grid from '@material-ui/core/Grid'

const Login = () => {
  const [user, setUser] = useState(null)
  const [redirect, setRedirect] = useState(false)

  const saveLogginInfo = (userLogin) => {
    if (userLogin) {
      window.localStorage.setItem('user', JSON.stringify(userLogin))
    } else {
      null
    }
  }

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('user')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      console.log('user', user.username)
      setUser(user.username)
      setRedirect(true)
    }
    if (!loggedUserJSON) {
      setRedirect(false)
    }
  }, [])

  if (redirect || user) {
    return <Redirect to="/admin/hairmodel" />
  }

  return (
    <Grid container justify="center" alignItems="center">
      <LoginForm saveLogginInfo={saveLogginInfo} setRedirect={setRedirect} />
    </Grid>
  )
}

export default Login
