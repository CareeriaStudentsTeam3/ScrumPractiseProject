import React from 'react'

// Material UI imports
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Card from '@material-ui/core/Card'

const HomeNavigation = ({ handleNavigation }) => {
  return (
    <Grid container spacing={3} justify="center" alignItems="center">
      <Grid container item xs={12} md={6}>
        <Box maxWidth="60%" m="auto">
          <Box mb={2}>
            <Button
              onClick={() => handleNavigation('appointment')}
              fullWidth
              size="large"
              variant="contained"
              color="primary"
            >
              Varaa aika ryhmälle
            </Button>
          </Box>
          <Box mb={2}>
            <Button
              onClick={() => handleNavigation('hairmodel')}
              fullWidth
              size="large"
              variant="contained"
              color="primary"
            >
              Rekisteröidy hiusmalliksi
            </Button>
          </Box>
          <Button
            onClick={() => handleNavigation('admin')}
            fullWidth
            size="large"
            variant="contained"
            color="primary"
          >
            Kirjaudu ylläpitoon
          </Button>
        </Box>
      </Grid>
      <Grid container item xs={12} md={6}>
        <Box m="auto" border={5} borderColor="primary.main">
          <Card>
            <List dense>
              <ListItem>
                <ListItemText
                  primary="Osoite"
                  secondary="Linnankoskenkatu 20, 3. krs"
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Postitoimipaikka"
                  secondary="06100 Porvoo"
                />
              </ListItem>
              <ListItem>
                <ListItemText primary="Puhelin" secondary="0400 360 622" />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Sähköposti"
                  secondary="CareeriaCare.Pomotalo@careeria.fi"
                />
              </ListItem>
            </List>
          </Card>
        </Box>
      </Grid>
    </Grid>
  )
}

export default HomeNavigation
