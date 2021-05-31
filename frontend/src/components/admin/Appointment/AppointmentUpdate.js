import React, { useState, useEffect } from 'react'

// Form library
import { Formik, Form } from 'formik'
import Textfield from '../../FormsUI/Textfield/Textfield'
import Select from '../../FormsUI/Select/Select'
import FormButton from '../../FormsUI/Button/Button'

// Service import
import appointmentService from '../../../services/appointment'
import timespanService from '../../../services/timespan'
import logoutService from '../../../services/logout'

// Import utils
import { formatStartDate, formatEndDate } from '../../../utils/dateFuncs'

// Validationschema
import { appointmentValidationSchema } from '../../../validationSchemas/validationSchemas'

// Material UI imports
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import Switch from '@material-ui/core/Switch'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import { useHistory, Redirect } from 'react-router'

const AppointmentUpdate = ({
  appointment,
  handleSubmit,
  services,
  handleNotification,
  dateTimes,
}) => {
  let history = useHistory()

  const [user, setUser] = useState(null)

  const [disable, setDisable] = useState(true)
  const [edit, setEdit] = useState(false)

  const [redirect, setRedirect] = useState(false)

  const INITIAL_FORM_STATE = {
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
  }

  const DATETIMES_SELECT = dateTimes.reduce(
    (acc, cur) => ({
      ...acc,
      [cur.id]: `${formatStartDate(cur.beginning)} - ${formatEndDate(
        cur.end
      )} - Max ryhmäkoko: ${cur.max_group_size}`,
    }),
    {}
  )

  const SERVICES_SELECT = services.reduce(
    (acc, cur) => ({
      ...acc,
      [cur.id]: `${cur.service_name} - Pituus: ${cur.duration}min`,
    }),
    {}
  )

  const handleDelete = async (id) => {
    console.log(id)
    if (window.confirm('Haluatko varmasti poistaa tämän hiusmallin?')) {
      try {
        const response = await appointmentService.del(id)
        console.log('response', response)
        if (
          response.detail ===
          'You do not have permission to perform this action.'
        ) {
          throw new Error('Sinulla ei ole oikeutta tehdä tätä!')
        }
        const timespan = await timespanService.getOne(
          appointment.appointment_date
        )
        if (timespan) {
          const updatedTimespan = {
            ...timespan,
            status: 'FREE',
          }
          await timespanService.update(
            appointment.appointment_date,
            updatedTimespan
          )
        }
        handleNotification('Poistetaan...')
        setTimeout(() => {
          setRedirect(true)
        }, 2000)
      } catch (err) {
        if (err.message.includes('Sinulla ei ole oikeutta tehdä tätä!')) {
          handleNotification('Sinulla ei ole oikeutta tehdä tätä!')
          setTimeout(() => {
            setRedirect(true)
          }, 3000)
        } else {
          handleNotification('Varauksen poisto epäonnistui!')
          setTimeout(() => {
            setRedirect(true)
          }, 3000)
        }
      }
    }
  }

  const handleEdit = (e) => {
    e.preventDefault()
    setEdit(true)
    setDisable(false)
  }

  const handleCancel = (e, handleReset) => {
    e.preventDefault()
    setEdit(false)
    setDisable(true)
    handleReset()
  }

  const handleBackButton = (e) => {
    e.preventDefault()
    history.push({
      pathname: '/admin/appointment',
    })
  }

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('user')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      if (user.login_success === true) {
        console.log('user', user)
        setUser(user)
      }
    }
    if (
      JSON.parse(loggedUserJSON) === null ||
      !JSON.parse(loggedUserJSON).login_success
    ) {
      logoutService.logout()
      setRedirect(true)
    }
  }, [])

  if (redirect) {
    return <Redirect to="/admin/appointment" />
  }

  if (user !== null && user.user_group[0] === 'student') {
    return (
      <Grid container spacing={0} alignItems="center" justify="center">
        {console.log(appointment)}
        {console.log('initial', INITIAL_FORM_STATE)}
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
              <Formik
                initialValues={INITIAL_FORM_STATE}
                validationSchema={appointmentValidationSchema}
                enableReinitialize={true}
                onSubmit={(values) =>
                  handleSubmit(values, { initialValues: INITIAL_FORM_STATE })
                }
              >
                {({ values, handleChange }) => (
                  <Form>
                    <Box my={2}>
                      <Textfield
                        name="first_name"
                        label="Etunimi"
                        disabled={disable}
                      />
                    </Box>
                    <Box my={2}>
                      <Textfield
                        name="last_name"
                        label="Sukunimi"
                        disabled={disable}
                      />
                    </Box>
                    <Box my={2}>
                      <Textfield
                        name="email"
                        label="Sähköposti"
                        disabled={disable}
                      />
                    </Box>
                    <Box my={2}>
                      <Textfield
                        name="phone"
                        label="Puhelinnumero"
                        disabled={disable}
                      />
                    </Box>
                    <Box my={2}>
                      <Textfield
                        name="group_size"
                        label="Ryhmä koko"
                        type="number"
                        disabled={disable}
                      />
                    </Box>
                    <Box my={2}>
                      <Select
                        disabled={disable}
                        name="service"
                        label="Palvelu"
                        options={SERVICES_SELECT}
                      />
                    </Box>
                    <Box my={2}>
                      <Select
                        disabled={disable}
                        name="appointment_date"
                        label="Varauksen päivämäärä"
                        options={DATETIMES_SELECT}
                      />
                    </Box>
                    <Box my={2}>
                      <Textfield
                        name="place"
                        label="Paikka"
                        disabled={disable}
                      />
                    </Box>
                    <Box my={2}>
                      <Textfield
                        name="info"
                        label="Lisätiedot"
                        multiline={true}
                        rows={4}
                        disabled={disable}
                      />
                    </Box>
                    <Box my={2}>
                      <FormControlLabel
                        label={
                          values.confirmed === false
                            ? 'Vahvista varaus'
                            : 'Varaus vahvistettu'
                        }
                        control={
                          <Switch
                            disabled={disable}
                            checked={values.confirmed}
                            onChange={handleChange}
                            name="confirmed"
                            inputProps={{ 'aria-label': 'secondary checkbox' }}
                          />
                        }
                      />
                    </Box>
                    <Box>
                      <Button
                        onClick={(e) => handleBackButton(e)}
                        color="primary"
                        variant="contained"
                        type="button"
                      >
                        Palaa takaisin listaan
                      </Button>
                    </Box>
                  </Form>
                )}
              </Formik>
            </Box>
          </Box>
        </Grid>
      </Grid>
    )
  }

  return (
    <Grid container spacing={0} alignItems="center" justify="center">
      {console.log(user)}
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
            <Formik
              enableReinitialize
              initialValues={INITIAL_FORM_STATE}
              validationSchema={appointmentValidationSchema}
              onSubmit={(values) =>
                handleSubmit(values, { initialValues: INITIAL_FORM_STATE })
              }
            >
              {({ handleChange, values, initialValues, handleReset }) => (
                <Form>
                  <Box my={2}>
                    <Textfield
                      name="first_name"
                      label="Etunimi"
                      disabled={disable}
                    />
                  </Box>
                  <Box my={2}>
                    <Textfield
                      name="last_name"
                      label="Sukunimi"
                      disabled={disable}
                    />
                  </Box>
                  <Box my={2}>
                    <Textfield
                      name="email"
                      label="Sähköposti"
                      disabled={disable}
                    />
                  </Box>
                  <Box my={2}>
                    <Textfield
                      name="phone"
                      label="Puhelinnumero"
                      disabled={disable}
                    />
                  </Box>
                  <Box my={2}>
                    <Textfield
                      name="group_size"
                      label="Ryhmä koko"
                      type="number"
                      disabled={disable}
                    />
                  </Box>
                  <Box my={2}>
                    <Select
                      disabled={disable}
                      name="service"
                      label="Palvelu"
                      options={SERVICES_SELECT}
                    />
                  </Box>
                  <Box my={2}>
                    <Select
                      disabled={disable}
                      name="appointment_date"
                      label="Varauksen päivämäärä"
                      options={DATETIMES_SELECT}
                    />
                  </Box>
                  <Box my={2}>
                    <Textfield name="place" label="Paikka" disabled={disable} />
                  </Box>
                  <Box my={2}>
                    <Textfield
                      name="info"
                      label="Lisätiedot"
                      multiline={true}
                      rows={4}
                      disabled={disable}
                    />
                  </Box>
                  <Box my={2}>
                    <FormControlLabel
                      label={
                        values.confirmed === false
                          ? 'Vahvista varaus'
                          : 'Varaus vahvistettu'
                      }
                      control={
                        <Switch
                          disabled={disable}
                          checked={values.confirmed}
                          onChange={handleChange}
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
                          size="medium"
                          variant="contained"
                          type="button"
                        >
                          Muokkaa
                        </Button>
                      </Box>
                      <Box mr={3}>
                        <Button
                          onClick={() => handleDelete(initialValues.id)}
                          color="secondary"
                          size="medium"
                          variant="contained"
                          type="button"
                        >
                          Poista
                        </Button>
                      </Box>
                      <Box>
                        <Button
                          onClick={(e) => handleBackButton(e)}
                          color="primary"
                          size="medium"
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
                        <FormButton
                          color="primary"
                          variant="contained"
                          type="submit"
                        >
                          Tallenna
                        </FormButton>
                      </Box>
                      <Box>
                        <Button
                          onClick={(e) => handleCancel(e, handleReset)}
                          color="secondary"
                          variant="contained"
                          type="button"
                        >
                          Peruuta
                        </Button>
                      </Box>
                    </Box>
                  )}
                </Form>
              )}
            </Formik>
          </Box>
        </Box>
      </Grid>
    </Grid>
  )
}

export default AppointmentUpdate
