import React from 'react'

// Material UI imports
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'

const HomeInfo = () => {
  return (
    <Grid container alignItems="center" justify="center" direction="row">
      <Grid item style={{ marginRight: '50px', marginBottom: '20px' }}>
        <img src="/logo.svg" width="100px" height="100px" />
      </Grid>
      <Grid item>
        <Typography variant="h3" color="textPrimary" gutterBottom style={{ fontFamily: 'Calibri Light' }}>
          CareeriaCare hiusalan palvelut
        </Typography>
      </Grid>
    </Grid>
  )
}

export default HomeInfo
