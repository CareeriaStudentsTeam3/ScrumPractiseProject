import React, { useEffect, useState } from 'react'

// React-router-dom imports
import { useHistory, Redirect } from 'react-router-dom'

// Service import
import logoutService from '../services/logout'

// Componen imports
import LogoutButton from '../components/admin/LogoutButton/LogoutButton'

// Material UI imports
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'

const Admin = () => {
  let history = useHistory()

  const [redirect, setRedirect] = useState(false)
  const [user, setUser] = useState(null)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('user')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      if (user.login_success === true) {
        console.log('user', user)
        setUser(user)
      }
    }
    if (
      JSON.parse(loggedUserJSON) === null ||
      !JSON.parse(loggedUserJSON).login_success
    ) {
      logoutService.logout()
      setRedirect(true)
    }
  }, [])

  if (redirect) {
    return <Redirect to="/admin/login" />
  }

  return (
    <Grid
      container
      spacing={3}
      direction="column"
      alignItems="center"
      justify="center"
      style={{ minHeight: '100vh' }}
    >
      <Grid item xs={3}>
        <h1>HELLO {user ? `${user.username}` : ''}</h1>
      </Grid>
      <Grid item xs={3}>
        <LogoutButton />
      </Grid>
      <Grid item xs={3}>
        <Button
          onClick={() => history.push('/')}
          variant="contained"
          color="primary"
        >
          Palaa etusivulle
        </Button>
      </Grid>
      <Grid item xs={3}>
        <Button
          onClick={() => history.push('/admin/hairmodel')}
          variant="contained"
          color="secondary"
        >
          Hiusmallit
        </Button>
      </Grid>
      <Grid item xd={3}>
        <Button
          onClick={() => history.push('/admin/appointment')}
          variant="contained"
          color="secondary"
        >
          Varaukset
        </Button>
      </Grid>
      <Grid item xd={3}>
        <Button
          onClick={() => history.push('/admin/service')}
          variant="contained"
          color="secondary"
        >
          Palvelut
        </Button>
      </Grid>
      <Grid item xd={3}>
        <Button
          onClick={() => history.push('/admin/date')}
          variant="contained"
          color="secondary"
        >
          Vapaat ajat
        </Button>
      </Grid>
      {user && user.user_group[0] !== 'student' ? (
        <Grid item xd={3}>
          <Button
            onClick={() => history.push('/admin/user')}
            variant="contained"
            color="secondary"
          >
            Käyttäjät
          </Button>
        </Grid>
      ) : null}
    </Grid>
  )
}

export default Admin
