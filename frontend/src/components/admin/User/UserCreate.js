import React from 'react'
import { useFormik } from 'formik'

// Import form validation schema
// import { serviceValidationSchema } from '../../../validationSchemas/validationSchemas'

// Material UI imports
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Box from '@material-ui/core/Box'

const UserCreate = ({ handleBackButton, addNewUser }) => {
  const formik = useFormik({
    initialValues: {
      username: '',
      first_name: '',
      last_name: '',
      password: '',
      password_again: '',
      is_active: true,
      groups: [''],
    },
    // validationSchema: serviceValidationSchema,
    onSubmit: async (values) => {
      values.groups = [...values.groups]
      console.log('values', values)
      addNewUser(values)
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
                  id="username"
                  name="username"
                  label="Käyttäjätunnus"
                  type="text"
                  value={formik.values.username}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.username && Boolean(formik.errors.username)
                  }
                  helperText={formik.touched.username && formik.errors.username}
                />
              </Box>
              <TextField
                fullWidth
                variant="outlined"
                id="first_name"
                name="first_name"
                label="Etunimi"
                type="text"
                value={formik.values.first_name}
                onChange={formik.handleChange}
                error={
                  formik.touched.first_name && Boolean(formik.errors.first_name)
                }
                helperText={
                  formik.touched.first_name && formik.errors.first_name
                }
              />
              <Box my={3}>
                <TextField
                  fullWidth
                  variant="outlined"
                  id="last_name"
                  name="last_name"
                  label="Sukunimi"
                  type="text"
                  value={formik.values.last_name}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.last_name && Boolean(formik.errors.last_name)
                  }
                  helperText={
                    formik.touched.last_name && formik.errors.last_name
                  }
                />
              </Box>
              <TextField
                fullWidth
                variant="outlined"
                id="password"
                name="password"
                label="Salasana"
                type="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                error={
                  formik.touched.password && Boolean(formik.errors.password)
                }
                helperText={formik.touched.password && formik.errors.password}
              />
              <Box my={3}>
                <TextField
                  fullWidth
                  variant="outlined"
                  id="password_again"
                  name="password_again"
                  label="Salasana uudelleen"
                  type="password"
                  value={formik.values.password_again}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.password_again &&
                    Boolean(formik.errors.password)
                  }
                  helperText={
                    formik.touched.password_again &&
                    formik.errors.password_again
                  }
                />
              </Box>
              <TextField
                fullWidth
                variant="outlined"
                id="groups"
                name="groups"
                label="Käyttäjäryhmä"
                type="text"
                value={formik.values.groups}
                onChange={formik.handleChange}
                error={formik.touched.groups && Boolean(formik.errors.groups)}
                helperText={formik.touched.groups && formik.errors.groups}
              />
              <Box my={3} display="flex" justifyContent="center">
                <Button color="primary" variant="contained" type="submit">
                  Luo uusi käyttäjä
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

export default UserCreate
