import React, { useEffect, useState } from 'react'

// React-router-dom imports
import { useHistory, Redirect } from 'react-router-dom'

// Service import
import logoutService from '../services/logout'

// Componen imports
import LogoutButton from '../components/admin/LogoutButton/LogoutButton'
import HomeButton from '../components/HomeButton/HomeButton'

// Material UI imports
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'

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
      <Grid m="auto" textalign="center">
        <Typography variant="h3" color="textPrimary" gutterBottom>
          CareeriaCare hiusalan palvelut
        </Typography>
      </Grid>
      <Grid container justify="flex-end">
        <h3 style={{ margin: '10px', marginRight: '50px' }}>
          Käyttäjä: {user ? `${user.username}` : ''}{' '}
        </h3>
      </Grid>
      <Grid container justify="flex-end">
        <LogoutButton />
        <HomeButton />
      </Grid>
      <Grid container justify="center" alignItems="center" direction="row">
        <Box m="auto" textAlign="center">
          <Typography variant="h5" component="p" gutterBottom>
            Toimintojen ylläpito
          </Typography>
          <Typography variant="body1" component="p" gutterBottom>
            Valitse osio, jota haluat tarkastella.
          </Typography>
          <Button
            onClick={() => history.push('/admin/hairmodel')}
            variant="contained"
            color="primary"
            size="large"
            style={{ margin: '10px' }}
          >
            Hiusmallit
          </Button>
          <Button
            onClick={() => history.push('/admin/appointment')}
            variant="contained"
            color="primary"
            size="large"
            style={{ margin: '10px' }}
          >
            Varaukset
          </Button>
          <Button
            onClick={() => history.push('/admin/service')}
            variant="contained"
            color="primary"
            size="large"
            style={{ margin: '10px' }}
          >
            Palvelut
          </Button>
          <Button
            onClick={() => history.push('/admin/date')}
            variant="contained"
            color="primary"
            size="large"
            style={{ margin: '10px' }}
          >
            Vapaat ajat
          </Button>
          {user && user.user_group[0] !== 'student' ? (
            <Button
              onClick={() => history.push('/admin/user')}
              variant="contained"
              color="primary"
              size="large"
              style={{ margin: '10px' }}
            >
              Käyttäjät
            </Button>
          ) : null}
        </Box>
      </Grid>
    </Grid>
  )
}

export default Admin
