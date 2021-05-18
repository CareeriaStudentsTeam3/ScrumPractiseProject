import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import 'regenerator-runtime/runtime'

import HairModelForm from '../HairModelForm'

test('check if HairModelForm displays', async () => {
  const { getByTestId } = render(<HairModelForm />)
  const form = getByTestId('form')
  const firstNameInput = getByTestId('firstNameInput')
  const lastNameInput = getByTestId('lastNameInput')
  const cityInput = getByTestId('cityInput')
  const phoneInput = getByTestId('phoneInput')
  const emailInput = getByTestId('emailInput')
  const ageInput = getByTestId('ageInput')
  const genderSelect = getByTestId('genderSelect')
  const hairLengthSelect = getByTestId('hairLengthSelect')
  const hairProceduresInput = getByTestId('hairProceduresInput')
  const imageFileInput = getByTestId('imageFileInput')
  const submit = getByTestId('submit')

  expect(form).toBeInTheDocument()
  expect(firstNameInput).toHaveValue('')
  expect(lastNameInput).toHaveValue('')
  expect(cityInput).toHaveValue('')
  expect(phoneInput).toHaveValue('')
  expect(emailInput).toHaveValue('')
  expect(ageInput).toHaveValue(null)
  expect(genderSelect).toHaveValue('')
  expect(hairLengthSelect).toHaveValue('')
  expect(hairProceduresInput).toHaveValue('')
  expect(imageFileInput).toBeInTheDocument()
  expect(submit).toBeInTheDocument()
})

test('yeyeye', () => {
  const { getByTestId } = render(<HairModelForm />)
  const form = getByTestId('form')
  const firstNameInput = getByTestId('firstNameInput')
  const lastNameInput = getByTestId('lastNameInput')
  const cityInput = getByTestId('cityInput')
  const phoneInput = getByTestId('phoneInput')
  const emailInput = getByTestId('emailInput')
  const ageInput = getByTestId('ageInput')
  const genderSelect = getByTestId('genderSelect')
  const hairLengthSelect = getByTestId('hairLengthSelect')
  const hairProceduresInput = getByTestId('hairProceduresInput')
  // const imageFileInput = getByTestId('imageFileInput')
  // const submit = getByTestId('submit')

  expect(firstNameInput).toHaveValue('')

  fireEvent.change(firstNameInput, { target: { value: 'Niko' } })
  fireEvent.change(lastNameInput, { target: { value: 'Muukkonen' } })
  fireEvent.change(cityInput, { target: { value: 'Helsinki' } })
  fireEvent.change(phoneInput, { target: { value: '0405385947' } })
  fireEvent.change(emailInput, { target: { value: 'n@n.com' } })
  fireEvent.change(ageInput, { target: { value: 28 } })
  fireEvent.change(genderSelect, { target: { value: 'MALE' } })
  fireEvent.change(hairLengthSelect, { target: { value: 'SHORT' } })
  fireEvent.change(hairProceduresInput, {
    target: { value: 'test test test test test.' },
  })
  expect(firstNameInput).toHaveValue('Niko')
  fireEvent.submit(form)
  // expect(handleSubmit).toHaveBeenCalledTimes(1)
})
