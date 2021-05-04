import React, { useState, useEffect } from 'react'

// React-router-dom import
import { Redirect } from 'react-router-dom'

// Import service
import appointmentService from '../services/appointment'
import timespanService from '../services/timespan'
import logoutService from '../services/logout'

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
    return { time: response }
    // return `${response.beginning} ${response.end}`
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

    Promise.all(newArr).then((result) => {
      console.log('sorted', result)
      const sorted = result.sort((a, b) => {
        console.log(a, b)
        if (a.time !== undefined && b.time !== undefined) {
          return (
            new Date(a.time.time.beginning) - new Date(b.time.time.beginning)
          )
        }
      })
      setAppointments(sorted)
    })
  }

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('user')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      if (user.login_success === true) {
        console.log('user', user)
        // setUser(user)
        getAppointments()
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
    <AppointmentList appointments={appointments} getDateTimes={getDateTimes} />
  )
}

export default AppointmentAdmin
