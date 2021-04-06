import React, { useState, useEffect } from 'react'

// Material UI imports
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'

// Component imports
import GroupSizeSelect from '../components/AppointmentForm/GroupSizeSelect'
import ServiceSelect from '../components/AppointmentForm/ServiceSelect'
import TimeSelect from '../components/AppointmentForm/TimeSelect'
import AppointmentForm from '../components/AppointmentForm/AppointmentForm'

// Service imports
import serviceService from '../services/service'

const Appointment = () => {
  const [groupSize, setGroupSize] = useState(null)
  const [service, setService] = useState(null)
  const [duration, setDuration] = useState(null)
  const [time, setTime] = useState(null)

  const [services, setServices] = useState([])

  useEffect(() => {
    serviceService.getAll().then((data) => setServices(data))
  }, [])

  const handleGroupSize = (grpSize) => {
    setGroupSize(grpSize)
  }

  const handleService = (serviceId, duration) => {
    setService(serviceId)
    setDuration(duration)
  }

  const handleTime = (timeId) => {
    setTime(timeId)
  }

  if (groupSize === null && service === null) {
    return (
      <Grid container spacing={0} alignItems="center" justify="center">
        <Grid item xs={12} md={6}>
          <Card>
            <GroupSizeSelect handleGroupSize={handleGroupSize} />
            {console.log('group_size', groupSize)}
          </Card>
        </Grid>
      </Grid>
    )
  }

  if (groupSize !== null && service === null) {
    return (
      <Grid container spacing={0} alignItems="center" justify="center">
        <Grid item xs={12} md={6}>
          <Card>
            <ServiceSelect services={services} handleService={handleService} />
            {console.log('service', service)}
          </Card>
        </Grid>
      </Grid>
    )
  }

  if (groupSize !== null && service !== null && time === null) {
    return (
      <Grid container spacing={0} alignItems="center" justify="center">
        <Grid item xs={12} md={6}>
          <Card>
            <TimeSelect
              grpSize={groupSize}
              duration={duration}
              handleTime={handleTime}
            />
            {console.log('time', time)}
            {console.log('everything', groupSize, service, time)}
          </Card>
        </Grid>
      </Grid>
    )
  }

  if (groupSize !== null && service !== null && time !== null) {
    return (
      <Grid container spacing={0} alignItems="center" justify="center">
        <Grid item xs={12} md={6}>
          <Card>
            <AppointmentForm
              groupSize={groupSize}
              service={service}
              date={time}
            />
          </Card>
        </Grid>
      </Grid>
    )
  }
}

export default Appointment
