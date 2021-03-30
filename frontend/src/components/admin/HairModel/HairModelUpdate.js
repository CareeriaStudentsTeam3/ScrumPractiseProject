import React, { useEffect, useState } from 'react'

// Form library
import { useFormik } from 'formik'

// React-router-dom imports
import { useHistory } from 'react-router-dom'

// Material UI imports
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import InputLabel from '@material-ui/core/InputLabel'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'

import Input from '@material-ui/core/Input'

// Service import
import hairmodelService from '../../../services/hairmodel'

const HairModelUpdate = ({ hairModel }) => {
  // console.log(hairModel)

  const [model, setModel] = useState([])
  const [disable, setDisable] = useState(true)
  const [edit, setEdit] = useState(false)

  let history = useHistory()

  useEffect(() => {
    setModel(hairModel)
  }, [hairModel])

  const handleDelete = (id) => {
    console.log(id)
    if (window.confirm('Haluatko varmasti poistaa tämän hiusmallin?')) {
      hairmodelService.del(id).then(
        history.push({
          pathname: '/admin/hairmodel',
          id: id,
        })
      )
    }
  }

  const handleEdit = (e) => {
    e.preventDefault()
    setEdit(true)
    setDisable(false)
  }

  const handleCancel = (e) => {
    e.preventDefault()
    setEdit(false)
    setDisable(true)
  }

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      id: model.id,
      first_name: model.first_name || '',
      last_name: model.last_name || '',
      city: model.city || '',
      phone: model.phone || '',
      email: model.email || '',
      age: model.age || '',
      gender: model.gender || '',
      hair_length: model.hair_length || '',
      hair_procedures: model.hair_procedures || '',
      image: model.image || '',
    },
    onSubmit: async (values) => {
      let formData = new FormData()
      formData.append('first_name', values.first_name)
      formData.append('last_name', values.last_name)
      formData.append('city', values.city)
      formData.append('phone', values.phone)
      formData.append('email', values.email)
      formData.append('age', values.age)
      formData.append('gender', values.gender)
      formData.append('hair_length', values.hair_length)
      formData.append('hair_procedures', values.hair_procedures)
      if (values.image) {
        formData.append('image', values.image)
      }

      // alert(JSON.stringify(values, null, 2))
      console.log(values)
      // console.log(formData.get('image'))
      await hairmodelService
        .update(formData, values.id)
        .catch((e) => console.log(e))
        .then(
          history.push({
            pathname: '/admin/hairmodel',
            id: values.id,
          })
        )
    },
  })

  if (model.length !== 0) {
    return (
      <div>
        <Box display="flex" justifyContent="center">
          <Box width={'75%'}>
            <form onSubmit={formik.handleSubmit}>
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
              <Box mb={2}>
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
              <Box mb={2}>
                <TextField
                  disabled={disable}
                  fullWidth
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
                  disabled={disable}
                  fullWidth
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
              <Box mb={2}>
                <TextField
                  disabled={disable}
                  fullWidth
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
                <TextField
                  disabled={disable}
                  fullWidth
                  id="gender"
                  name="gender"
                  label="Sukupuoli"
                  type="text"
                  value={formik.values.gender}
                  onChange={formik.handleChange}
                  error={formik.touched.gender && Boolean(formik.errors.gender)}
                  helperText={formik.touched.gender && formik.errors.gender}
                />
              </Box>
              <Box mb={2}>
                <TextField
                  disabled={disable}
                  fullWidth
                  id="hair_length"
                  name="hair_length"
                  label="Hiusten pituus"
                  type="text"
                  value={formik.values.hair_length}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.hair_length &&
                    Boolean(formik.errors.hair_length)
                  }
                  helperText={
                    formik.touched.hair_length && formik.errors.hair_length
                  }
                />
              </Box>
              <Box mb={2}>
                <TextField
                  disabled={disable}
                  fullWidth
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
                  disabled={disable}
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
                  <Box>
                    <Button
                      onClick={() => handleDelete(formik.values.id)}
                      color="secondary"
                      variant="contained"
                      type="button"
                    >
                      Poista
                    </Button>
                  </Box>
                </Box>
              ) : (
                <Box mb={2} display="flex">
                  <Box mr={2}>
                    <Button color="primary" variant="contained" type="submit">
                      Muokkaa
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
      </div>
    )
  }
  return <h1>Loading...</h1>
}

export default HairModelUpdate
