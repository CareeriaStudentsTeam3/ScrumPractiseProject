import React, { useState } from 'react'

// React-router-dom imports
// import { useHistory } from 'react-router-dom'

// Material UI imports
import Grid from '@material-ui/core/Grid'

// Component imports
import HairdModelForm from '../components/HairModelForm/HairModelForm'
import HairModelInfo from '../components/HairModelForm/HairModelInfo'
import HairModelConfirm from '../components/HairModelForm/HairModelConfirm'
import HairModelError from '../components/HairModelForm/HairModelError'

const HairModel = () => {
  // let history = useHistory()

  const [confirm, setConfirm] = useState(false)
  const [error, setError] = useState(false)
  const [name, setName] = useState(null)

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
            name={name}
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

  return (
    <Grid container spacing={0} alignItems="center" justify="center">
      <Grid container item xs={12} md={6}>
        <HairModelInfo />
      </Grid>
      <Grid item xs={12} md={6}>
        <HairdModelForm
          setConfirm={setConfirm}
          setName={setName}
          setError={setError}
          setErrorMsg={setErrorMsg}
        />
      </Grid>
    </Grid>
  )
}

export default HairModel
