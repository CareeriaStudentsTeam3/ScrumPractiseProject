import React from 'react'

// Form library
import { Formik, Form } from 'formik'
import Textfield from '../FormsUI/Textfield/Textfield'
import Select from '../FormsUI/Select/Select'
import Button from '../FormsUI/Button/Button'
import FileInput from '../FormsUI/FileInput/FileInput'

// Import form validation schema
import { hairModelValidationSchema } from '../../validationSchemas/validationSchemas'

// Material UI imports
import Box from '@material-ui/core/Box'

const HairModelForm = ({ handleSubmit }) => {
  const INITIAL_FORM_STATE = {
    first_name: '',
    last_name: '',
    city: '',
    phone: '',
    email: '',
    age: '',
    gender: '',
    hair_length: '',
    hair_procedures: '',
    image: null || '',
  }

  const GENDERS = {
    MALE: 'Mies',
    FEMALE: 'Nainen',
    OTHER: 'Muu/en halua määritellä',
  }

  const HAIR_LENGTHS = {
    SHORT: 'Lyhyet',
    MEDIUM: 'Keskipitkät',
    LONG: 'Pitkät',
  }

  return (
    <div>
      <Box display="flex" justifyContent="center">
        <Box width={'75%'}>
          <Formik
            initialValues={INITIAL_FORM_STATE}
            validationSchema={hairModelValidationSchema}
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
                  name="city"
                  label="Paikkakunta"
                  inputProps={{
                    'data-testid': 'cityInput',
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
                  name="age"
                  label="Ikä"
                  type="number"
                  inputProps={{
                    'data-testid': 'ageInput',
                  }}
                />
              </Box>
              <Box mb={2}>
                <Select
                  name="gender"
                  label="Sukupuoli"
                  options={GENDERS}
                  inputProps={{
                    'data-testid': 'genderSelect',
                  }}
                />
              </Box>
              <Box mb={2}>
                <Select
                  name="hair_length"
                  label="Hiusten pituus"
                  options={HAIR_LENGTHS}
                  inputProps={{
                    'data-testid': 'hairLengthSelect',
                  }}
                />
              </Box>
              <Box mb={2}>
                <Textfield
                  name="hair_procedures"
                  label="Aiemmat käsittelyt"
                  multiline={true}
                  rows={4}
                  inputProps={{
                    'data-testid': 'hairProceduresInput',
                  }}
                />
              </Box>
              <Box mb={2}>
                <FileInput
                  value={undefined}
                  name="image"
                  label="Kuva"
                  type="file"
                  accept="image/*"
                  data-testid="imageFileInput"
                />
              </Box>
              <Box mb={2}>
                <Button data-testid="submit">Lähetä</Button>
              </Box>
            </Form>
          </Formik>
        </Box>
      </Box>
    </div>
  )
}

export default HairModelForm
