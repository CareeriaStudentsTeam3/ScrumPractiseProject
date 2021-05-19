import React from 'react'
import { render, fireEvent, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import 'regenerator-runtime/runtime'

import HairModelForm from '../HairModelForm'

describe('<HairModelForm />', () => {
  it('check if HairModelForm displays', () => {
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
    expect(submit.textContent).toBe('Lähetä')
  })

  it('handleSubmit function gets calles with right values', async () => {
    const handleSubmit = jest.fn()
    const { getByTestId } = render(
      <HairModelForm handleSubmit={handleSubmit} />
    )
    // const form = getByTestId('form')
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
    const submit = getByTestId('submit')

    expect(firstNameInput).toHaveValue('')

    fireEvent.change(firstNameInput, { target: { value: 'Testi' } })
    fireEvent.change(lastNameInput, { target: { value: 'Testimies' } })
    fireEvent.change(cityInput, { target: { value: 'Helsinki' } })
    fireEvent.change(phoneInput, { target: { value: '0405385947' } })
    fireEvent.change(emailInput, { target: { value: 'testi@testi.com' } })
    fireEvent.change(ageInput, { target: { value: 28 } })
    fireEvent.change(genderSelect, { target: { value: 'MALE' } })
    fireEvent.change(hairLengthSelect, { target: { value: 'SHORT' } })
    fireEvent.change(hairProceduresInput, {
      target: { value: 'test test test test test.' },
    })

    await waitFor(() => {
      fireEvent.click(submit)
    })
    expect(handleSubmit).toHaveBeenCalledTimes(1)
    expect(handleSubmit).toHaveBeenCalledWith({
      first_name: 'Testi',
      last_name: 'Testimies',
      city: 'Helsinki',
      phone: '0405385947',
      email: 'testi@testi.com',
      age: 28,
      gender: 'MALE',
      hair_length: 'SHORT',
      hair_procedures: 'test test test test test.',
      image: '',
    })
  })
})
