import React, { useEffect, useState } from 'react'

// React-router-dom import
import { Redirect, useHistory } from 'react-router-dom'

// Service import
import userService from '../services/user'
import logoutService from '../services/logout'

// Component imports
import UserList from '../components/admin/User/UserList'
import UserCreate from '../components/admin/User/UserCreate'
import UserEdit from '../components/admin/User/UserEdit'
import Notification from '../components/Notification/Notification'
import AdminButton from '../components/admin/AdminButton/AdminButton'
import LogoutButton from '../components/admin/LogoutButton/LogoutButton'
import HomeInfo from '../components/Home/HomeInfo'

// Material UI imports
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'

const UserAdmin = () => {
  const [user, setUser] = useState(null)
  const [users, setUsers] = useState([])
  const [oneUser, setOneUser] = useState(null)

  const [redirect, setRedirect] = useState(false)
  const [refresh, setRefresh] = useState(false)

  const [createUser, setCreateUser] = useState(false)
  const [editUser, setEditUser] = useState(false)

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

  const handleSubmit = async (values, { resetForm }) => {
    console.log('values', values)
    try {
      // const newValues = values
      // newValues.groups = [newValues.groups]
      // values.groups = [values.groups]
      const newValues = { ...values, groups: [values.groups] }
      const response = await userService.create(newValues)
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
      handleNotification('Luodaan käyttäjää...')
      setTimeout(() => {
        resetForm()
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

  const handleUpdateSubmit = async (values) => {
    try {
      // values.groups = [values.groups]
      const newValues = { ...values, groups: [values.groups] }
      console.log('newValues', newValues)
      const response = await userService.update(values.id, newValues)
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
      handleNotification('Muokataan...', true)
      setTimeout(() => {
        setOneUser(null)
        setRefresh(!refresh)
        setEditUser(false)
      }, 2000)
    } catch (err) {
      console.log('delerror', err)
      if (err.message.includes('Sinulla ei ole oikeutta tehdä tätä!')) {
        handleNotification('Sinulla ei ole oikeutta tehdä tätä!')
        setTimeout(() => {
          setOneUser(null)
          setEditUser(false)
        }, 2000)
      } else {
        handleNotification('Muokkaus epäonnistui!')
        setTimeout(() => {
          setOneUser(null)
          setEditUser(false)
        }, 2000)
      }
    }
  }

  const handleBackButton = () => {
    setOneUser(null)
    setCreateUser(false)
    setEditUser(false)
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
      <div>
        <UserCreate
          handleSubmit={handleSubmit}
          handleBackButton={handleBackButton}
        />
        <Notification message={notificationMsg} open={openNotification} />
      </div>
    )
  }

  if (
    user &&
    user.user_group[0] !== 'student' &&
    editUser &&
    oneUser !== null
  ) {
    return (
      <div>
        <UserEdit
          handleBackButton={handleBackButton}
          oneUser={oneUser}
          handleUpdateSubmit={handleUpdateSubmit}
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

  if (user && user.user_group[0] !== 'student') {
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
          <UserList
            users={users}
            user={user}
            handleDelete={handleDelete}
            setCreateUser={setCreateUser}
            setEditUser={setEditUser}
            setOneUser={setOneUser}
          />
          <Notification message={notificationMsg} open={openNotification} />
        </div>
      </div>
    )
  }

  return <h1>Ei oikeutta!</h1>
}

export default UserAdmin
