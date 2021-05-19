import React, { useState } from 'react'

// Material UI imports
import Grid from '@material-ui/core/Grid'
import CircularProgress from '@material-ui/core/CircularProgress'

// Service import
import hairModelService from '../services/hairmodel'

// Component imports
import HairdModelForm from '../components/HairModelForm/HairModelForm'
import HairModelInfo from '../components/HairModelForm/HairModelInfo'
import HairModelConfirm from '../components/HairModelForm/HairModelConfirm'
import HairModelError from '../components/HairModelForm/HairModelError'
import HomeInfo from '../components/Home/HomeInfo'

const HairModel = () => {
  const [confirm, setConfirm] = useState(false)
  const [error, setError] = useState(false)
  const [hairModel, setHairModel] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  // For developin to show the error message
  const [errorMsg, setErrorMsg] = useState(null)

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
    if (values.image) {
      formData.append('image', values.image)
    }
    console.log(values)
    console.log(formData.get('image'))
    try {
      setIsLoading(true)
      const response = await hairModelService.create(formData)
      console.log('res', response)
      setHairModel(response)
      setIsLoading(false)
      setConfirm(true)
    } catch (err) {
      console.log('error', err.name)
      setErrorMsg(err.message)
      setError(true)
    }
  }

  if (confirm) {
    return (
      <Grid container spacing={0} alignItems="center" justify="center">
        <Grid item xs={12} md={6}>
          <HairModelConfirm hairModel={hairModel} />
        </Grid>
      </Grid>
    )
  }

  if (error) {
    return (
      <Grid container spacing={0} alignItems="center" justify="center">
        <Grid item xs={12} md={6}>
          <HairModelError error={errorMsg} />
        </Grid>
      </Grid>
    )
  }

  if (isLoading) {
    return (
      <Grid container spacing={0} alignItems="center" justify="center">
        <Grid container item xs={12} md={6}>
          <HairModelInfo />
        </Grid>
        <Grid item xs={12} md={6}>
          <CircularProgress />
        </Grid>
      </Grid>
    )
  }

  return (
    <>
      <HomeInfo />
      <Grid container spacing={0} alignItems="center" justify="center">
        <Grid container item xs={12} md={6}>
          <HairModelInfo />
        </Grid>
        <Grid item xs={12} md={6}>
          <HairdModelForm handleSubmit={handleSubmit} />
        </Grid>
      </Grid>
    </>
  )
}

export default HairModel
