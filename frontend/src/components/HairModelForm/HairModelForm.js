import React from 'react'

// Form library
import { useFormik, Formik, Form } from 'formik'

// Import form validation schema
import { hairModelValidationSchema } from '../../validationSchemas/validationSchemas'

// Material UI imports
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import InputLabel from '@material-ui/core/InputLabel'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'

import Input from '@material-ui/core/Input'

// Service import
import hairModelService from '../../services/hairmodel'

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
  image: null,
}

const HairModelForm = ({
  setConfirm,
  setHairModel,
  setError,
  setErrorMsg,
  setIsLoading,
}) => {
  // const formik = useFormik({
  //   initialValues: {
  //     first_name: '',
  //     last_name: '',
  //     city: '',
  //     phone: '',
  //     email: '',
  //     age: '',
  //     gender: '',
  //     hair_length: '',
  //     hair_procedures: '',
  //     image: null,
  //   },
  //   validationSchema: hairModelValidationSchema,
  //   onSubmit: async (values, { resetForm }) => {
  //     let formData = new FormData()
  //     formData.append('first_name', values.first_name)
  //     formData.append('last_name', values.last_name)
  //     formData.append('city', values.city)
  //     formData.append('phone', values.phone)
  //     formData.append('email', values.email)
  //     formData.append('age', values.age)
  //     formData.append('gender', values.gender)
  //     formData.append('hair_length', values.hair_length)
  //     formData.append('hair_procedures', values.hair_procedures)
  //     if (values.image) {
  //       formData.append('image', values.image)
  //     }
  //     console.log(values)
  //     console.log(formData.get('image'))
  //     try {
  //       setIsLoading(true)
  //       const response = await hairModelService.create(formData)
  //       console.log('res', response)
  //       setHairModel(response)
  //       resetForm()
  //       setIsLoading(false)
  //       setConfirm(true)
  //     } catch (err) {
  //       console.log('error', err.name)
  //       setErrorMsg(err.message)
  //       setError(true)
  //     }
  //   },
  // })

  return (
    <div>
      <Box display="flex" justifyContent="center">
        <Box width={'75%'}>
          <form data-testid="form" onSubmit={formik.handleSubmit}>
            <Box my={2}>
              <TextField
                inputProps={{
                  'data-testid': 'firstNameInput',
                }}
                variant="outlined"
                fullWidth
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
            </Box>
            <Box mb={2}>
              <TextField
                inputProps={{
                  'data-testid': 'lastNameInput',
                }}
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
                helperText={formik.touched.last_name && formik.errors.last_name}
              />
            </Box>
            <Box mb={2}>
              <TextField
                inputProps={{
                  'data-testid': 'cityInput',
                }}
                fullWidth
                variant="outlined"
                id="city"
                name="city"
                label="Kaupunki"
                type="city"
                value={formik.values.city}
                onChange={formik.handleChange}
                error={formik.touched.city && Boolean(formik.errors.city)}
                helperText={formik.touched.city && formik.errors.city}
              />
            </Box>
            <Box mb={2}>
              <TextField
                inputProps={{
                  'data-testid': 'phoneInput',
                }}
                fullWidth
                variant="outlined"
                id="phone"
                name="phone"
                label="Puhelin"
                type="text"
                value={formik.values.phone}
                onChange={formik.handleChange}
                error={formik.touched.phone && Boolean(formik.errors.phone)}
                helperText={formik.touched.phone && formik.errors.phone}
              />
            </Box>
            <Box mb={2}>
              <TextField
                inputProps={{
                  'data-testid': 'emailInput',
                }}
                fullWidth
                variant="outlined"
                id="email"
                name="email"
                label="Sähköposti"
                type="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />
            </Box>
            <Box mb={2}>
              <TextField
                inputProps={{
                  'data-testid': 'ageInput',
                }}
                fullWidth
                variant="outlined"
                id="age"
                name="age"
                label="Ikä"
                type="number"
                value={formik.values.age}
                onChange={formik.handleChange}
                error={formik.touched.age && Boolean(formik.errors.age)}
                helperText={formik.touched.age && formik.errors.age}
              />
            </Box>
            <Box mb={2}>
              <InputLabel shrink id="gender">
                Sukupuoli
              </InputLabel>
              <Select
                inputProps={{
                  'data-testid': 'genderSelect',
                }}
                fullWidth
                variant="outlined"
                labelId="gender"
                id="gender"
                name="gender"
                label="Sukupuoli"
                value={formik.values.gender}
                onChange={formik.handleChange}
                error={formik.touched.gender && Boolean(formik.errors.gender)}
              >
                <MenuItem value={'MALE'}>Mies</MenuItem>
                <MenuItem value={'FEMALE'}>Nainen</MenuItem>
                <MenuItem value={'OTHER'}>Muu/en halua määritellä</MenuItem>
              </Select>
            </Box>
            <Box mb={2}>
              <InputLabel shrink id="hair_length">
                Hiusten pituus
              </InputLabel>
              <Select
                inputProps={{
                  'data-testid': 'hairLengthSelect',
                }}
                fullWidth
                variant="outlined"
                labelId="hair_length"
                id="hair_length"
                name="hair_length"
                label="Hiusten pituus"
                value={formik.values.hair_length}
                onChange={formik.handleChange}
                error={
                  formik.touched.hair_length &&
                  Boolean(formik.errors.hair_length)
                }
              >
                <MenuItem value={'SHORT'}>Lyhyet</MenuItem>
                <MenuItem value={'MEDIUM'}>Keskipitkät</MenuItem>
                <MenuItem value={'LONG'}>Pitkät</MenuItem>
              </Select>
            </Box>
            <Box mb={2}>
              <TextField
                inputProps={{
                  'data-testid': 'hairProceduresInput',
                }}
                fullWidth
                variant="outlined"
                multiline
                rows={4}
                id="hair_procedures"
                name="hair_procedures"
                label="Edelliset käsittelyt"
                type="text"
                value={formik.values.hair_procedures}
                onChange={formik.handleChange}
                error={
                  formik.touched.hair_procedures &&
                  Boolean(formik.errors.hair_procedures)
                }
                helperText={
                  formik.touched.hair_procedures &&
                  formik.errors.hair_procedures
                }
              />
            </Box>
            <Box mb={2}>
              <InputLabel shrink id="image">
                Lisää kuva
              </InputLabel>
              <Input
                inputProps={{
                  'data-testid': 'imageFileInput',
                }}
                id="image"
                name="image"
                label="Kuva"
                type="file"
                accept="image/*"
                onChange={(event) => {
                  formik.setFieldValue('image', event.currentTarget.files[0])
                }}
                error={formik.touched.image && Boolean(formik.errors.image)}
              />
              {formik.errors.image && formik.touched.image ? (
                <Typography paragraph color="error">
                  {formik.errors.image}
                </Typography>
              ) : null}
            </Box>
            <Box mb={2}>
              <Button
                data-testid="submit"
                color="primary"
                variant="contained"
                fullWidth
                type="submit"
              >
                Lähetä
              </Button>
            </Box>
          </form>
        </Box>
      </Box>
    </div>
  )
}

export default HairModelForm
