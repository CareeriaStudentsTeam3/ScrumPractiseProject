import React from 'react'

// Material UI Imports
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'

const ServiceSelect = ({ services, handleService }) => {
  return (
    <Box display="flex" justifyContent="center" textAlign="center">
      <CardContent>
        <Typography variant="h4" color="textSecondary" gutterBottom>
          Palvelu
        </Typography>
        <Typography variant="h5" component="h2"></Typography>
        <Typography color="textSecondary" gutterBottom>
          Valitse palvelu
        </Typography>
        <Grid container item spacing={2} xs={12}>
          {services.map((item) => (
            <Grid key={item.id} item xs={6}>
              <Card>
                <CardContent>
                  <Typography variant="h5" color="textSecondary" gutterBottom>
                    {item.service_name}
                  </Typography>
                  <Typography variant="h5" component="h2"></Typography>
                  <Typography color="textSecondary" gutterBottom>
                    Jotai infoo?
                  </Typography>
                  <Typography variant="body2" component="p">
                    Kesto: {item.duration} min
                  </Typography>
                  <Typography variant="body2" component="p">
                    Hinta: {item.price}€
                  </Typography>
                  <Button
                    variant="contained"
                    onClick={() => handleService(item.id, item.duration)}
                  >
                    Valitse
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </Box>
  )
}

export default ServiceSelect
