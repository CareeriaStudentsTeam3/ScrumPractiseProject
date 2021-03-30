import React, { useEffect, useState } from 'react'

// React-router-dom imports
import { useLocation } from 'react-router-dom'

// Service import
import hairmodelService from '../services/hairmodel'

// Component imports
import HairModeList from '../components/admin/HairModel/HairModelList'

const HairModelAdmin = () => {
  let location = useLocation()

  const [hairModels, setHairModels] = useState([])
  const [refresh, setRefresh] = useState(false)

  useEffect(() => {
    // console.log('location', location.id)
    setRefresh(true)
  }, [location.id])

  useEffect(() => {
    hairmodelService
      .getAll()
      .then((data) => setHairModels(data))
      .then(setRefresh(false))
  }, [refresh])

  return <HairModeList hairModels={hairModels} />
}

export default HairModelAdmin
