import React, { useEffect, useState } from 'react'

// Service import
import hairmodelService from '../services/hairmodel'

// Component imports
import HairModeList from '../components/admin/HairModel/HairModelList'

const HairModelAdmin = () => {
  const [hairModels, setHairModels] = useState([])

  useEffect(() => {
    hairmodelService.getAll().then((data) => setHairModels(data))
  }, [])

  return <HairModeList hairModels={hairModels} />
}

export default HairModelAdmin
