/* eslint-disable indent */
import React, { useState, useEffect } from 'react'

// Import utils
import { formatStartDate, formatEndDate } from '../../utils/dateFuncs'

// Material UI Imports
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import ButtonGroup from '@material-ui/core/ButtonGroup'
import CircularProgress from '@material-ui/core/CircularProgress'

// Service imports
import timespanService from '../../services/timespan'

const TimeSelect = ({
  grpSize,
  duration,
  handleTime,
  handleNavClick,
  setError,
}) => {
  const [times, setTimes] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const getFreeTimes = async () => {
    try {
      setIsLoading(true)
      const response = await timespanService.getFreeTimes(grpSize, duration)
      console.log('times', response)
      const filterByStatus = response.filter((time) => {
        return time.status === 'FREE'
      })
      console.log('filterTimes', filterByStatus)
      setTimes(filterByStatus)
      setIsLoading(false)
    } catch (err) {
      setError(true)
      console.log('error getFreeTimes func', err)
    }
  }

  useEffect(() => {
    getFreeTimes()
    // timespanService
    //   .getFreeTimes(grpSize, duration)
    //   .then((data) => setTimes(data))
  }, [])

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" textAlign="center">
        <CardContent>
          <CircularProgress />
        </CardContent>
      </Box>
    )
  }

  if (times.length === 0 && !isLoading) {
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
