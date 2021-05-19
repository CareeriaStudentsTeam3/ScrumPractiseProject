import React from 'react'
import TextField from '@material-ui/core/TextField'
import { useField, useFormikContext } from 'formik'

const FileInputWrapper = ({ name, ...otherProps }) => {
  const { setFieldValue } = useFormikContext()
  const [field, meta] = useField(name)

  const handleChange = (e) => {
    setFieldValue(name, e.currentTarget.files[0])
  }

  const configTextfield = {
    ...field,
    ...otherProps,
    fullWidth: true,
    onChange: handleChange,
  }

  if (meta && meta.touched && meta.error) {
    configTextfield.error = true
    configTextfield.helperText = meta.error
  }

  return <TextField {...configTextfield} />
}

export default FileInputWrapper
