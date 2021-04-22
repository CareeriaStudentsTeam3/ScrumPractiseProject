import React from 'react'
import { useFormik } from 'formik'

// Import form validation schema
import { serviceValidationSchema } from '../../../validationSchemas/validationSchemas'

// Material UI imports
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Box from '@material-ui/core/Box'

const ServiceCreate = ({ handleBackButton, addNewService }) => {
  const formik = useFormik({
    initialValues: {
      service_name: '',
      duration: '',
      price: null || '',
      max_group_size: null || '',
    },
    validationSchema: serviceValidationSchema,
    onSubmit: async (values) => {
      console.log('values', values)
      addNewService(values)
    },
  })

  return (
    <Grid container justify="center" alignItems="center">
      <Grid container item xs={12} md={6} component={Paper} justify="center">
        <Grid item xs={10} md={8}>
          <Box my={3}>
            <form onSubmit={formik.handleSubmit}>
              <Box mb={2}>
                <TextField
                  fullWidth
                  variant="outlined"
                  id="service_name"
                  name="service_name"
                  label="Palvelun nimi"
                  type="text"
                  value={formik.values.service_name}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.service_name &&
                    Boolean(formik.errors.service_name)
                  }
                  helperText={
                    formik.touched.service_name && formik.errors.service_name
                  }
                />
              </Box>
              <TextField
                fullWidth
                variant="outlined"
                id="duration"
                name="duration"
                label="Kesto minuutteina"
                type="number"
                value={formik.values.duration}
                onChange={formik.handleChange}
                error={
                  formik.touched.duration && Boolean(formik.errors.duration)
                }
                helperText={formik.touched.duration && formik.errors.duration}
              />
              <Box my={3}>
                <TextField
                  fullWidth
                  variant="outlined"
                  id="price"
                  name="price"
                  label="Hinta"
                  type="number"
                  value={formik.values.price}
                  onChange={formik.handleChange}
                  error={formik.touched.price && Boolean(formik.errors.price)}
                  helperText={formik.touched.price && formik.errors.price}
                />
              </Box>
              <TextField
                fullWidth
                variant="outlined"
                id="max_group_size"
                name="max_group_size"
                label="Maksimi ryhmä koko"
                type="number"
                value={formik.values.max_group_size}
                onChange={formik.handleChange}
                error={
                  formik.touched.max_group_size &&
                  Boolean(formik.errors.max_group_size)
                }
                helperText={
                  formik.touched.max_group_size && formik.errors.max_group_size
                }
              />
              <Box my={3} display="flex" justifyContent="center">
                <Button color="primary" variant="contained" type="submit">
                  Luo uusi palvelu
                </Button>
              </Box>
              <Box my={3} display="flex" justifyContent="center">
                <Button
                  onClick={() => handleBackButton()}
                  color="default"
                  variant="contained"
                >
                  Palaa takaisin listaan
                </Button>
              </Box>
            </form>
          </Box>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default ServiceCreate
