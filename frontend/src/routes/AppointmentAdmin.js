import React, { useState, useEffect } from 'react'

// React-router-dom import
import { Redirect, useHistory } from 'react-router-dom'

// Import service
import appointmentService from '../services/appointment'
import timespanService from '../services/timespan'
import logoutService from '../services/logout'

// Import components
import AppointmentList from '../components/admin/Appointment/AppointmentList'
import AdminButton from '../components/admin/AdminButton/AdminButton'
import LogoutButton from '../components/admin/LogoutButton/LogoutButton'
import HomeInfo from '../components/Home/HomeInfo'

// Material UI imports
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'

const AppointmentAdmin = () => {
  const [appointments, setAppointments] = useState([])

  const [redirect, setRedirect] = useState(false)

  const getDateTimes = async (id) => {
    const response = await timespanService.getOne(id)
    if (response.error && response.status === 403) {
      return setRedirect(true)
    }
    return { time: response }
  }

  const getAppointments = async () => {
    const response = await appointmentService.getAll()
    if (response.error && response.status === 403) {
      return setRedirect(true)
    }

    const newArr = await response.map(async (item) => {
      if (item.appointment_date !== null) {
        let time = await getDateTimes(item.appointment_date)
        return { ...item, time: time }
      } else {
        return { ...item }
      }
    })

    Promise.all(newArr).then((result) => {
      const sorted = result.sort((a, b) => {
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

  let history = useHistory()
  const handleBackButton = (e) => {
    e.preventDefault()
    history.push({
      pathname: '/',
    })
  }

  return (
    <div>
      <HomeInfo />
      <Grid container justify="flex-end">
        <LogoutButton />
        <AdminButton />
        <Button
          onClick={(e) => handleBackButton(e)}
          color="primary"
          variant="contained"
          size="small"
          style={{ margin: '10px' }}
        >
          Palaa etusivulle
        </Button>
      </Grid>
      <div>
        <AppointmentList
          appointments={appointments}
          getDateTimes={getDateTimes}
        />
      </div>
    </div>
  )
}

export default AppointmentAdmin
