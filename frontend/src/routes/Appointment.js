import React, { useState, useEffect } from 'react'

// Material UI imports
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import Box from '@material-ui/core/Box'

// Component imports
import BreadcrumbsNav from '../components/BreadcrumbsNav/BreadcrumbsNav'
import GroupSizeSelect from '../components/AppointmentForm/GroupSizeSelect'
import ServiceSelect from '../components/AppointmentForm/ServiceSelect'
import TimeSelect from '../components/AppointmentForm/TimeSelect'
import AppointmentForm from '../components/AppointmentForm/AppointmentForm'

// Service imports
import serviceService from '../services/service'

const Appointment = () => {
  const [groupSize, setGroupSize] = useState(null)
  const [service, setService] = useState(null)
  const [serviceName, setServiceName] = useState(null)
  const [duration, setDuration] = useState(null)
  const [timeId, setTimeId] = useState(null)
  const [time, setTime] = useState(null)

  const [services, setServices] = useState([])

  useEffect(() => {
    if (groupSize !== null) {
      serviceService.getFilter(groupSize).then((data) => setServices(data))
    }
  }, [groupSize])

  const handleGroupSize = (grpSize) => {
    setGroupSize(grpSize)
  }

  const handleService = (serviceId, duration, name) => {
    setService(serviceId)
    setDuration(duration)
    setServiceName(name)
  }

  const handleTime = (timeId, date) => {
    console.log('funcTime', date)
    setTimeId(timeId)
    setTime(date)
  }

  const handleNavClick = (item) => {
    if (groupSize !== null && serviceName === null && timeId === null) {
      setGroupSize(null)
    }
    if (
      groupSize !== null &&
      serviceName !== null &&
      timeId === null &&
      item === 'group'
    ) {
      setGroupSize(null)
      setServiceName(null)
      setService(null)
    }
    if (
      groupSize !== null &&
      serviceName !== null &&
      timeId === null &&
      item === 'service'
    ) {
      setServiceName(null)
      setService(null)
    }
    if (
      groupSize !== null &&
      serviceName !== null &&
      timeId !== null &&
      item === 'group'
    ) {
      setGroupSize(null)
      setServiceName(null)
      setService(null)
      setTimeId(null)
      setTime(null)
    }
    if (
      groupSize !== null &&
      serviceName !== null &&
      timeId !== null &&
      item === 'service'
    ) {
      setServiceName(null)
      setService(null)
      setTimeId(null)
      setTime(null)
    }
    if (
      groupSize !== null &&
      serviceName !== null &&
      timeId !== null &&
      item === 'time'
    ) {
      setTimeId(null)
      setTime(null)
    }
  }

  if (groupSize === null && service === null) {
    return (
      <Grid container spacing={0} alignItems="center" justify="center">
        <Grid item xs={12} md={6}>
          <Card>
            <Box m={1}>
              <BreadcrumbsNav
                groupSize={groupSize}
                service={serviceName}
                time={time}
                handleNavClick={handleNavClick}
              />
            </Box>
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
            <Box m={1}>
              <BreadcrumbsNav
                groupSize={groupSize}
                service={serviceName}
                time={time}
                handleNavClick={handleNavClick}
              />
            </Box>
            <ServiceSelect
              services={services}
              handleService={handleService}
              handleNavClick={handleNavClick}
            />
            {console.log('service', service)}
          </Card>
        </Grid>
      </Grid>
    )
  }

  if (groupSize !== null && service !== null && timeId === null) {
    return (
      <Grid container spacing={0} alignItems="center" justify="center">
        <Grid item xs={12} md={6}>
          <Card>
            <Box m={1}>
              <BreadcrumbsNav
                groupSize={groupSize}
                service={serviceName}
                time={time}
                handleNavClick={handleNavClick}
              />
            </Box>
            <TimeSelect
              grpSize={groupSize}
              duration={duration}
              handleTime={handleTime}
              handleNavClick={handleNavClick}
            />
            {console.log('time', timeId)}
            {console.log('everything', groupSize, service, timeId)}
          </Card>
        </Grid>
      </Grid>
    )
  }

  if (groupSize !== null && service !== null && timeId !== null) {
    return (
      <Grid container spacing={0} alignItems="center" justify="center">
        <Grid item xs={12} md={6}>
          <Card>
            <Box m={1}>
              <BreadcrumbsNav
                groupSize={groupSize}
                service={serviceName}
                time={time}
                handleNavClick={handleNavClick}
              />
            </Box>
            <AppointmentForm
              groupSize={groupSize}
              service={service}
              date={timeId}
            />
          </Card>
        </Grid>
      </Grid>
    )
  }
}

export default Appointment
