import React, { useState } from 'react'

// Form library
import { useFormik } from 'formik'

// Service import
import appointmentService from '../../../services/appointment'

// Import utils
import { formatStartDate, formatEndDate } from '../../../utils/dateFuncs'

// Component imports
import Notification from '../../Notification/Notification'

// Material UI imports
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import Box from '@material-ui/core/Box'
import Switch from '@material-ui/core/Switch'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import InputLabel from '@material-ui/core/InputLabel'
import { useHistory, Redirect } from 'react-router'

const AppointmentUpdate = ({ appointment, services, dateTimes }) => {
  let history = useHistory()

  const [disable, setDisable] = useState(true)
  const [edit, setEdit] = useState(false)

  const [redirect, setRedirect] = useState(false)

  // Notifications
  const [open, setOpen] = useState(false)
  const [notificationMsg, setNotificationMsg] = useState(null)

  const handleDelete = async (id) => {
    console.log(id)
    if (window.confirm('Haluatko varmasti poistaa tämän hiusmallin?')) {
      try {
        await appointmentService.del(id)
        handleNotification('Poistetaan...')
        setTimeout(() => {
          setRedirect(true)
        }, 2000)
      } catch (err) {
        console.log('delerror', err.name)
        handleNotification('Hiusmallin poisto epäonnistui!')
        setTimeout(() => {
          setRedirect(true)
        }, 3000)
      }
    }
  }

  const handleNotification = (msg) => {
    setOpen(true)
    setNotificationMsg(msg)
  }

  const handleEdit = (e) => {
    e.preventDefault()
    setEdit(true)
    setDisable(false)
  }

  const handleCancel = (e) => {
    e.preventDefault()
    // console.log('cancel', hairModel)
    // console.log('cancel', model)
    setEdit(false)
    setDisable(true)
    formik.handleReset()
  }

  const handleBackButton = (e) => {
    e.preventDefault()
    history.push({
      pathname: '/admin/appointment',
    })
  }
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      id: appointment.id,
      first_name: appointment.first_name || '',
      last_name: appointment.last_name || '',
      email: appointment.email || '',
      phone: appointment.phone || '',
      group_size: appointment.group_size || '',
      service: appointment.service || '',
      appointment_date: appointment.appointment_date || '',
      place: appointment.place || '',
      info: appointment.info || '',
      confirmed: appointment.confirmed || false,
    },
    onSubmit: async (values) => {
      // alert(JSON.stringify(values, null, 2))
      console.log(values)
      try {
        const response = await appointmentService.update(values, values.id)
        console.log('res', response)
        handleNotification('Tallennetaan...')
        setTimeout(() => {
          history.push({
            pathname: '/admin/appointment',
          })
        }, 2000)
      } catch (err) {
        console.log('error', err.name)
        handleNotification('On tapahtunut virhe! Palataan edelliselle sivulle.')
        setTimeout(() => {
          history.push({
            pathname: '/admin/appointment',
          })
        }, 3000)
      }
    },
  })

  if (redirect) {
    return <Redirect to="/admin/appointment" />
  }

  return (
    <Grid container spacing={0} alignItems="center" justify="center">
      {console.log(appointment)}
      <Grid container item xs={12} md={6}>
        <Box display="flex" m="auto">
          <Box>
            <Typography variant="h3" color="textSecondary">
              Ylläpidon info kenttä?
            </Typography>
          </Box>
        </Box>
      </Grid>
      <Grid item xs={12} md={6}>
        <Box display="flex" justifyContent="center">
          <Box width={'75%'}>
            <form onSubmit={formik.handleSubmit}>
              <Notification message={notificationMsg} open={open} />
              <Box my={2}>
                <TextField
                  disabled={disable}
                  fullWidth
                  id="first_name"
                  name="first_name"
                  label="Etunimi"
                  type="text"
                  value={formik.values.first_name}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.first_name &&
                    Boolean(formik.errors.first_name)
                  }
                  helperText={
                    formik.touched.first_name && formik.errors.first_name
                  }
                />
              </Box>
              <Box my={2}>
                <TextField
                  disabled={disable}
                  fullWidth
                  id="last_name"
                  name="last_name"
                  label="Sukunimi"
                  type="text"
                  value={formik.values.last_name}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.last_name && Boolean(formik.errors.last_name)
                  }
                  helperText={
                    formik.touched.last_name && formik.errors.last_name
                  }
                />
              </Box>
              <Box my={2}>
                <TextField
                  disabled={disable}
                  fullWidth
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
              <Box my={2}>
                <TextField
                  disabled={disable}
                  fullWidth
                  id="phone"
                  name="phone"
                  label="Puhelinnumero"
                  type="text"
                  value={formik.values.phone}
                  onChange={formik.handleChange}
                  error={formik.touched.phone && Boolean(formik.errors.phone)}
                  helperText={formik.touched.phone && formik.errors.phone}
                />
              </Box>
              <Box my={2}>
                <TextField
                  disabled={disable}
                  fullWidth
                  id="group_size"
                  name="group_size"
                  label="Ryhmä koko"
                  type="number"
                  value={formik.values.group_size}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.group_size &&
                    Boolean(formik.errors.group_size)
                  }
                  helperText={
                    formik.touched.group_size && formik.errors.group_size
                  }
                />
              </Box>
              <Box my={2}>
                <InputLabel shrink id="service">
                  Palvelu
                </InputLabel>
                <Select
                  disabled={disable}
                  fullWidth
                  // variant="outlined"
                  labelId="service"
                  id="service"
                  name="service"
                  label="Palvelu"
                  value={formik.values.service}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.service && Boolean(formik.errors.service)
                  }
                >
                  {services.map((item) => (
                    <MenuItem key={item.id} value={item.id || ''}>
                      {`${item.service_name} - Pituus: ${item.duration}min`}
                    </MenuItem>
                  ))}
                </Select>
              </Box>
              <Box my={2}>
                <InputLabel shrink id="appointment_date">
                  Varauksen päivämäärä
                </InputLabel>
                <Select
                  disabled={disable}
                  fullWidth
                  // variant="outlined"
                  labelId="appointment_date"
                  id="appointment_date"
                  name="appointment_date"
                  label="Varauksen päivämäärä"
                  value={formik.values.appointment_date}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.appointment_date &&
                    Boolean(formik.errors.appointment_date)
                  }
                >
                  {dateTimes.map((item) => (
                    <MenuItem key={item.id} value={item.id || ''}>
                      {`${formatStartDate(item.beginning)} - ${formatEndDate(
                        item.end
                      )} - Max ryhmäkoko: ${item.max_group_size}`}
                    </MenuItem>
                  ))}
                </Select>
              </Box>
              <Box my={2}>
                <TextField
                  disabled={disable}
                  fullWidth
                  id="place"
                  name="place"
                  label="Paikka"
                  type="text"
                  value={formik.values.place}
                  onChange={formik.handleChange}
                  error={formik.touched.place && Boolean(formik.errors.place)}
                  helperText={formik.touched.place && formik.errors.place}
                />
              </Box>
              <Box my={2}>
                <TextField
                  disabled={disable}
                  fullWidth
                  multiline
                  rows={4}
                  id="info"
                  name="info"
                  label="Lisätiedot"
                  type="text"
                  value={formik.values.info}
                  onChange={formik.handleChange}
                  error={formik.touched.info && Boolean(formik.errors.info)}
                  helperText={formik.touched.info && formik.errors.info}
                />
              </Box>
              <Box my={2}>
                <FormControlLabel
                  label={
                    formik.values.confirmed === false
                      ? 'Vahvista varaus'
                      : 'Varaus vahvistettu'
                  }
                  control={
                    <Switch
                      disabled={disable}
                      checked={formik.values.confirmed}
                      onChange={formik.handleChange}
                      name="confirmed"
                      inputProps={{ 'aria-label': 'secondary checkbox' }}
                    />
                  }
                />
              </Box>
              {!edit && disable ? (
                <Box mb={2} display="flex">
                  <Box mr={2}>
                    <Button
                      onClick={(e) => handleEdit(e)}
                      color="primary"
                      variant="contained"
                      type="button"
                    >
                      Muokkaa
                    </Button>
                  </Box>
                  <Box mr={3}>
                    <Button
                      onClick={() => handleDelete(formik.values.id)}
                      color="secondary"
                      variant="contained"
                      type="button"
                    >
                      Poista
                    </Button>
                  </Box>
                  <Box>
                    <Button
                      onClick={(e) => handleBackButton(e)}
                      color="default"
                      variant="contained"
                      type="button"
                    >
                      Palaa takaisin listaan
                    </Button>
                  </Box>
                </Box>
              ) : (
                <Box mb={2} display="flex">
                  <Box mr={2}>
                    <Button color="primary" variant="contained" type="submit">
                      Tallenna
                    </Button>
                  </Box>
                  <Box>
                    <Button
                      onClick={(e) => handleCancel(e)}
                      color="secondary"
                      variant="contained"
                      type="button"
                    >
                      Peruuta
                    </Button>
                  </Box>
                </Box>
              )}
            </form>
          </Box>
        </Box>
      </Grid>
    </Grid>
  )
}

export default AppointmentUpdate
