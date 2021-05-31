import React, { useEffect, useState } from 'react'

// React-router-dom imports
import { useParams, Redirect, useHistory } from 'react-router-dom'

// Service import
import hairmodelService from '../services/hairmodel'
import logoutService from '../services/logout'

// Component imports
import HairModelUpdate from '../components/admin/HairModel/HairModelUpdate'
import HairModelPhoto from '../components/admin/HairModel/HairModelPhoto'
import Notification from '../components/Notification/Notification'

// Material UI imports
import Grid from '@material-ui/core/Grid'
import CircularProgress from '@material-ui/core/CircularProgress'

const HairdModelInfoAdmin = () => {
  const { id } = useParams()
  let history = useHistory()

  const [hairModel, setHairModel] = useState([])
  const [user, setUser] = useState(null)
  const [redirect, setRedirect] = useState(false)

  // Notifications
  const [open, setOpen] = useState(false)
  const [notificationMsg, setNotificationMsg] = useState(null)

  const handleNotification = (msg) => {
    setOpen(true)
    setNotificationMsg(msg)
  }

  const getHairModel = async () => {
    setRedirect(false)
    const response = await hairmodelService.getOne(id)
    if (response.error && response.status === 403) {
      return setRedirect(true)
    }
    setHairModel(response)
  }

  const handleSubmit = async (values) => {
    let formData = new FormData()
    formData.append('first_name', values.first_name)
    formData.append('last_name', values.last_name)
    formData.append('city', values.city)
    formData.append('phone', values.phone)
    formData.append('email', values.email)
    formData.append('age', values.age)
    formData.append('gender', values.gender)
    formData.append('hair_length', values.hair_length)
    formData.append('hair_procedures', values.hair_procedures)
    if (values.image === null) {
      console.log('inside formdata', values.image)
      // formData.append('image', values.image)
    }
    if (values.image !== null && hairModel.image === null) {
      formData.append('image', values.image)
    }

    console.log(values)
    console.log(formData.get('image'))

    try {
      const response = await hairmodelService.update(formData, values.id)
      console.log('res', response)
      if (
        response.detail === 'You do not have permission to perform this action.'
      ) {
        throw new Error('Sinulla ei ole oikeutta tehdä tätä!')
      } else {
        handleNotification('Tallennetaan...')
        setTimeout(() => {
          history.push({
            pathname: '/admin/hairmodel',
          })
        }, 2000)
      }
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
            pathname: '/admin/hairmodel',
          })
        }, 3000)
      }
    }
  }

  const handleDelete = async (id) => {
    console.log(id)
    if (window.confirm('Haluatko varmasti poistaa tämän hiusmallin?')) {
      try {
        const response = await hairmodelService.del(id)
        if (
          response.detail ===
          'You do not have permission to perform this action.'
        ) {
          throw new Error('Sinulla ei ole oikeutta tehdä tätä!')
        }
        handleNotification('Poistetaan...')
        setTimeout(() => {
          history.push({
            pathname: '/admin/hairmodel',
          })
        }, 2000)
      } catch (err) {
        if (err.message.includes('Sinulla ei ole oikeutta tehdä tätä!')) {
          handleNotification('Sinulla ei ole oikeutta tehdä tätä!')
          setTimeout(() => {
            history.push({
              pathname: '/admin/hairmodel',
            })
          }, 3000)
        } else {
          handleNotification('Hiusmallin poisto epäonnistui!')
          setTimeout(() => {
            history.push({
              pathname: '/admin/hairmodel',
            })
          }, 3000)
        }
      }
    }
  }

  useEffect(() => {
    console.log('hairmodel', hairModel)
    const loggedUserJSON = window.localStorage.getItem('user')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      if (user.login_success === true) {
        console.log('user', user)
        setUser(user)
        getHairModel()
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

  if (hairModel.length === 0) {
    return (
      <Grid container alignItems="center" justify="center">
        <CircularProgress />
      </Grid>
    )
  }

  return (
    <Grid container spacing={0} alignItems="center" justify="center">
      <Grid container item xs={12} md={6}>
        {console.log(user)}
        <HairModelPhoto photo={hairModel.image} />
      </Grid>
      <Grid item xs={12} md={6}>
        <Notification message={notificationMsg} open={open} />
        <HairModelUpdate
          hairModel={hairModel}
          user={user}
          handleSubmit={handleSubmit}
          handleDelete={handleDelete}
          redirect={redirect}
        />
      </Grid>
    </Grid>
  )
}

export default HairdModelInfoAdmin
