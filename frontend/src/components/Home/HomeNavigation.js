import React from 'react'

// Material UI imports
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'

const HomeNavigation = ({ handleNavigation }) => {
  return (
    <Grid container spacing={3} justify="center" alignItems="center">
      <Grid container spacing={3} justify="flex-start" alignItems="center">
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
      <Box m="auto" border={5} textAlign="center" borderColor="primary.main" maxWidth='250px' minWidth='250px' height='250px' margin='10px'>
        <Typography variant="h6" component="p" gutterBottom>
          Varaa aika ryhmälle
        </Typography>
        <Typography variant="body2" component="p" gutterBottom>
          Tarjoamme opetussuunnitelman mukaisesti tarjolla olevia hiuspalveluita 3-8 henkilön ryhmille joko
          koulun tiloissa tai erikseen sovitussa paikassa. Lisätietoa tarjoamistamme hiuspalveluista saat soittamalla tai
          lähettämällä sähköpostia.
        </Typography>
        <Button
          onClick={() => handleNavigation('appointment')}
          fullWidth
          style={{ marginTop: '5px' }}
          size="large"
          variant="contained"
          color="primary"
        >
          Ajanvaraukseen tästä
        </Button>
      </Box>
      <Box m="auto" border={5} textAlign="center" borderColor="primary.main" maxWidth='250px' minWidth='250px' height='250px' margin='10px'>
        <Typography variant="h6" component="p" gutterBottom>
            Rekisteröidy hiusmalliksi
        </Typography>
        <Typography variant="body2" component="p" gutterBottom>
            Tarvitsemme aika ajoin hiusmalleja opiskelijatöitä varten. Rekisteröitymislomakkeen täyttämällä voit
            ilmoittautua vapaaehtoiseksi hiusmalliksi. Lisätietoa hiusmalliksi rekisteröitymisestä saat soittamalla tai
            lähettämällä sähköpostia.
        </Typography>
        <Button
          onClick={() => handleNavigation('hairmodel')}
          fullWidth
          style={{ marginTop: '5px' }}
          size="large"
          variant="contained"
          color="primary"
        >
          Rekisteröidy tästä
        </Button>
      </Box>
      <Box m="auto" border={5} textAlign="center" borderColor="primary.main" maxWidth='250px' minWidth='250px' height='250px' margin='10px'>
        <Typography variant="h6" component="p" gutterBottom>
              Yhteystiedot
        </Typography>
        <Typography variant="body1" component="p" gutterBottom>
            Osoite
        </Typography>
        <Typography variant="body2" component="p" gutterBottom>
            Linnankoskenkatu 20, 3. krs,
        </Typography>
        <Typography variant="body2" component="p" gutterBottom>
          06100 Porvoo
        </Typography>
        <Typography variant="body1" component="p" gutterBottom>
          Puhelin
        </Typography>
        <Typography variant="body2" component="p" gutterBottom>
        0400 360 622
        </Typography>
        <Typography variant="body1" component="p" gutterBottom>
          Sähköposti
        </Typography>
        <Typography variant="body2" component="p" gutterBottom>
        CareeriaCare.Pomotalo@careeria.fi
        </Typography>
      </Box>
    </Grid>
  )
}

export default HomeNavigation
