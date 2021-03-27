import React from 'react'

// Form library
import { useFormik } from 'formik'
// Validation for forms
import * as yup from 'yup'

// Material UI imports
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import InputLabel from '@material-ui/core/InputLabel'
import Box from '@material-ui/core/Box'

// Service import
import hairModelService from '../../services/hairmodel'

const validationSchema = yup.object({
  // TODO: All validations
  email: yup
    .string('Enter your email')
    .email('Enter a valid email')
    .required('Email is required'),
})

const HairModelForm = () => {
  // TODO: Check that image upload works
  const formik = useFormik({
    initialValues: {
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
    },
    validationSchema: validationSchema,
    onSubmit: (values, { resetForm }) => {
      alert(JSON.stringify(values, null, 2))
      console.log(values)
      hairModelService.create(values).then(resetForm())
    },
  })

  return (
    <div>
      <Box display="flex" justifyContent="center">
        <Box width={'75%'}>
          <form onSubmit={formik.handleSubmit}>
            <Box my={2}>
              <TextField
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
                fullWidth
                variant="outlined"
                labelId="gender"
                id="gender"
                name="gender"
                label="Sukupuoli"
                value={formik.values.gender}
                onChange={formik.handleChange}
              >
                <MenuItem value={'mies'}>Mies</MenuItem>
                <MenuItem value={'nainen'}>Nainen</MenuItem>
              </Select>
            </Box>
            <Box mb={2}>
              <InputLabel shrink id="hair_length">
                Hiusten pituus
              </InputLabel>
              <Select
                fullWidth
                variant="outlined"
                labelId="hair_length"
                id="hair_length"
                name="hair_length"
                label="Hiusten pituus"
                value={formik.values.hair_length}
                onChange={formik.handleChange}
              >
                <MenuItem value={'lyhyet'}>Lyhyet</MenuItem>
                <MenuItem value={'keskipitkät'}>Keskipitkät</MenuItem>
                <MenuItem value={'pitkät'}>Pitkät</MenuItem>
              </Select>
            </Box>
            <Box mb={2}>
              <TextField
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
              <input
                id="image"
                name="image"
                label="Kuva"
                type="file"
                onChange={(event) => {
                  formik.setFieldValue('image', event.target.files[0])
                }}
              />
            </Box>
            <Box mb={2}>
              <Button
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
