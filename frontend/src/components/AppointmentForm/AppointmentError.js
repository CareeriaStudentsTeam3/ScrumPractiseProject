import React from 'react'

// Component import
import HomeButton from '../HomeButton/HomeButton'

// Material UI imports
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import CardContent from '@material-ui/core/CardContent'

const AppointmentError = ({ error }) => {
  return (
    <Box justifyContent="center">
      <CardContent>
        <Box textAlign="center">
          <Typography variant="h4" color="textSecondary" gutterBottom>
            Oops! On tapahtunut virhe!
          </Typography>
          <Typography variant="h5" component="h2"></Typography>
          <Typography variant="body2" component="p">
            {error}
          </Typography>
        </Box>
        <Box mt={2}>
          <HomeButton />
        </Box>
      </CardContent>
    </Box>
  )
}

export default AppointmentError
