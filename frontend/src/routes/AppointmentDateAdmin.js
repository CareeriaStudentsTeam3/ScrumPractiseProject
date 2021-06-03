import React, { useState, useEffect } from 'react'

// React-router-dom imports
import { Redirect, useHistory } from 'react-router-dom'

// Service import
import timespanService from '../services/timespan'
import logoutService from '../services/logout'

// Component import
import AddDates from '../components/admin/AppointmentDate/AddDates'
import DateList from '../components/admin/AppointmentDate/DateList'
import EditDates from '../components/admin/AppointmentDate/EditDates'
import Notification from '../components/Notification/Notification'
import AdminButton from '../components/admin/AdminButton/AdminButton'
import LogoutButton from '../components/admin/LogoutButton/LogoutButton'
import HomeInfo from '../components/Home/HomeInfo'

// Material UI imports
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'

const AppointmentDateAdmin = () => {
  const [user, setUser] = useState(null)

  const [dates, setDates] = useState([])
  const [date, setDate] = useState(null)
  const [refresh, setRefresh] = useState(false)
  const [redirect, setRedirect] = useState(false)
  const [createDate, setCreateDate] = useState(false)
  const [editDate, setEditDate] = useState(false)

  // Notification
  const [notificationMsg, setNotificationMsg] = useState(null)
  const [openNotification, setOpenNotification] = useState(false)

  const handleNotification = (msg) => {
    setNotificationMsg(msg)
    setOpenNotification(true)

    setTimeout(() => {
      setNotificationMsg(null)
      setOpenNotification(false)
    }, 2000)
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
      setDates(sortedResponse)
    } catch (error) {
      console.log(error)
    }
  }

  const handleDelete = async (id) => {
    if (window.confirm('Haluatko varmasti poistaa tämän ajan?')) {
      try {
        const response = await timespanService.del(id)
        console.log('res', response)
        if (
          response.error &&
          response.status === 403 &&
          response.detail ===
            'You do not have permission to perform this action.'
        ) {
          throw new Error('Sinulla ei ole oikeutta tehdä tätä!')
        }
        if (response.error && response.status === 403) {
          return setRedirect(true)
        }
        setRefresh(!refresh)
      } catch (err) {
        if (err.message.includes('Sinulla ei ole oikeutta tehdä tätä!')) {
          handleNotification('Sinulla ei ole oikeutta tehdä tätä!')
        } else {
          handleNotification('On tapahtunut virhe!')
        }
      }
    }
  }

  const updateDate = async (updatedService) => {
    try {
      const response = await timespanService.update(date.id, updatedService)
      console.log('updateed', response)
      if (
        response.error &&
        response.status === 403 &&
        response.detail === 'You do not have permission to perform this action.'
      ) {
        throw new Error('Sinulla ei ole oikeutta tehdä tätä!')
      }
      if (response.error && response.status === 403) {
        return setRedirect(true)
      }
      handleNotification('Muokataan...')
      setTimeout(() => {
        setRefresh(!refresh)
        setEditDate(false)
        setDate(null)
      }, 2000)
    } catch (err) {
      if (err.message.includes('Sinulla ei ole oikeutta tehdä tätä!')) {
        handleNotification('Sinulla ei ole oikeutta tehdä tätä!')
        setTimeout(() => {
          setEditDate(false)
        }, 2000)
      } else {
        handleNotification('Muokkaus epäonnistui!')
        setTimeout(() => {
          setEditDate(false)
          setDate(null)
        }, 2000)
      }
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
        setUser(user)
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

  let history = useHistory()
  const handleBackBtn = (e) => {
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
          onClick={(e) => handleBackBtn(e)}
          color="primary"
          variant="contained"
          size="small"
          style={{ margin: '10px', marginLeft: '5px' }}
        >
          Palaa etusivulle
        </Button>
      </Grid>
      <div>
        <DateList
          dates={dates}
          setCreateDate={setCreateDate}
          handleDelete={handleDelete}
          setEditDate={setEditDate}
          setDate={setDate}
          user={user}
        />
      </div>
    </div>
  )
}

export default AppointmentDateAdmin
