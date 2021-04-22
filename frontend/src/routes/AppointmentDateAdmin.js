import React, { useState, useEffect } from 'react'

// React-router-dom imports
import { Redirect } from 'react-router-dom'

// Service import
import timespanService from '../services/timespan'
import logoutService from '../services/logout'

// Component import
import AddDates from '../components/admin/AppointmentDate/AddDates'
import DateList from '../components/admin/AppointmentDate/DateList'
import EditDates from '../components/admin/AppointmentDate/EditDates'
import Notification from '../components/Notification/Notification'

const AppointmentDateAdmin = () => {
  const [dates, setDates] = useState([])
  const [date, setDate] = useState(null)
  const [refresh, setRefresh] = useState(false)
  const [redirect, setRedirect] = useState(false)
  const [createDate, setCreateDate] = useState(false)
  const [editDate, setEditDate] = useState(false)

  // Notification
  const [notificationMsg, setNotificationMsg] = useState(null)
  const [openNotification, setOpenNotification] = useState(false)

  const handleNotification = (msg, isOpen) => {
    setNotificationMsg(msg)
    setOpenNotification(isOpen)
  }

  const getDates = async () => {
    try {
      const response = await timespanService.getAll()
      if (response.error && response.status === 403) {
        return setRedirect(true)
      }
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
      const response = await timespanService.del(id)
      if (response.error && response.status === 403) {
        return setRedirect(true)
      }
      setRefresh(!refresh)
    }
  }

  const updateDate = async (updatedService) => {
    try {
      const response = await timespanService.update(date.id, updatedService)
      console.log('updateed', response)
      if (response.error && response.status === 403) {
        return setRedirect(true)
      }
      handleNotification('Muokataan...', true)
      setTimeout(() => {
        setRefresh(!refresh)
        setEditDate(false)
        setDate(null)
      }, 2000)
    } catch (error) {
      console.log('delerror', error)
      handleNotification('Muokkaus epäonnistui!', true)
      setTimeout(() => {
        setEditDate(false)
        setDate(null)
      }, 2000)
    }
  }

  const handleBackButton = () => {
    setEditDate(false)
    setDate(null)
  }

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

  if (editDate && date !== null) {
    return (
      <div>
        <EditDates
          date={date}
          handleBackButton={handleBackButton}
          updateDate={updateDate}
        />
        <Notification message={notificationMsg} open={openNotification} />
      </div>
    )
  }

  return (
    <DateList
      dates={dates}
      setCreateDate={setCreateDate}
      handleDelete={handleDelete}
      setEditDate={setEditDate}
      setDate={setDate}
    />
  )
}

export default AppointmentDateAdmin
