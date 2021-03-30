import React, { useEffect, useState } from 'react'

// React-router-dom imports
import { useParams } from 'react-router-dom'

// Service import
import hairmodelService from '../services/hairmodel'

// Component imports
import HairModelUpdate from '../components/admin/HairModel/HairModelUpdate'
import HairModelPhoto from '../components/admin/HairModel/HairModelPhoto'

// Material UI imports
import Grid from '@material-ui/core/Grid'

const HairdModelInfoAdmin = () => {
  const { id } = useParams()

  const [hairModel, setHairModel] = useState([])

  useEffect(() => {
    hairmodelService.getOne(id).then((data) => setHairModel(data))
  }, [])

  return (
    <Grid container spacing={0} alignItems="center" justify="center">
      <Grid container item xs={12} md={6}>
        <HairModelPhoto photo={hairModel.image} />
      </Grid>
      <Grid item xs={12} md={6}>
        <HairModelUpdate hairModel={hairModel} />
      </Grid>
    </Grid>
  )
}

export default HairdModelInfoAdmin
