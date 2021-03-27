import React from 'react'

// Material UI imports
import Box from '@material-ui/core/Box'
import Card from '@material-ui/core/Card'
import Typography from '@material-ui/core/Typography'
import CardContent from '@material-ui/core/CardContent'

const HairModelInfo = () => {
  return (
    <Box display="flex" justifyContent="center" justifyItems="center">
      <Box width="75%">
        <Card>
          <CardContent>
            <Typography variant="h4" color="textSecondary" gutterBottom>
              Info
            </Typography>
            <Typography variant="h5" component="h2"></Typography>
            <Typography color="textSecondary" gutterBottom>
              Hiusmalliksi rekisteröityminen
            </Typography>
            <Typography variant="body2" component="p">
              Leggings four loko vaporware, church-key truffaut beard stumptown
              cray. Hashtag cray marfa, la croix adaptogen sriracha enamel pin
              biodiesel fingerstache twee put a bird on it asymmetrical
              stumptown flexitarian vice. Thundercats everyday carry ramps
              slow-carb semiotics farm-to-table chambray skateboard literally
              typewriter man bun vice banjo shaman. Kitsch neutra lo-fi, cred
              taiyaki cornhole chillwave offal etsy bicycle rights health goth
              succulents craft beer asymmetrical bitters. Asymmetrical four
              dollar toast polaroid taxidermy brunch pour-over pork belly put a
              bird on it lumbersexual live-edge cornhole. Taxidermy messenger
              bag etsy actually vaporware pabst. Vexillologist sustainable
              vaporware, raclette tbh kickstarter you probably heard of them meh
              organic messenger bag marfa semiotics.
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </Box>
  )
}

export default HairModelInfo
