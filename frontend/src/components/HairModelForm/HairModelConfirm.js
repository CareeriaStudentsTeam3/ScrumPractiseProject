import React from 'react'

// Component import
import HomeButton from '../HomeButton/HomeButton'

// Material UI imports
import Box from '@material-ui/core/Box'
import Card from '@material-ui/core/Card'
import Typography from '@material-ui/core/Typography'
import CardContent from '@material-ui/core/CardContent'

const HairModelConfirm = ({ hairModel }) => {
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
              <HomeButton />
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Box>
  )
}

export default HairModelConfirm
