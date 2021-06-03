import React from 'react'

// Form library
import { Formik, Form } from 'formik'
import Textfield from '../../FormsUI/Textfield/Textfield'
import Select from '../../FormsUI/Select/Select'
import FormButton from '../../FormsUI/Button/Button'

// Import form validation schema
import { userValidationSchema } from '../../../validationSchemas/validationSchemas'

// Material UI imports
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'

const UserCreate = ({ oneUser, handleBackButton, handleUpdateSubmit }) => {
  const INITIAL_FORM_STATE = {
    id: oneUser.id || '',
    username: oneUser.username || '',
    first_name: oneUser.first_name || '',
    last_name: oneUser.last_name || '',
    password: oneUser.password || '',
    password_again: oneUser.password_again || '',
    is_active: oneUser.is_active || true,
    groups: oneUser.groups || '',
  }

  const GROUPS = {
    teacher: 'Opettaja',
    student: 'Opiskelija',
  }

  return (
    <Grid container justify="center" alignItems="center">
      <Grid container item xs={12} md={6} component={Paper} justify="center">
        <Grid item xs={10} md={8}>
          <Box my={3}>
            <Formik
              initialValues={INITIAL_FORM_STATE}
              validationSchema={userValidationSchema}
              onSubmit={(values) => handleUpdateSubmit(values)}
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
                  name="first_name"
                  label="Etunimi"
                  inputProps={{ 'data-testid': 'firstNameInput' }}
                />
                <Box my={3}>
                  <Textfield
                    name="last_name"
                    label="Sukunimi"
                    inputProps={{ 'data-testid': 'lastNameInput' }}
                  />
                </Box>
                <Textfield
                  name="password"
                  label="Salasana"
                  type="password"
                  inputProps={{ 'data-testid': 'passwordInput' }}
                />
                <Box my={3}>
                  <Textfield
                    name="password_again"
                    label="Salasana uudelleen"
                    type="password"
                    inputProps={{ 'data-testid': 'passwordAgainInput' }}
                  />
                </Box>
                <Select
                  name="groups"
                  label="Käyttäjäryhmä"
                  options={GROUPS}
                  inputProps={{ 'data-testid': 'groupsSelect' }}
                />
                <Box my={3} display="flex" justifyContent="center">
                  <FormButton data-testid="submit">
                    Muokkaa käyttäjää
                  </FormButton>
                </Box>
                <Box my={3} display="flex" justifyContent="center">
                  <Button
                    color="default"
                    variant="contained"
                    onClick={() => handleBackButton()}
                  >
                    Palaa takaisin listaan
                  </Button>
                </Box>
              </Form>
            </Formik>
          </Box>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default UserCreate
