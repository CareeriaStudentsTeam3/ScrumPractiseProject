import React from 'react'
import { render, fireEvent, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import 'regenerator-runtime/runtime'

import AppointmentForm from '../AppointmentForm'

describe('<AppointmentForm />', () => {
  it('check if AppointmentForm displays', () => {
    const { getByTestId } = render(<AppointmentForm />)
    const form = getByTestId('form')
    const firstNameInput = getByTestId('firstNameInput')
    const lastNameInput = getByTestId('lastNameInput')
    const emailInput = getByTestId('emailInput')
    const phoneInput = getByTestId('phoneInput')
    const placeInput = getByTestId('placeInput')
    const infoInput = getByTestId('infoInput')
    const submit = getByTestId('submit')

    expect(form).toBeInTheDocument()
    expect(firstNameInput).toHaveValue('')
    expect(lastNameInput).toHaveValue('')
    expect(emailInput).toHaveValue('')
    expect(phoneInput).toHaveValue('')
    expect(placeInput).toHaveValue('')
    expect(infoInput).toHaveValue('')
    expect(submit).toBeInTheDocument()
    expect(submit.textContent).toBe('Lähetä')
  })

  it('handleSubmit function gets calles with right values', async () => {
    const handleSubmit = jest.fn()
    const { getByTestId } = render(
      <AppointmentForm handleSubmit={handleSubmit} />
    )
    // const form = getByTestId('form')
    const firstNameInput = getByTestId('firstNameInput')
    const lastNameInput = getByTestId('lastNameInput')
    const emailInput = getByTestId('emailInput')
    const phoneInput = getByTestId('phoneInput')
    const placeInput = getByTestId('placeInput')
    const infoInput = getByTestId('infoInput')
    const submit = getByTestId('submit')

    fireEvent.change(firstNameInput, { target: { value: 'Testi' } })
    fireEvent.change(lastNameInput, { target: { value: 'Testimies' } })
    fireEvent.change(emailInput, { target: { value: 'testi@testi.com' } })
    fireEvent.change(phoneInput, { target: { value: '0405385947' } })
    fireEvent.change(placeInput, { target: { value: 'koululla' } })
    fireEvent.change(infoInput, {
      target: { value: 'test test test test test.' },
    })

    await waitFor(() => {
      fireEvent.click(submit)
    })
    expect(handleSubmit).toHaveBeenCalledTimes(1)
    expect(handleSubmit).toHaveBeenCalledWith({
      first_name: 'Testi',
      last_name: 'Testimies',
      email: 'testi@testi.com',
      phone: '0405385947',
      place: 'koululla',
      info: 'test test test test test.',
      group_size: undefined,
      service: undefined,
      appointment_date: undefined,
      confirmed: false,
    })
  })
})
