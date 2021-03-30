import React from 'react'

// Material UI imports
import Box from '@material-ui/core/Box'

const HairModelPhoto = ({ photo }) => {
  console.log(photo)
  return (
    <Box display="flex" justifyContent="center" justifyItems="center">
      <Box width="75%">
        <img width="400" src="http://via.placeholder.com/400" />
      </Box>
    </Box>
  )
}

export default HairModelPhoto
