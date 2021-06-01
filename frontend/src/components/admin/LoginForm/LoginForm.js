import React from 'react'

// Form library
import { Formik, Form } from 'formik'
import Textfield from '../../FormsUI/Textfield/Textfield'
import Button from '../../FormsUI/Button/Button'

// Import form validation schema
import { loginValidationSchema } from '../../../validationSchemas/validationSchemas'

// Component import
import HomeButton from '../../HomeButton/HomeButton'

// Material UI imports
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'

const LoginForm = ({ handleSubmit }) => {
  const INITIAL_FORM_STATE = {
    username: '',
    password: '',
  }

  return (
    <Grid container item xs={12} md={6} component={Paper} justify="center">
      <Grid item xs={10} md={8}>
        <Box my={3}>
          <Formik
            initialValues={INITIAL_FORM_STATE}
            validationSchema={loginValidationSchema}
            onSubmit={(values, { setErrors }) =>
              handleSubmit(values, { setErrors })
            }
          >
            <Form data-testid="form">
              <Box mb={2}>
                <Textfield
                  name="username"
                  label="Käyttäjätunnus"
                  inputProps={{ 'data-testid': 'usernameInput' }}
                />
              </Box>
              <Textfield
                name="password"
                label="Salasana"
                type="password"
                inputProps={{ 'data-testid': 'passwordInput' }}
              />
              <Box my={3} display="flex" justifyContent="center">
                <Button data-testid="submit">Kirjaudu sisään</Button>
              </Box>
            </Form>
          </Formik>
          <Box m="auto" textAlign="center" mt={2}>
            <HomeButton />
          </Box>
        </Box>
      </Grid>
    </Grid>
  )
}

export default LoginForm
