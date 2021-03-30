import React from 'react'

// Material UI imports
import Grid from '@material-ui/core/Grid'

// Component imports
import HairdModelForm from '../components/HairModelForm/HairModelForm'
import HairModelInfo from '../components/HairModelForm/HairModelInfo'

const HairModel = () => {
  return (
    <Grid container spacing={0} alignItems="center" justify="center">
      <Grid container item xs={12} md={6}>
        <HairModelInfo />
      </Grid>
      <Grid item xs={12} md={6}>
        <HairdModelForm />
      </Grid>
    </Grid>
  )
}

export default HairModel
