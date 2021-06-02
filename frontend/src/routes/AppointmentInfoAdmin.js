import React, { useState, useEffect } from 'react'

// React-router-dom imports
import { useParams, useHistory, Redirect } from 'react-router-dom'

// Service import
import appointmentService from '../services/appointment'
import serviceService from '../services/service'
import timespanService from '../services/timespan'
import logoutService from '../services/logout'

// Component import
import AppointmentUpdate from '../components/admin/Appointment/AppointmentUpdate'
import Notification from '../components/Notification/Notification'

const AppointmentInfoAdmin = () => {
  const { id } = useParams()
  let history = useHistory()

  const [appointment, setAppointment] = useState([])
  const [services, setServices] = useState([])
  const [dateTimes, setDateTimes] = useState([])
  const [redirect, setRedirect] = useState(false)

  // Notifications
  const [open, setOpen] = useState(false)
  const [notificationMsg, setNotificationMsg] = useState(null)

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

  const handleNotification = (msg) => {
    setOpen(true)
    setNotificationMsg(msg)
  }

  const handleSubmit = async (values, { initialValues }) => {
    try {
      const response = await appointmentService.update(values, values.id)
      if (
        response.detail === 'You do not have permission to perform this action.'
      ) {
        throw new Error('Sinulla ei ole oikeutta tehdä tätä!')
      }
      const newTimespan = await timespanService.getOne(values.appointment_date)
      const oldTimespan = await timespanService.getOne(
        initialValues.appointment_date
      )

      if (newTimespan && newTimespan !== oldTimespan) {
        const updatedTimespan = {
          ...newTimespan,
          status: values.confirmed ? 'CONFIRMED' : 'UNCONFIRMED',
        }
        await timespanService.update(values.appointment_date, updatedTimespan)
      }
      if (oldTimespan && oldTimespan !== newTimespan) {
        const updatedOldTimespan = {
          ...oldTimespan,
          status: 'FREE',
        }
        await timespanService.update(
          initialValues.appointment_date,
          updatedOldTimespan
        )
      }
      if (values.appointment_date === initialValues.appointment_date) {
        const updatedTimespan = {
          ...newTimespan,
          status: values.confirmed ? 'CONFIRMED' : 'UNCONFIRMED',
        }
        await timespanService.update(values.appointment_date, updatedTimespan)
      }
      handleNotification('Tallennetaan...')
      setTimeout(() => {
        history.push({
          pathname: '/admin/appointment',
        })
      }, 2000)
    } catch (err) {
      if (err.message.includes('Sinulla ei ole oikeutta tehdä tätä!')) {
        handleNotification('Sinulla ei ole oikeutta tehdä tätä!')
        setTimeout(() => {
          setRedirect(true)
        }, 3000)
      } else {
        handleNotification('On tapahtunut virhe! Palataan edelliselle sivulle.')
        setTimeout(() => {
          history.push({
            pathname: '/admin/appointment',
          })
        }, 3000)
      }
    }
  }

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('user')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      if (user.login_success === true) {
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
    <div>
      <Notification message={notificationMsg} open={open} />
      <AppointmentUpdate
        appointment={appointment}
        services={services}
        dateTimes={dateTimes}
        handleSubmit={handleSubmit}
        handleNotification={handleNotification}
      />
    </div>
  )
}

export default AppointmentInfoAdmin
