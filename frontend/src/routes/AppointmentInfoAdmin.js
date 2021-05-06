import React, { useState, useEffect } from 'react'

// React-router-dom imports
import { useParams, Redirect } from 'react-router-dom'

// Service import
import appointmentService from '../services/appointment'
import serviceService from '../services/service'
import timespanService from '../services/timespan'
import logoutService from '../services/logout'

// Component import
import AppointmentUpdate from '../components/admin/Appointment/AppointmentUpdate'

const AppointmentInfoAdmin = () => {
  const { id } = useParams()

  const [appointment, setAppointment] = useState([])
  const [services, setServices] = useState([])
  const [dateTimes, setDateTimes] = useState([])
  const [redirect, setRedirect] = useState(false)

  const getAppointment = async (id) => {
    setRedirect(false)
    const response = await appointmentService.getOne(id)
    if (response.error && response.status === 403) {
      return setRedirect(true)
    }
    setAppointment(response)
  }

  const getServices = async () => {
    setRedirect(false)
    const response = await serviceService.getAll()
    if (response.error && response.status === 403) {
      return setRedirect(true)
    }
    setServices(response)
  }

  const getTimes = async () => {
    setRedirect(false)
    const response = await timespanService.getAll()
    if (response.error && response.status === 403) {
      return setRedirect(true)
    }
    setDateTimes(response)
  }

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('user')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      if (user.login_success === true) {
        console.log('user', user)
        // setUser(user)
        getAppointment(id)
        getServices()
        getTimes()
      }
    }
    if (
      JSON.parse(loggedUserJSON) === null ||
      !JSON.parse(loggedUserJSON).login_success
    ) {
      logoutService.logout()
      setRedirect(true)
    }
  }, [])

  if (redirect) {
    return <Redirect to="/admin/login" />
  }

  return (
    <AppointmentUpdate
      appointment={appointment}
      services={services}
      dateTimes={dateTimes}
    />
  )
}

export default AppointmentInfoAdmin
