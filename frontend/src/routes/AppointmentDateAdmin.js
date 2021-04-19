import React, { useState, useEffect } from 'react'

// React-router-dom imports
import { Redirect } from 'react-router-dom'

// Service import
import timespanService from '../services/timespan'
import logoutService from '../services/logout'

// Component import
import AddDates from '../components/admin/AppointmentDate/AddDates'
import DateList from '../components/admin/AppointmentDate/DateList'

const AppointmentDateAdmin = () => {
  const [dates, setDates] = useState([])
  const [refresh, setRefresh] = useState(false)
  const [redirect, setRedirect] = useState(false)
  const [createDate, setCreateDate] = useState(false)

  const getDates = async () => {
    try {
      const response = await timespanService.getAll()
      const sortedResponse = response.sort((a, b) => {
        return new Date(a.beginning) - new Date(b.beginning)
      })
      console.log('sortedResponse', sortedResponse)
      setDates(sortedResponse)
    } catch (error) {
      console.log(error)
    }
  }

  const handleDelete = async (id) => {
    if (window.confirm('Haluatko varmasti poistaa tämän ajan?')) {
      await timespanService.del(id)
      setRefresh(!refresh)
    }
  }

  //   const formatStartDate = (date) => {
  //     const wd = new Date(date).toLocaleDateString('fi-FI', {
  //       weekday: 'short',
  //     })
  //     const d = new Date(date).toLocaleDateString('fi-FI')
  //     const t = new Date(date).toLocaleTimeString('fi-FI', {
  //       hour: 'numeric',
  //       minute: 'numeric',
  //     })
  //     return `${wd} ${d} ${t}`
  //   }

  //   const formatEndDate = (date) => {
  //     const t = new Date(date).toLocaleTimeString('fi-FI', {
  //       hour: 'numeric',
  //       minute: 'numeric',
  //     })
  //     return t
  //   }

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('user')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      if (user.login_success === true) {
        // setUser(user.username)
        getDates()
        setRedirect(false)
      }
    }
    if (
      JSON.parse(loggedUserJSON) === null ||
      !JSON.parse(loggedUserJSON).login_success
    ) {
      logoutService.logout()
      setRedirect(true)
    }
  }, [refresh])

  if (redirect) {
    return <Redirect to="/admin/login" />
  }

  if (createDate) {
    return (
      <AddDates
        setCreateDate={setCreateDate}
        setRefresh={setRefresh}
        refresh={refresh}
      />
    )
  }

  return (
    <DateList
      dates={dates}
      setCreateDate={setCreateDate}
      handleDelete={handleDelete}
    />
  )
}

export default AppointmentDateAdmin
