import React from 'react'

// Component impport
import HomeButton from '../HomeButton/HomeButton'

// Material UI imports
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import CardContent from '@material-ui/core/CardContent'

const AppointmentConfirm = ({ appointment }) => {
  return (
    <Box justifyContent="center">
      <CardContent>
        <Box textAlign="center">
          <Typography variant="h4" color="textPrimary" gutterBottom>
            Kiitos varauksestanne{' '}
            {`${appointment.first_name} ${appointment.last_name}`}!
          </Typography>
          <Typography variant="h5" component="h2"></Typography>
          <Typography color="textSecondary" gutterBottom>
            Olemme lähettäneet teille vahvistuksen osoitteeseen:{' '}
            {appointment.email}.
          </Typography>
          <Typography color="textSecondary" gutterBottom>
            Muistakaa tarkistaa myös roskaposti jos vahvistusta ei näy.
          </Typography>
          <Typography color="textSecondary" gutterBottom>
            Olemme teihin yhteydessä tarvittaessa puhelimitse tai sähköpostilla.
          </Typography>
          <Box mt={2}>
            <HomeButton />
          </Box>
        </Box>
      </CardContent>
    </Box>
  )
}

export default AppointmentConfirm
