import React from 'react'

// Material UI imports
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'

const HomeNavigation = ({ handleNavigation }) => {
  return (
    <Grid container spacing={8} justify="center" alignItems="center">
      <Grid
        container
        item
        spacing={0}
        xs={11}
        justify="flex-start"
        alignItems="center"
      >
        <Typography variant="body1" component="p" gutterBottom align="center">
          CareeriaCare hiusalan palvelut tuottaa hiusalan palveluita
          opiskelijatöinä. Opetussuunnitelmasta riippuen palveluvalikoimaamme
          kuuluvat muun muassa: Hiusten hemmottelupaketti (15e/hlö, kesto 2-3h),
          Kampauspaketti (20e/hlö, kesto 2-3h) ja Uusi tyyli-paketti (25e/hlö,
          kesto 3-4h). Sähköiseen ajanvaraukseen sekä hiusmalliksi
          rekisteröitymiseen pääset alta. Lisätietoa tarjolla olevien
          palveluiden sisällöstä löytyy ajanvarauksen yhteydessä tai olemalla
          yhteydessä meihin. Voit tehdä varaukset myös olemalla yhteyksissä
          meihin. Meidät tavoittaa alla olevien yhteystietojen kautta.
        </Typography>
      </Grid>
      <Box
        m="auto"
        border={3}
        textAlign="center"
        borderColor="primary.main"
        maxWidth="250px"
        minWidth="250px"
        height="250px"
        margin="10px"
        padding="5px"
      >
        <Typography variant="h6" component="p" gutterBottom>
          Varaa aika ryhmälle
        </Typography>
        <Typography variant="body2" component="p" gutterBottom>
          Tarjoamme opetussuunnitelman mukaisesti tarjolla olevia hiuspalveluita
          3-8 henkilön ryhmille joko koulun tiloissa tai erikseen sovitussa
          paikassa. Lisätietoa tarjoamistamme hiuspalveluista saat soittamalla
          tai lähettämällä sähköpostia.
        </Typography>
        <Button
          onClick={() => handleNavigation('appointment')}
          style={{ marginTop: '5px', width: '230px' }}
          size="large"
          variant="contained"
          color="primary"
        >
          Ajanvaraukseen
        </Button>
      </Box>
      <Box
        m="auto"
        border={3}
        textAlign="center"
        borderColor="primary.main"
        maxWidth="250px"
        minWidth="250px"
        height="250px"
        margin="10px"
        padding="5px"
      >
        <Typography variant="h6" component="p" gutterBottom>
          Rekisteröidy hiusmalliksi
        </Typography>
        <Typography variant="body2" component="p" gutterBottom>
          Tarvitsemme aika ajoin hiusmalleja opiskelijatöitä varten.
          Rekisteröitymislomakkeen täyttämällä voit ilmoittautua vapaaehtoiseksi
          hiusmalliksi. Lisätietoa hiusmalliksi rekisteröitymisestä saat
          soittamalla tai lähettämällä sähköpostia.
        </Typography>
        <Button
          onClick={() => handleNavigation('hairmodel')}
          style={{ marginTop: '5px', width: '230px' }}
          size="large"
          variant="contained"
          color="primary"
        >
          Rekisteröitymiseen
        </Button>
      </Box>
      <Box
        m="auto"
        border={3}
        textAlign="center"
        borderColor="primary.main"
        maxWidth="250px"
        minWidth="250px"
        height="250px"
        margin="10px"
        padding="5px"
      >
        <Typography variant="h6" component="p" gutterBottom>
          Yhteystiedot
        </Typography>
        <Typography variant="body1" component="p" gutterBottom>
          Osoite:
        </Typography>
        <Typography variant="body2" component="p" gutterBottom>
          Linnankoskenkatu 20, 3. krs,
        </Typography>
        <Typography variant="body2" component="p" gutterBottom>
          06100 Porvoo
        </Typography>
        <Typography variant="body1" component="p" gutterBottom>
          Puhelin:
        </Typography>
        <Typography variant="body2" component="p" gutterBottom>
          0400 360 622
        </Typography>
        <Typography variant="body1" component="p" gutterBottom>
          Sähköposti:
        </Typography>
        <Typography variant="body2" component="p" gutterBottom>
          CareeriaCare.Pomotalo@careeria.fi
        </Typography>
      </Box>
      <Grid container spacing={2} justify="center" alignItems="center">
        <Button
          onClick={() => handleNavigation('admin')}
          style={{ maxWidth: '250px', minWidth: '50px', margin: '20px' }}
          size="small"
          variant="contained"
          color="primary"
        >
          Kirjaudu ylläpitoon
        </Button>
      </Grid>
    </Grid>
  )
}

export default HomeNavigation
