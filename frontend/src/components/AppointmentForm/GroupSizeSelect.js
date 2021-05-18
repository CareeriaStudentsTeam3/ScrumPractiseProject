import React from 'react'

// Material UI Imports
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import ButtonGroup from '@material-ui/core/ButtonGroup'

const GroupSizeSelect = ({ handleGroupSize }) => {
  return (
    <Box display="flex" justifyContent="center" textAlign="center">
      <CardContent>
        <Typography variant="h4" color="textPrimary" gutterBottom>
          Ryhmän koko
        </Typography>
        <Typography variant="h5" component="h2"></Typography>
        <Typography color="textPrimary" gutterBottom>
          Valitse ryhmän koko
        </Typography>
        <ButtonGroup size="large" color="primary" variant="contained">
          <Button onClick={() => handleGroupSize(3)}>3</Button>
          <Button onClick={() => handleGroupSize(4)}>4</Button>
          <Button onClick={() => handleGroupSize(5)}>5</Button>
          <Button onClick={() => handleGroupSize(6)}>6</Button>
          <Button onClick={() => handleGroupSize(7)}>7</Button>
          <Button onClick={() => handleGroupSize(8)}>8</Button>
        </ButtonGroup>
      </CardContent>
    </Box>
  )
}

export default GroupSizeSelect
