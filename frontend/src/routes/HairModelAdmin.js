import React, { useEffect, useState } from 'react'

// React-router-dom imports
import { useLocation, Redirect } from 'react-router-dom'

// Service import
import hairmodelService from '../services/hairmodel'

// Component imports
import HairModelList from '../components/admin/HairModel/HairModelList'

const HairModelAdmin = () => {
  let location = useLocation()

  const [user, setUser] = useState(null)
  const [redirect, setRedirect] = useState(false)

  const [hairModels, setHairModels] = useState([])
  const [refresh, setRefresh] = useState(false)

  useEffect(() => {
    // console.log('location', location.id)
    setRefresh(true)
    console.log('useruser', user)
  }, [location.id])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('user')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user.username)
      setRedirect(false)
      hairmodelService
        .getAll()
        .then((data) => setHairModels(data))
        .then(setRefresh(false))
    }
    if (!loggedUserJSON) {
      setUser(null)
      setRedirect(true)
    }
  }, [refresh])

  if (redirect) {
    return <Redirect to="/admin/login" />
  }

  return <HairModelList hairModels={hairModels} />
}

export default HairModelAdmin
