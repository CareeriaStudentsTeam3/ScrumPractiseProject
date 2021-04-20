import React, { useState } from 'react'
import { useFormik } from 'formik'
import * as yup from 'yup'

// Import React datepicker
import DatePicker from 'react-datepicker'

import 'react-datepicker/dist/react-datepicker.css'

// Import service
import timespanService from '../../../services/timespan'

// Import components
import Notification from '../../Notification/Notification'

// Material UI imports
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Box from '@material-ui/core/Box'
import ButtonGroup from '@material-ui/core/ButtonGroup'

const validationSchema = yup.object({
  beginning: yup.string().required('Pakollinen'),
  end: yup.string().required('Pakollinen'),
  max_group_size: yup
    .number()
    .positive()
    .min(3, 'Pienin ryhmäkoko on 3')
    .max(8, 'Isoin ryhmäkoko on 8')
    .required('Pakollinen'),
})

const AddDates = ({ setCreateDate, setRefresh, refresh }) => {
  const [date, setDate] = useState([])

  const [notificationMsg, setNotificationMsg] = useState(null)
  const [notificationOpen, setNotificationOpen] = useState(false)

  const saveDatesToDb = async (arrayOfDates) => {
    try {
      await arrayOfDates.map((date) => {
        timespanService.create(date)
      })
      setDate([])
      handleNotification('Ajat tallennettu tietokantaan', true)
      setTimeout(() => {
        setRefresh(!refresh)
        setCreateDate(false)
      }, 2000)
    } catch (error) {
      console.log(error)
      handleNotification('On tapahtunut virhe', true)
    }
  }

  const formatStartDate = (date) => {
    const wd = new Date(date).toLocaleDateString('fi-FI', {
      weekday: 'short',
    })
    const d = new Date(date).toLocaleDateString('fi-FI')
    const t = new Date(date).toLocaleTimeString('fi-FI', {
      hour: 'numeric',
      minute: 'numeric',
    })
    return `${wd} ${d} ${t}`
  }

  const formatEndDate = (date) => {
    const t = new Date(date).toLocaleTimeString('fi-FI', {
      hour: 'numeric',
      minute: 'numeric',
    })
    return t
  }

  const handleDelete = (object) => {
    if (window.confirm('Haluatko poistaa ajan listalta?')) {
      console.log(object)
      const newDateArr = date.filter((item) => item !== object)
      setDate(newDateArr)
      handleNotification('Aika poistettu.', true)
    }
  }

  const handleNotification = (msg, isOpen) => {
    setNotificationMsg(msg)
    setNotificationOpen(isOpen)
    setTimeout(() => {
      setNotificationMsg(null)
      setNotificationOpen(false)
    }, 3000)
  }

  const handleBackButton = () => {
    setCreateDate(false)
  }

  const formik = useFormik({
    initialValues: {
      beginning: new Date() || '',
      end: new Date() || '',
      max_group_size: null || '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      if (
        date.some(
          (date) =>
            date.beginning === values.beginning && date.end === values.end
        )
      ) {
        console.log('ERROR sama aika löytyy jo')
        handleNotification('Sama aika löytyy jo!', true)
      } else {
        console.log('values', values)
        setDate(date.concat(values))
        console.log(date)
        handleNotification(
          `Lisätty: ${formatStartDate(values.beginning)} ${formatEndDate(
            values.end
          )}`,
          true
        )
      }
    },
  })

  return (
    <Grid container justify="center" alignItems="center">
      <Notification message={notificationMsg} open={notificationOpen} />
      <Grid container item xs={12} md={6} component={Paper} justify="center">
        <Grid item xs={10} md={8}>
          <Box my={3}>
            <form onSubmit={formik.handleSubmit}>
              <Box display="flex" justifyContent="center" mb={2}>
                <DatePicker
                  showTimeSelect
                  dateFormat="dd.MM.yyyy, hh:mm aa"
                  timeFormat="p"
                  selected={formik.values.beginning}
                  onChange={(date) => {
                    formik.setFieldValue('beginning', date)
                    formik.setFieldValue('end', date)
                  }}
                />
                <DatePicker
                  selected={formik.values.end}
                  onChange={(date) => formik.setFieldValue('end', date)}
                  minDate={formik.values.beginning}
                  showTimeSelect
                  showTimeSelectOnly
                  timeIntervals={15}
                  timeCaption="Time"
                  timeFormat="hh:mm aa"
                  dateFormat="dd.MM.yyyy, hh:mm aa"
                />
              </Box>
              <TextField
                fullWidth
                variant="outlined"
                id="max_group_size"
                name="max_group_size"
                label="Maksimi ryhmä koko"
                type="number"
                value={formik.values.max_group_size}
                onChange={formik.handleChange}
                error={
                  formik.touched.max_group_size &&
                  Boolean(formik.errors.max_group_size)
                }
                helperText={
                  formik.touched.max_group_size && formik.errors.max_group_size
                }
              />
              <Box my={3} display="flex" justifyContent="center">
                <Button color="primary" variant="contained" type="submit">
                  Lisää vapaa aika
                </Button>
              </Box>
              {date.length > 0 ? (
                <div>
                  <Box my={3} display="flex" justifyContent="center">
                    <ButtonGroup
                      variant="contained"
                      color="default"
                      size="large"
                      orientation="vertical"
                    >
                      {date.map((d, index) => (
                        <Button onClick={() => handleDelete(d)} key={index}>
                          {`${formatStartDate(d.beginning)} ${formatEndDate(
                            d.end
                          )} Ryhmän koko: ${d.max_group_size}`}
                        </Button>
                      ))}
                    </ButtonGroup>
                  </Box>
                  <Box my={3} display="flex" justifyContent="center">
                    <Button
                      onClick={() => setDate([])}
                      color="secondary"
                      variant="contained"
                    >
                      Tyhjennä lista
                    </Button>
                  </Box>
                  <Box my={3} display="flex" justifyContent="center">
                    <Button
                      onClick={() => saveDatesToDb(date)}
                      color="primary"
                      variant="contained"
                    >
                      Tallenna ajat
                    </Button>
                  </Box>
                </div>
              ) : (
                <Box textAlign="center">
                  <h3>Aloita lisäämällä aikoja</h3>
                </Box>
              )}
              <Box my={3} display="flex" justifyContent="center">
                <Button
                  onClick={() => handleBackButton()}
                  color="default"
                  variant="contained"
                >
                  Palaa takaisin listaan
                </Button>
              </Box>
            </form>
          </Box>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default AddDates
