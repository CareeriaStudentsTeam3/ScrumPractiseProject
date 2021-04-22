import React from 'react'
import { useFormik } from 'formik'
import * as yup from 'yup'

// Import React datepicker
import DatePicker from 'react-datepicker'

import 'react-datepicker/dist/react-datepicker.css'

// Material UI imports
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Box from '@material-ui/core/Box'

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

const EditDates = ({ date, handleBackButton, updateDate }) => {
  console.log('date', date)
  const formik = useFormik({
    initialValues: {
      beginning: new Date(date.beginning) || '',
      end: new Date(date.end) || '',
      max_group_size: date.max_group_size || '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      console.log('values', values)
      updateDate(values)
    },
  })
  return (
    <Grid container justify="center" alignItems="center">
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
                  Tallenna
                </Button>
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
            </form>
          </Box>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default EditDates
