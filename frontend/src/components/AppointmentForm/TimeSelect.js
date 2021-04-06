import React, { useState, useEffect } from 'react'

// Material UI Imports
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import ButtonGroup from '@material-ui/core/ButtonGroup'

// Service imports
import timespanService from '../../services/timespan'

const TimeSelect = ({ grpSize, duration, handleTime }) => {
  const [times, setTimes] = useState([])

  useEffect(() => {
    timespanService
      .getFreeTimes(grpSize, duration)
      .then((data) => setTimes(data))
  }, [])

  if (times.length === 0) {
    return (
      <Box display="flex" justifyContent="center" textAlign="center">
        <CardContent>
          <Typography variant="h4" color="textSecondary" gutterBottom>
            Vapaa-aika
          </Typography>
          <Typography variant="h5" component="h2"></Typography>
          <Typography color="textSecondary" gutterBottom>
            Valitse päivämäärä ja kellonaika
          </Typography>
          <Typography variant="body2" component="p">
            Valitettavasti vapaita-aikoja ei ole...
          </Typography>
        </CardContent>
      </Box>
    )
  }

  return (
    <Box display="flex" justifyContent="center" textAlign="center">
      <CardContent>
        <Typography variant="h4" color="textSecondary" gutterBottom>
          Vapaa-aika
        </Typography>
        <Typography variant="h5" component="h2"></Typography>
        <Typography color="textSecondary" gutterBottom>
          Valitse päivämäärä ja kellonaika
        </Typography>
        <ButtonGroup
          variant="contained"
          color="primary"
          size="large"
          orientation="vertical"
        >
          {times.map((item) => (
            <Button
              onClick={() => handleTime(item.id)}
              key={item.id}
            >{`${item.beginning} - ${item.end}`}</Button>
          ))}
        </ButtonGroup>
      </CardContent>
    </Box>
  )
}

export default TimeSelect
