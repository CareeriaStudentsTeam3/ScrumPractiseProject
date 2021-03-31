import React, { useState } from 'react'

// Material UI imports
import Grid from '@material-ui/core/Grid'

// Component imports
import HairdModelForm from '../components/HairModelForm/HairModelForm'
import HairModelInfo from '../components/HairModelForm/HairModelInfo'
import HairModelConfirm from '../components/HairModelForm/HairModelConfirm'

const HairModel = () => {
  const [confirm, setConfirm] = useState(false)
  const [name, setName] = useState(null)

  if (confirm) {
    return (
      <Grid container spacing={0} alignItems="center" justify="center">
        <Grid item xs={12} md={6}>
          <HairModelConfirm name={name} />
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
        <HairdModelForm setConfirm={setConfirm} setName={setName} />
      </Grid>
    </Grid>
  )
}

export default HairModel
