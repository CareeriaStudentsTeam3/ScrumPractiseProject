import React, { useEffect, useState } from 'react'

// React-router-dom imports
import { useParams, Redirect } from 'react-router-dom'

// Service import
import hairmodelService from '../services/hairmodel'
import logoutService from '../services/logout'

// Component imports
import HairModelUpdate from '../components/admin/HairModel/HairModelUpdate'
import HairModelPhoto from '../components/admin/HairModel/HairModelPhoto'

// Material UI imports
import Grid from '@material-ui/core/Grid'
import CircularProgress from '@material-ui/core/CircularProgress'

const HairdModelInfoAdmin = () => {
  const { id } = useParams()

  const [hairModel, setHairModel] = useState([])
  const [user, setUser] = useState(null)
  const [redirect, setRedirect] = useState(false)

  const getHairModel = async () => {
    setRedirect(false)
    const response = await hairmodelService.getOne(id)
    if (response.error && response.status === 403) {
      return setRedirect(true)
    }
    setHairModel(response)
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
        <HairModelUpdate hairModel={hairModel} user={user} />
      </Grid>
    </Grid>
  )
}

export default HairdModelInfoAdmin
