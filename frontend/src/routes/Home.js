import React from 'react'
import { useHistory } from 'react-router-dom'

// Material UI imports
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'

// Component imports
import HomeInfo from '../components/Home/HomeInfo'
import HomeNavigation from '../components/Home/HomeNavigation'

const Home = () => {
  let history = useHistory()
  const handleNavigation = (navTo) => {
    if (navTo === 'appointment') {
      history.push({
        pathname: '/appointment',
      })
    }
    if (navTo === 'hairmodel') {
      history.push({
        pathname: '/hairmodel',
      })
    }
    if (navTo === 'admin') {
      history.push({
        pathname: '/admin/login',
      })
    }
  }

  return (
    <Box m="auto" mt={6} maxWidth="80%">
      <Grid
        container
        spacing={4}
        justify="center"
        alignItems="center"
        direction="column"
      >
        <Grid container item xs={12} xl={6}>
          <HomeInfo />
        </Grid>
        <Grid container item xs={12} xl={6}>
          <HomeNavigation handleNavigation={handleNavigation} />
        </Grid>
      </Grid>
    </Box>
  )
}

export default Home