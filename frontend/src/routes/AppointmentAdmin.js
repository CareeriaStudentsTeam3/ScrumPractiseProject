import React, { useState, useEffect } from 'react'

// React-router-dom import
import { Redirect } from 'react-router-dom'

// Import service
import appointmentService from '../services/appointment'
import timespanService from '../services/timespan'

// Import components
import AppointmentList from '../components/admin/Appointment/AppointmentList'

const AppointmentAdmin = () => {
  const [appointments, setAppointments] = useState([])

  const [redirect, setRedirect] = useState(false)

  const getDateTimes = async (id) => {
    const response = await timespanService.getOne(id)
    if (response.error && response.status === 403) {
      return setRedirect(true)
    }

    return `${response.beginning} ${response.end}`
  }

  const getAppointments = async () => {
    const response = await appointmentService.getAll()
    if (response.error && response.status === 403) {
      return setRedirect(true)
    }

    const newArr = await response.map(async (item) => {
      if (item.appointment_date !== null) {
        // let datetime = await timespanService.getOne(item.appointment_date)
        let time = await getDateTimes(item.appointment_date)
        return { ...item, time: time }
      } else {
        return { ...item }
      }
    })

    Promise.all(newArr).then((result) => setAppointments(result))
    // setAppointments(response)
    // setRefresh(!refresh)
  }
  useEffect(() => {
    getAppointments()
  }, [])

  if (redirect) {
    return <Redirect to="/login" />
  }

  return (
    <AppointmentList appointments={appointments} getDateTimes={getDateTimes} />
  )
}

export default AppointmentAdmin
