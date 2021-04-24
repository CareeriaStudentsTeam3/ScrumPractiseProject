import React, { useState, useEffect } from 'react'

// React-router-dom imports
import { useParams, Redirect } from 'react-router-dom'

// Service import
import appointmentService from '../services/appointment'
import serviceService from '../services/service'
import timespanService from '../services/timespan'

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
    getAppointment(id)
    getServices()
    getTimes()
  }, [])

  if (redirect) {
    return <Redirect to="admin/login" />
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
