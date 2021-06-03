/* eslint-disable indent */
import React from 'react'

// Material UI Imports
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'

const ServiceSelect = ({
  services,
  handleService,
  handleNavClick,
  isLoading,
}) => {
  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" textAlign="center">
        <CardContent>
          <CircularProgress />
        </CardContent>
      </Box>
    )
  }

  if (services.length === 0 && !isLoading) {
    return (
      <Box display="flex" justifyContent="center" textAlign="center">
        <CardContent>
          <Typography variant="h4" color="textPrimary" gutterBottom>
            Palvelu
          </Typography>
          <Typography variant="h5" component="h2"></Typography>
          <Typography color="textPrimary" gutterBottom>
            Valitse palvelu
          </Typography>
          <Typography variant="body2" component="p" gutterBottom>
            Valitettavasti vapaita palveluita annetulle ryhmäkoolle ei ole...
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleNavClick('group')}
          >
            Edellinen
          </Button>
        </CardContent>
      </Box>
    )
  }

  return (
    <Box display="flex" justifyContent="center" textAlign="center">
      <CardContent>
        <Typography variant="h4" color="textPrimary" gutterBottom>
          Palvelu
        </Typography>
        <Typography variant="h5" component="h2"></Typography>
        <Typography color="textPrimary" gutterBottom>
          Valitse palvelu
        </Typography>
        <Grid container spacing={2}>
          {services.length === 1
            ? services.map((item) => (
                <Grid key={item.id} item xs={12}>
                  <Card border={5} bordercolor="primary">
                    <CardContent>
                      <Typography variant="h5" color="textPrimary" gutterBottom>
                        {item.service_name}
                      </Typography>
                      <Typography variant="h5" component="h2"></Typography>
                      <Typography color="textSecondary" gutterBottom>
                        Palvelun kuvaus.
                      </Typography>
                      <Typography variant="body2" component="p">
                        Kesto: {item.duration} min
                      </Typography>
                      <Typography variant="body2" component="p">
                        Hinta: {item.price}€/hlö
                      </Typography>
                      <Button
                        color="primary"
                        variant="contained"
                        onClick={() =>
                          handleService(
                            item.id,
                            item.duration,
                            item.service_name
                          )
                        }
                      >
                        Valitse
                      </Button>
                    </CardContent>
                  </Card>
                </Grid>
              ))
            : services.map((item) => (
                <Grid key={item.id} item xs={6}>
                  <Card>
                    <CardContent>
                      <Typography variant="h5" color="textPrimary" gutterBottom>
                        {item.service_name}
                      </Typography>
                      <Typography variant="h5" component="h2"></Typography>
                      <Typography color="textSecondary" gutterBottom>
                        Palvelun kuvaus.
                      </Typography>
                      <Typography variant="body2" component="p">
                        Kesto: {item.duration} min
                      </Typography>
                      <Typography variant="body2" component="p">
                        Hinta: {item.price}€/hlö
                      </Typography>
                      <Button
                        color="primary"
                        variant="contained"
                        onClick={() =>
                          handleService(
                            item.id,
                            item.duration,
                            item.service_name
                          )
                        }
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
