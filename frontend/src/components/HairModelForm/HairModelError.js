import React from 'react'

// Material UI imports
import Box from '@material-ui/core/Box'
import Card from '@material-ui/core/Card'
import Typography from '@material-ui/core/Typography'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'

const HairModelError = ({ error, handleBackToMainPage }) => {
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
              <Button
                onClick={() => handleBackToMainPage()}
                color="default"
                variant="contained"
                fullWidth
                type="submit"
              >
                Palaa takaisin etusivulle
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Box>
  )
}
export default HairModelError
