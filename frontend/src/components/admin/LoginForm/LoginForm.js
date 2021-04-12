import React from 'react'
import { useFormik } from 'formik'
import * as yup from 'yup'

// Service import
import loginService from '../../../services/login'

// Material UI imports
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Box from '@material-ui/core/Box'

const validationSchema = yup.object({
  username: yup.string().max(20, 'Liian pitkä').required('Pakollinen'),
  password: yup.string().required('Pakollinen'),
})

const LoginForm = ({ saveLogginInfo, setRedirect }) => {
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { resetForm, setErrors }) => {
      try {
        const user = await loginService.logIn({
          username: values.username,
          password: values.password,
        })
        console.log('user', user)
        resetForm()
        saveLogginInfo(user)
        setRedirect(true)
      } catch (error) {
        setErrors({
          username: 'Väärä käyttäjätunnus tai salasana',
          password: 'Väärä käyttäjätunnus tai salasana',
        })
      }
    },
  })

  return (
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
              id="password"
              name="password"
              label="Salasana"
              type="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />
            <Box my={3} display="flex" justifyContent="center">
              <Button color="primary" variant="contained" type="submit">
                Kirjaudu sisään
              </Button>
            </Box>
          </form>
        </Box>
      </Grid>
    </Grid>
  )
}

export default LoginForm
