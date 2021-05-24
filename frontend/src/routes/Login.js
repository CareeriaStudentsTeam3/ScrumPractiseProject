import React, { useState, useEffect } from 'react'

// React-router-dom imports
import { Redirect } from 'react-router-dom'

// Service imports
import logoutService from '../services/logout'
import loginService from '../services/login'

// Component imports
import LoginForm from '../components/admin/LoginForm/LoginForm'
import HomeInfo from '../components/Home/HomeInfo'

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

  const handleSubmit = async (values, { setErrors }) => {
    try {
      const user = await loginService.logIn({
        username: values.username,
        password: values.password,
      })
      console.log('user', user)
      saveLogginInfo(user)
      setRedirect(true)
    } catch (error) {
      setRedirect(false)
      setErrors({
        username: 'Väärä käyttäjätunnus tai salasana',
        password: 'Väärä käyttäjätunnus tai salasana',
      })
    }
  }

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('user')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      if (user.login_success === true) {
        console.log('user', user.username)
        setUser(user.username)
        setRedirect(true)
      }
    }
    if (
      JSON.parse(loggedUserJSON) === null ||
      !JSON.parse(loggedUserJSON).login_success
    ) {
      logoutService.logout()
      setRedirect(false)
    }
  }, [])

  if (redirect) {
    return <Redirect to="/admin" />
  }

  return (
    <Grid container justify="center" alignItems="center">
      <HomeInfo />
      {console.log(user)}
      <LoginForm handleSubmit={handleSubmit} />
    </Grid>
  )
}

export default Login
