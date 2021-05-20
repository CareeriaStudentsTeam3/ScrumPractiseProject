import React from 'react'

// Form library
import { Formik, Form } from 'formik'
import Textfield from '../../FormsUI/Textfield/Textfield'
import FormButton from '../../FormsUI/Button/Button'

// Import form validation schema
import { serviceValidationSchema } from '../../../validationSchemas/validationSchemas'

// Material UI imports
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import Box from '@material-ui/core/Box'

const ServiceCreate = ({ handleBackButton, handleSubmit }) => {
  const INITIAL_FORM_STATE = {
    service_name: '',
    duration: '',
    price: null || '',
    max_group_size: null || '',
  }

  return (
    <Grid container justify="center" alignItems="center">
      <Grid container item xs={12} md={6} component={Paper} justify="center">
        <Grid item xs={10} md={8}>
          <Box my={3}>
            <Formik
              initialValues={INITIAL_FORM_STATE}
              validationSchema={serviceValidationSchema}
              onSubmit={(values) => handleSubmit(values)}
            >
              <Form data-testid="form">
                <Box mb={2}>
                  <Textfield
                    name="service_name"
                    label="Palvelun nimi"
                    inputProps={{ 'data-testid': 'serviceNameInput' }}
                  />
                </Box>
                <Textfield
                  name="duration"
                  label="Kesto minuutteina"
                  inputProps={{ 'data-testid': 'durationInput' }}
                />

                <Box my={3}>
                  <Textfield
                    name="price"
                    label="Hinta"
                    type="number"
                    inputProps={{ 'data-testid': 'priceInput' }}
                  />
                </Box>
                <Textfield
                  name="max_group_size"
                  label="Maksimi ryhmä koko"
                  type="number"
                  inputProps={{ 'data-testid': 'maxGroupSizeInput' }}
                />
                <Box my={3} display="flex" justifyContent="center">
                  <FormButton data-testid="submit">Luo uusi palvelu</FormButton>
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
              </Form>
            </Formik>
          </Box>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default ServiceCreate
