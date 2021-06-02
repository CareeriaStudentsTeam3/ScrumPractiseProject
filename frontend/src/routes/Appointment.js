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
import AppointmentConfirm from '../components/AppointmentForm/AppointmentConfirm'
import AppointmentError from '../components/AppointmentForm/AppointmentError'
import HomeButton from '../components/HomeButton/HomeButton'
import HomeInfo from '../components/Home/HomeInfo'

// Service import
import appointmentService from '../services/appointment'
import timespanService from '../services/timespan'

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

  const [confirm, setConfirm] = useState(null)
  const [error, setError] = useState(false)

  const [isLoading, setIsLoading] = useState(false)

  const getServices = async () => {
    try {
      setIsLoading(true)
      const response = await serviceService.getFilter(groupSize)
      setServices(response)
      setIsLoading(false)
    } catch (err) {
      console.log(err.response)
      console.log('error getSerice func', err)
      setError(true)
    }
  }

  useEffect(() => {
    if (groupSize !== null) {
      getServices()
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

  const handleSubmit = async (values) => {
    try {
      setIsLoading(true)
      const response = await appointmentService.create(values)
      console.log('response', response)
      if (response) {
        const timespan = await timespanService.getOne(values.appointment_date)
        if (timespan) {
          const updatedTimespan = {
            ...timespan,
            status: 'UNCONFIRMED',
          }
          await timespanService.update(values.appointment_date, updatedTimespan)
        }
      }
      setConfirm(response)
      setIsLoading(false)
    } catch (err) {
      console.log('error', err.message)
      setError(true)
      setIsLoading(false)
    }
  }

  if (confirm !== null) {
    return (
      <Grid container spacing={0} alignItems="center" justify="center">
        <Grid item xs={12} md={6}>
          <Card>
            <AppointmentConfirm appointment={confirm} />
          </Card>
        </Grid>
      </Grid>
    )
  }

  if (error) {
    return (
      <Grid container spacing={0} alignItems="center" justify="center">
        <Grid item xs={12} md={6}>
          <Card>
            <AppointmentError error={'Virhe viesti!'} />
          </Card>
        </Grid>
      </Grid>
    )
  }

  if (groupSize === null && service === null) {
    return (
      <>
        <HomeInfo />
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
        <Box m="auto" textAlign="center" mt={2}>
          <HomeButton />
        </Box>
      </>
    )
  }

  if (groupSize !== null && service === null) {
    return (
      <>
        <HomeInfo />
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
                isLoading={isLoading}
              />
              {console.log('service', service)}
            </Card>
          </Grid>
        </Grid>
        <Box m="auto" textAlign="center" mt={2}>
          <HomeButton />
        </Box>
      </>
    )
  }

  if (groupSize !== null && service !== null && timeId === null) {
    return (
      <>
        <HomeInfo />
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
                setError={setError}
              />
            </Card>
          </Grid>
        </Grid>
        <Box m="auto" textAlign="center" mt={2}>
          <HomeButton />
        </Box>
      </>
    )
  }

  if (groupSize !== null && service !== null && timeId !== null) {
    return (
      <>
        <HomeInfo />
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
                isLoading={isLoading}
                handleSubmit={handleSubmit}
              />
            </Card>
          </Grid>
        </Grid>
        <Box m="auto" textAlign="center" mt={2}>
          <HomeButton />
        </Box>
      </>
    )
  }
}

export default Appointment
