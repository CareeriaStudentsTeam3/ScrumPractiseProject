import React from 'react'

// Material UI imports
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Card from '@material-ui/core/Card'
import Typography from '@material-ui/core/Typography'

const HomeNavigation = ({ handleNavigation }) => {
  return (
    <Grid container spacing={3} justify="center" alignItems="center">
      <Grid container spacing={3} justify="left" alignItems="center">
        <Button
          onClick={() => handleNavigation('admin')}
          style={{ maxWidth:'250px', minWidth:'50px', margin: '20px' }}
          size="small"
          variant="contained"
          color="primary"
        >
          Kirjaudu ylläpitoon
        </Button>
      </Grid>
      <Box m="auto" border={5} textAlign="center" borderColor="primary.main" maxWidth='250px' height='300px' margin='10px'>
        <Box mb={2}>
          <Card>
            <Typography variant="h6" component="p" gutterBottom>
              Varaa aika ryhmälle
            </Typography>
            <Typography variant="body2" component="p" gutterBottom>
              Tarjoamme opetussuunnitelman mukaisesti tarjolla olevia hiuspalveluita 3-8 henkilön ryhmille joko
              koulun tiloissa tai ryhmän kanssa erikseen sovittavassa paikassa. Ajanvaraukseen pääset painamalla
              alla olevaa painiketta. Lisää tietoa tarjoamistamme hiuspalveluist saat soittamalla meille.
            </Typography>
            <Button
              onClick={() => handleNavigation('appointment')}
              fullWidth
              style={{ marginTop: '20px' }}
              size="large"
              variant="contained"
              color="primary"
            >
              Varaa aika ryhmälle
            </Button>
          </Card>
        </Box>
      </Box>
      <Box m="auto" border={5} textAlign="center" borderColor="primary.main" maxWidth='250px' height='300px' margin='10px'>
        <Box mb={2}>
          <Card>
            <Typography variant="h6" component="p" gutterBottom>
                Rekisteröidy hiusmalliksi
            </Typography>
            <Typography variant="body2" component="p" gutterBottom>
                Tarvitsemme aika ajoin hiusmalleja opiskelijatöitä varten. Mikäli haluat ilmoittautua vapaaehtoiseksi
                hiusmalliksi rekisteriimme, voit täyttää rekisteröitymislomakkeen painamalla alla olevaa painiketta.
                Lisätietoa hiusmalliksi rekisteröitymisestä saat soittamalla meille.
            </Typography>
            <Button
              onClick={() => handleNavigation('hairmodel')}
              fullWidth
              style={{ marginTop: '20px' }}
              size="large"
              variant="contained"
              color="primary"
            >
              Rekisteröitymislomake
            </Button>
          </Card>
        </Box>
      </Box>
      <Box m="auto" border={5} textAlign="center" borderColor="primary.main" maxWidth='250px' margin='10px'>
        <Card>
          <Typography variant="h6" component="p" gutterBottom>
                Yhteystiedot
          </Typography>
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
  )
}

export default HomeNavigation
