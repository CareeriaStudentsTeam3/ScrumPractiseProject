import React from 'react'
import { useFormikContext } from 'formik'
import Button from '@material-ui/core/Button'

const ButtonWrapper = ({ children, ...otherProps }) => {
  const { submitForm } = useFormikContext()

  const handleSubmit = () => {
    submitForm()
  }

  const configButton = {
    ...otherProps,
    onClick: handleSubmit,
    variant: 'contained',
    color: 'primary',
    fullWidth: true,
  }

  return <Button {...configButton}>{children}</Button>
}

export default ButtonWrapper
