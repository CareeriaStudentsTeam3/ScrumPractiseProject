import React, { useEffect, useState } from 'react'

// React-router-dom import
import { Redirect } from 'react-router-dom'

// Service import
import userService from '../services/user'
import logoutService from '../services/logout'

// Component imports
import UserList from '../components/admin/User/UserList'
import UserCreate from '../components/admin/User/UserCreate'
import Notification from '../components/Notification/Notification'

const UserAdmin = () => {
  const [user, setUser] = useState(null)
  const [users, setUsers] = useState([])

  const [redirect, setRedirect] = useState(false)
  const [refresh, setRefresh] = useState(false)

  const [createUser, setCreateUser] = useState(false)

  const [notificationMsg, setNotificationMsg] = useState(null)
  const [openNotification, setOpenNotification] = useState(null)

  const handleNotification = (msg) => {
    setNotificationMsg(msg)
    setOpenNotification(true)
    setTimeout(() => {
      setNotificationMsg(null)
      setOpenNotification(false)
    }, 2000)
  }

  const getUsers = async () => {
    const response = await userService.getAll()
    if (response.error && response.status === 403) {
      return setRedirect(true)
    }
    setUsers(response)
    setRefresh(true)
  }

  const addNewUser = async (newService) => {
    try {
      const response = await userService.create(newService)
      console.log(response)
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
      handleNotification('Luodaan palvelua...')
      setTimeout(() => {
        setCreateUser(false)
        setRefresh(!refresh)
      }, 2000)
    } catch (err) {
      if (err.message.includes('Sinulla ei ole oikeutta tehdä tätä!')) {
        handleNotification('Sinulla ei ole oikeutta tehdä tätä!')
        setTimeout(() => {
          setRedirect(true)
        }, 3000)
      } else {
        handleNotification('Luonti epäonnistui!')
      }
    }
  }

  const handleDelete = async (id) => {
    if (window.confirm('Haluatko varmasti poistaa tämän käyttäjän?')) {
      try {
        const response = await userService.del(id)
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
        handleNotification('Poistetaan...')
        setRefresh(!refresh)
      } catch (err) {
        if (err.message.includes('Sinulla ei ole oikeutta tehdä tätä!')) {
          handleNotification('Sinulla ei ole oikeutta tehdä tätä!')
          setTimeout(() => {
            setRefresh(!refresh)
          }, 2000)
        } else {
          handleNotification('Poisto epäonnistui!')
          setTimeout(() => {
            setRefresh(true)
          }, 2000)
        }
      }
    }
  }

  const handleBackButton = () => {
    setCreateUser(false)
    // setEditService(false)
  }

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('user')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      if (user.login_success === true) {
        setUser(user)
        getUsers()
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

  if (redirect || (user && user.user_group[0] === 'student')) {
    return <Redirect to="/admin/login" />
  }

  if (user && user.user_group[0] === 'student') {
    return <Redirect to="/admin" />
  }

  if (user && user.user_group[0] !== 'student' && createUser) {
    return (
      <UserCreate addNewUser={addNewUser} handleBackButton={handleBackButton} />
    )
  }

  if (user && user.user_group[0] !== 'student') {
    return (
      <div>
        <UserList
          users={users}
          user={user}
          handleDelete={handleDelete}
          setCreateUser={setCreateUser}
        />
        <Notification message={notificationMsg} open={openNotification} />
      </div>
    )
  }

  return <h1>Ei oikeutta!</h1>
}

export default UserAdmin
