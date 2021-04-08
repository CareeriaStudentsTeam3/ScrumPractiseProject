import React from 'react'

// Material UI imports
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'

const HomeInfo = () => {
  return (
    <Box m="auto" textAlign="center">
      <Typography variant="h3" color="textPrimary" gutterBottom>
        CareeriaCare hiusalan palvelut
      </Typography>
      <Box textAlign="left">
        <Typography variant="body2" component="p" gutterBottom>
          CareeriaCare tarjoaa parturi- ja kampaamopalveluita opiskelijatöinä
          Pomo-talossa Porvoossa. ​Voit varata ajan sähköisen ajanvarauksen
          kautta klikkaamalla Varaa aika -painiketta.​ Jos haluat värin
          yhteydessä leikkauksen, valitse käsittelyksi värjäys + leikkaus.
          Erikseen varattuina työajasta tulee liian pitkä, jolloin järjestelmä
          ei löydä vapaata aikaa.​ Vastaamme puhelimeen aukioloaikoina, jolloin
          ajan voi varata puhelimitse.​ CareeriaCaren kauneushoitolassa ja
          parturi-kampaamossa maksuvälineenä käy ainoastaan
          pankki-/luottokortti.
        </Typography>
      </Box>
    </Box>
  )
}

export default HomeInfo
