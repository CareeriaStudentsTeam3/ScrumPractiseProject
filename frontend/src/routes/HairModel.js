import React, { useState } from 'react'

// React-router-dom imports
// import { useHistory } from 'react-router-dom'

// Material UI imports
import Grid from '@material-ui/core/Grid'
import CircularProgress from '@material-ui/core/CircularProgress'

// Component imports
import HairdModelForm from '../components/HairModelForm/HairModelForm'
import HairModelInfo from '../components/HairModelForm/HairModelInfo'
import HairModelConfirm from '../components/HairModelForm/HairModelConfirm'
import HairModelError from '../components/HairModelForm/HairModelError'

const HairModel = () => {
  // let history = useHistory()

  const [confirm, setConfirm] = useState(false)
  const [error, setError] = useState(false)
  const [hairModel, setHairModel] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  // For developin to show the error message
  const [errorMsg, setErrorMsg] = useState(null)

  const handleBackToMainPage = () => {
    setError(false)
    setConfirm(false)
    // history.push({
    //   pathname: '/',
    // })
  }

  if (confirm) {
    return (
      <Grid container spacing={0} alignItems="center" justify="center">
        <Grid item xs={12} md={6}>
          <HairModelConfirm
            hairModel={hairModel}
            handleBackToMainPage={handleBackToMainPage}
          />
        </Grid>
      </Grid>
    )
  }

  if (error) {
    return (
      <Grid container spacing={0} alignItems="center" justify="center">
        <Grid item xs={12} md={6}>
          <HairModelError
            error={errorMsg}
            handleBackToMainPage={handleBackToMainPage}
          />
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
    <Grid container spacing={0} alignItems="center" justify="center">
      <Grid container item xs={12} md={6}>
        <HairModelInfo />
      </Grid>
      <Grid item xs={12} md={6}>
        <HairdModelForm
          setConfirm={setConfirm}
          setHairModel={setHairModel}
          setError={setError}
          setErrorMsg={setErrorMsg}
          setIsLoading={setIsLoading}
        />
      </Grid>
    </Grid>
  )
}

export default HairModel
