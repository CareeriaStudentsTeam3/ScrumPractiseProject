import React, { useEffect, useState } from 'react'

// Form library
import { Formik, Form } from 'formik'
import Textfield from '../../FormsUI/Textfield/Textfield'
import Select from '../../FormsUI/Select/Select'
import FormButton from '../../FormsUI/Button/Button'
import FileInput from '../../FormsUI/FileInput/FileInput'

// React-router-dom imports
import { useHistory, Redirect } from 'react-router-dom'

// Material UI imports
import Button from '@material-ui/core/Button'
import Box from '@material-ui/core/Box'
import CircularProgress from '@material-ui/core/CircularProgress'

// Validation schema
import { hairModelValidationSchema } from '../../../validationSchemas/validationSchemas'

const HairModelUpdate = ({
  hairModel,
  user,
  handleSubmit,
  handleDelete,
  redirect,
}) => {
  // console.log(hairModel)
  console.log('user', user)

  const [model, setModel] = useState(hairModel)
  const [disable, setDisable] = useState(true)
  const [edit, setEdit] = useState(false)

  let history = useHistory()

  useEffect(() => {
    setModel(hairModel)
  }, [hairModel])

  const INITIAL_FORM_STATE = {
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
    image: model.image || null,
  }

  const GENDER_SELECT = {
    MALE: 'Mies',
    FEMALE: 'Nainen',
    OTHER: 'Muu/en halua määritellä',
  }

  const HAIR_LENGTHS = {
    SHORT: 'Lyhyet',
    MEDIUM: 'Keskipitkät',
    LONG: 'Pitkät',
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
      pathname: '/admin/hairmodel',
    })
  }

  if (redirect) {
    return <Redirect to="/admin/hairmodel" />
  }

  if (user.user_group[0] === 'student') {
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
                  <Textfield
                    name="first_name"
                    label="Etunimi"
                    disabled={disable}
                  />
                </Box>
                <Box mb={2}>
                  <Textfield
                    name="last_name"
                    label="Sukunimi"
                    disabled={disable}
                  />
                </Box>
                <Box mb={2}>
                  <Textfield name="city" label="Kaupunki" disabled={disable} />
                </Box>
                <Box mb={2}>
                  <Textfield name="phone" label="Puhelin" disabled={disable} />
                </Box>
                <Box mb={2}>
                  <Textfield
                    name="email"
                    label="Sähköposti"
                    disabled={disable}
                  />
                </Box>
                <Box mb={2}>
                  <Textfield
                    name="age"
                    label="Ikä"
                    disabled={disable}
                    type="number"
                  />
                </Box>
                <Box mb={2}>
                  <Select
                    disabled={disable}
                    name="gender"
                    label="Sukupuoli"
                    options={GENDER_SELECT}
                  />
                </Box>
                <Box mb={2}>
                  <Select
                    disabled={disable}
                    name="hair_length"
                    label="Hiusten pituus"
                    options={HAIR_LENGTHS}
                  />
                </Box>
                <Box mb={2}>
                  <Textfield
                    disabled={disable}
                    name="hair_procedures"
                    label="Aiemmat käsittelyt"
                    multiline={true}
                    rows={4}
                  />
                </Box>
                {model.image === null ? (
                  <Box mb={2}>
                    <FileInput
                      disabled={disable}
                      value={undefined}
                      name="image"
                      label="Kuva"
                      type="file"
                      accept="image/*"
                      data-testid="imageFileInput"
                    />
                  </Box>
                ) : null}

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
              </Form>
            </Formik>
          </Box>
        </Box>
      </div>
    )
  }

  if (model.length !== 0) {
    return (
      <div>
        <Box display="flex" justifyContent="center">
          <Box width={'75%'}>
            <Formik
              initialValues={INITIAL_FORM_STATE}
              validationSchema={hairModelValidationSchema}
              onSubmit={(values) => handleSubmit(values)}
            >
              {({ values, handleReset }) => (
                <Form>
                  <Box my={2}>
                    <Textfield
                      name="first_name"
                      label="Etunimi"
                      disabled={disable}
                    />
                  </Box>
                  <Box mb={2}>
                    <Textfield
                      name="last_name"
                      label="Sukunimi"
                      disabled={disable}
                    />
                  </Box>
                  <Box mb={2}>
                    <Textfield
                      name="city"
                      label="Kaupunki"
                      disabled={disable}
                    />
                  </Box>
                  <Box mb={2}>
                    <Textfield
                      name="phone"
                      label="Puhelin"
                      disabled={disable}
                    />
                  </Box>
                  <Box mb={2}>
                    <Textfield
                      name="email"
                      label="Sähköposti"
                      disabled={disable}
                    />
                  </Box>
                  <Box mb={2}>
                    <Textfield
                      name="age"
                      label="Ikä"
                      disabled={disable}
                      type="number"
                    />
                  </Box>
                  <Box mb={2}>
                    <Select
                      disabled={disable}
                      name="gender"
                      label="Sukupuoli"
                      options={GENDER_SELECT}
                    />
                  </Box>
                  <Box mb={2}>
                    <Select
                      disabled={disable}
                      name="hair_length"
                      label="Hiusten pituus"
                      options={HAIR_LENGTHS}
                    />
                  </Box>
                  <Box mb={2}>
                    <Textfield
                      disabled={disable}
                      name="hair_procedures"
                      label="Aiemmat käsittelyt"
                      multiline={true}
                      rows={4}
                    />
                  </Box>
                  {model.image === null ? (
                    <Box mb={2}>
                      <FileInput
                        disabled={disable}
                        value={undefined}
                        name="image"
                        label="Kuva"
                        type="file"
                        accept="image/*"
                        data-testid="imageFileInput"
                      />
                    </Box>
                  ) : null}
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
                          onClick={() => handleDelete(values.id)}
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
                        <FormButton color="primary" variant="contained">
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
      </div>
    )
  }
  return <CircularProgress />
}

export default HairModelUpdate
