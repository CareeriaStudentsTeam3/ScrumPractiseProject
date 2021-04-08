import React from 'react'

// Material UI imports
import Box from '@material-ui/core/Box'
import Card from '@material-ui/core/Card'
import Typography from '@material-ui/core/Typography'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'

const HairModelConfirm = ({ hairModel, handleBackToMainPage }) => {
  console.log('name', hairModel)
  return (
    <Box display="flex" justifyContent="center" mt={4}>
      <Box>
        <Card>
          <CardContent>
            <Typography variant="h4" color="textPrimary" gutterBottom>
              Kiitos rekisteröitymisestä{' '}
              {`${hairModel.first_name} ${hairModel.last_name}`}!
            </Typography>
            <Typography variant="h5" component="h2"></Typography>
            <Typography color="textSecondary" gutterBottom>
              Olemme lähettäneet teille vahvistuksen osoitteeseen:{' '}
              {hairModel.email}.
            </Typography>
            <Typography color="textSecondary" gutterBottom>
              Muistakaa tarkistaa myös roskaposti jos vahvistusta ei näy.
            </Typography>
            <Typography color="textSecondary" gutterBottom>
              Olemme teihin yhteydessä tarvittaessa puhelimitse tai
              sähköpostilla.
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

export default HairModelConfirm
