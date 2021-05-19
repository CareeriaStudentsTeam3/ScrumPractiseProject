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
            <Form>
              <Box my={2}>
                <Textfield name="first_name" label="Etunimi" />
              </Box>
              <Box mb={2}>
                <Textfield name="last_name" label="Sukunimi" />
              </Box>
              <Box mb={2}>
                <Textfield name="city" label="Paikkakunta" />
              </Box>
              <Box mb={2}>
                <Textfield name="phone" label="Puhelinnumero" />
              </Box>
              <Box mb={2}>
                <Textfield name="email" label="Sähköposti" type="email" />
              </Box>
              <Box mb={2}>
                <Textfield
                  name="age"
                  label="Ikä"
                  type="number"
                  inputProps={{
                    min: '0',
                    max: '100',
                  }}
                />
              </Box>
              <Box mb={2}>
                <Select name="gender" label="Sukupuoli" options={GENDERS} />
              </Box>
              <Box mb={2}>
                <Select
                  name="hair_length"
                  label="Hiusten pituus"
                  options={HAIR_LENGTHS}
                />
              </Box>
              <Box mb={2}>
                <Textfield
                  name="hair_procedures"
                  label="Aiemmat käsittelyt"
                  multiline={true}
                  rows={4}
                />
              </Box>
              <Box mb={2}>
                <FileInput
                  value={undefined}
                  name="image"
                  label="Kuva"
                  type="file"
                  accept="image/*"
                />
              </Box>
              <Box mb={2}>
                <Button>Lähetä</Button>
              </Box>
            </Form>
          </Formik>
        </Box>
      </Box>
    </div>
  )
}

export default HairModelForm
