import React, { useEffect, useState } from 'react'

// React-router-dom imports
import { useLocation, Redirect } from 'react-router-dom'

// Service import
import hairmodelService from '../services/hairmodel'
import logoutService from '../services/logout'

// Component imports
import HairModelList from '../components/admin/HairModel/HairModelList'
import LogoutButton from '../components/admin/LogoutButton/LogoutButton'
import AdminButton from '../components/admin/AdminButton/AdminButton'
import HomeButton from '../components/HomeButton/HomeButton'
import HomeInfo from '../components/Home/HomeInfo'

// Material UI imports
import Grid from '@material-ui/core/Grid'

const HairModelAdmin = () => {
  let location = useLocation()

  // const [user, setUser] = useState(null)
  const [redirect, setRedirect] = useState(false)

  const [hairModels, setHairModels] = useState([])
  const [refresh, setRefresh] = useState(false)

  const getHairModels = async () => {
    setRedirect(false)
    const response = await hairmodelService.getAll()
    if (response.error && response.status === 403) {
      return setRedirect(true)
    }
    setHairModels(response)
  }

  useEffect(() => {
    setRefresh(true)
  }, [location.id])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('user')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      if (user.login_success === true) {
        // setUser(user)
        getHairModels()
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

  return (
    <div>
      <HomeInfo />
      <Grid container justify="flex-end">
        <LogoutButton />
        <AdminButton />
        <HomeButton />
      </Grid>
      <div>
        <HairModelList hairModels={hairModels} />
      </div>
    </div>
  )
}

export default HairModelAdmin
