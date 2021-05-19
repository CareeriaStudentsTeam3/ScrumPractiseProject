import React from 'react'

// Form library
import { Formik, Form } from 'formik'
import Textfield from '../FormsUI/Textfield/Textfield'
import Select from '../FormsUI/Select/Select'
import Button from '../FormsUI/Button/Button'

// Import form validation schema
import { appointmentValidationSchema } from '../../validationSchemas/validationSchemas'

// Material UI imports
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import CardContent from '@material-ui/core/CardContent'
import CircularProgress from '@material-ui/core/CircularProgress'

const AppointmentForm = ({
  groupSize,
  service,
  date,
  handleSubmit,
  isLoading,
}) => {
  const INITIAL_FORM_STATE = {
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    place: '',
    info: '',
    group_size: groupSize,
    service: service,
    appointment_date: date,
    confirmed: false,
  }

  const PLACES = {
    koululla: 'Koululla',
    'Meidän valitsema paikka': 'Minun valitsema paikka',
  }

  if (isLoading) {
    return (
      <Box justifyContent="center">
        <CardContent>
          <Box textAlign="center">
            <CircularProgress />
          </Box>
        </CardContent>
      </Box>
    )
  }

  return (
    <Box justifyContent="center">
      <CardContent>
        <Box textAlign="center">
          <Typography variant="h4" color="textPrimary" gutterBottom>
            Yhteystiedot
          </Typography>
          <Typography variant="h5" component="h2"></Typography>
          <Typography color="textPrimary" gutterBottom>
            Täytä yhteystiedot
          </Typography>
        </Box>
        <Formik
          initialValues={INITIAL_FORM_STATE}
          validationSchema={appointmentValidationSchema}
          onSubmit={(values) => handleSubmit(values)}
        >
          <Form data-testid="form">
            <Box my={2}>
              <Textfield
                name="first_name"
                label="Etunimi"
                inputProps={{
                  'data-testid': 'firstNameInput',
                }}
              />
            </Box>
            <Box mb={2}>
              <Textfield
                name="last_name"
                label="Sukunimi"
                inputProps={{
                  'data-testid': 'lastNameInput',
                }}
              />
            </Box>
            <Box mb={2}>
              <Textfield
                name="email"
                label="Sähköposti"
                type="email"
                inputProps={{
                  'data-testid': 'emailInput',
                }}
              />
            </Box>
            <Box mb={2}>
              <Textfield
                name="phone"
                label="Puhelinnumero"
                inputProps={{
                  'data-testid': 'phoneInput',
                }}
              />
            </Box>
            <Box mb={2}>
              <Select
                name="place"
                label="Paikka"
                options={PLACES}
                inputProps={{
                  'data-testid': 'placeInput',
                }}
              />
            </Box>
            <Box mb={2}>
              <Textfield
                name="info"
                label="Lisätietoja"
                multiline={true}
                rows={4}
                inputProps={{
                  'data-testid': 'infoInput',
                }}
              />
            </Box>
            <Button data-testid="submit">Lähetä</Button>
          </Form>
        </Formik>
      </CardContent>
    </Box>
  )
}

export default AppointmentForm
