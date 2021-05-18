import React, { useState } from 'react'

// Form library
import { useFormik } from 'formik'

// Import form validation schema
import { appointmentValidationSchema } from '../../validationSchemas/validationSchemas'

// Material UI imports
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import InputLabel from '@material-ui/core/InputLabel'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import CardContent from '@material-ui/core/CardContent'
import CircularProgress from '@material-ui/core/CircularProgress'

// Service import
import appointmentService from '../../services/appointment'
import timespanService from '../../services/timespan'

const AppointmentForm = ({
  groupSize,
  service,
  date,
  setConfirm,
  setError,
}) => {
  const [isLoading, setIsLoading] = useState(false)

  const formik = useFormik({
    initialValues: {
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
    },
    validationSchema: appointmentValidationSchema,
    onSubmit: async (values, { resetForm }) => {
      // alert(JSON.stringify(values, null, 2))
      console.log(values)
      try {
        setIsLoading(true)
        const response = await appointmentService.create(values)
        console.log('response', response)
        if (response) {
          const timespan = await timespanService.getOne(values.appointment_date)
          if (timespan) {
            const updatedTimespan = {
              ...timespan,
              status: 'UNCONFIRMED',
            }
            await timespanService.update(
              values.appointment_date,
              updatedTimespan
            )
          }
        }
        resetForm()
        setConfirm(response)
        setIsLoading(false)
      } catch (err) {
        console.log('error', err.message)
        setError(true)
        setIsLoading(false)
      }
    },
  })

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
        <form onSubmit={formik.handleSubmit}>
          <Box my={2}>
            <TextField
              fullWidth
              id="first_name"
              name="first_name"
              label="Etunimi"
              value={formik.values.first_name}
              onChange={formik.handleChange}
              error={
                formik.touched.first_name && Boolean(formik.errors.first_name)
              }
              helperText={formik.touched.first_name && formik.errors.first_name}
            />
          </Box>
          <Box mb={2}>
            <TextField
              fullWidth
              id="last_name"
              name="last_name"
              label="Sukunimi"
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
              id="email"
              name="email"
              label="Sähköposti"
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
          </Box>
          <Box mb={2}>
            <TextField
              fullWidth
              id="phone"
              name="phone"
              label="Puhelinnumero"
              value={formik.values.phone}
              onChange={formik.handleChange}
              error={formik.touched.phone && Boolean(formik.errors.phone)}
              helperText={formik.touched.phone && formik.errors.phone}
            />
          </Box>
          <Box mb={2}>
            <InputLabel shrink id="place">
              Paikka
            </InputLabel>
            <Select
              fullWidth
              variant="outlined"
              labelId="place"
              id="place"
              name="place"
              label="Paikka"
              value={formik.values.place}
              onChange={formik.handleChange}
              error={formik.touched.place && Boolean(formik.errors.place)}
            >
              <MenuItem value={'koululla'}>Koululla</MenuItem>
              <MenuItem value={'Meidän valitsema paikka'}>
                Minun valitsema paikka
              </MenuItem>
            </Select>
          </Box>
          <Box mb={2}>
            <TextField
              fullWidth
              variant="outlined"
              multiline
              rows={4}
              id="info"
              name="info"
              label="Lisätietoja"
              type="text"
              value={formik.values.info}
              onChange={formik.handleChange}
              error={formik.touched.info && Boolean(formik.errors.info)}
              helperText={formik.touched.info && formik.errors.info}
            />
          </Box>
          <Button color="primary" variant="contained" fullWidth type="submit">
            Lähetä
          </Button>
        </form>
      </CardContent>
    </Box>
  )
}

export default AppointmentForm
