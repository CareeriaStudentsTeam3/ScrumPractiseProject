import React from 'react'

// Component import
import HomeButton from '../HomeButton/HomeButton'

// Material UI imports
import Box from '@material-ui/core/Box'
import Card from '@material-ui/core/Card'
import Typography from '@material-ui/core/Typography'
import CardContent from '@material-ui/core/CardContent'

const HairModelError = ({ error }) => {
  return (
    <Box display="flex" justifyContent="center" mt={4}>
      <Box>
        <Card>
          <CardContent>
            <Typography variant="h4" color="textSecondary" gutterBottom>
              Oops! On tapahtunut virhe!
            </Typography>
            <Typography variant="h5" component="h2"></Typography>
            <Typography variant="body2" component="p">
              {error}
            </Typography>
            <Box mt={2}>
              <HomeButton />
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Box>
  )
}
export default HairModelError
