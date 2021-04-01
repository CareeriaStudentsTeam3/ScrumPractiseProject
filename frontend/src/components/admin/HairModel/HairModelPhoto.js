import React from 'react'

// Material UI imports
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'

const HairModelPhoto = ({ photo }) => {
  console.log(photo)

  if (photo === null) {
    return (
      <Box display="flex" m="auto">
        <Box>
          <Typography variant="h3" color="textSecondary">
            Kuvaa ei löydy!
          </Typography>
        </Box>
      </Box>
    )
  }

  return (
    <Box display="flex" m="auto">
      <Box width="75%">
        <img width="400" src={photo} />
      </Box>
    </Box>
  )
}

export default HairModelPhoto
