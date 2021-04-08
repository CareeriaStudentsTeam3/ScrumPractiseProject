/* eslint-disable indent */
import React, { useState, useEffect } from 'react'

// Material UI Imports
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import ButtonGroup from '@material-ui/core/ButtonGroup'

// Service imports
import timespanService from '../../services/timespan'

const TimeSelect = ({ grpSize, duration, handleTime, handleNavClick }) => {
  const [times, setTimes] = useState([])

  const formatStartDate = (date) => {
    // TODO: Check that dates matches what comes from db
    // from server time comes as UTC format
    console.log('dbDate', date)
    const wd = new Date(date).toLocaleDateString('fi-FI', {
      timeZone: 'UTC',
      weekday: 'short',
    })
    const d = new Date(date).toLocaleDateString('fi-FI', {
      timeZone: 'UTC',
    })
    const t = new Date(date).toLocaleTimeString('fi-FI', {
      hour: 'numeric',
      minute: 'numeric',
      timeZone: 'UTC',
    })
    return `${wd} ${d} ${t}`
  }

  const formatEndDate = (date) => {
    console.log('dbDate', date)
    const t = new Date(date).toLocaleTimeString('fi-FI', {
      hour: 'numeric',
      minute: 'numeric',
      timeZone: 'UTC',
    })
    return t
  }

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
            Vapaat ajat
          </Typography>
          <Typography variant="h5" component="h2"></Typography>
          <Typography color="textSecondary" gutterBottom>
            Valitse päivämäärä ja kellonaika
          </Typography>
          <Typography variant="body2" component="p" gutterBottom>
            Valitettavasti vapaita aikoja ei ole...
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleNavClick('service')}
          >
            Edellinen
          </Button>
        </CardContent>
      </Box>
    )
  }

  return (
    <Box display="flex" justifyContent="center" textAlign="center">
      <CardContent>
        <Typography variant="h4" color="textSecondary" gutterBottom>
          Vapaat ajat
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
              onClick={() =>
                handleTime(
                  item.id,
                  `${formatStartDate(item.beginning)} - ${formatEndDate(
                    item.end
                  )}`
                )
              }
              key={item.id}
            >{`${formatStartDate(item.beginning)} - ${formatEndDate(
              item.end
            )}`}</Button>
          ))}
        </ButtonGroup>
      </CardContent>
    </Box>
  )
}

export default TimeSelect
