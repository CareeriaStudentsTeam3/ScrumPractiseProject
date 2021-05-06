import React, { useEffect, useState } from 'react'

// React-router-dom imports
import { useHistory, useLocation, Redirect } from 'react-router-dom'

// Service import
import hairmodelService from '../services/hairmodel'
import logoutService from '../services/logout'

// Component imports
import HairModelList from '../components/admin/HairModel/HairModelList'
import LogoutButton from '../components/admin/LogoutButton/LogoutButton'

// Material UI imports
import Button from '@material-ui/core/Button'

const HairModelAdmin = () => {
  let location = useLocation()

  const [user, setUser] = useState(null)
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
    // console.log('location', location.id)
    setRefresh(true)
    console.log(user)
  }, [location.id])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('user')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      if (user.login_success === true) {
        setUser(user)
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

  let history = useHistory()
  const handleBackButton = (e) => {
    e.preventDefault()
    history.push({
      pathname: '/',
    })
  }
  return (
    <div>
      <LogoutButton />
      <Button
        onClick={(e) => handleBackButton(e)}
        color="primary"
        variant="contained"
        type="button"
      >
        Palaa etusivulle
      </Button>
      <HairModelList hairModels={hairModels} />
    </div>
  )
}

export default HairModelAdmin
