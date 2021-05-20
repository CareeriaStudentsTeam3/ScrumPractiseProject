import React from 'react'
import { render, fireEvent, waitFor, cleanup } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import 'regenerator-runtime/runtime'

import UserCreate from '../UserCreate'

describe('<UserCreate />', () => {
  afterEach(() => {
    cleanup()
  })
  it('check if UserCreate displays', () => {
    const { getByTestId } = render(<UserCreate />)
    const form = getByTestId('form')
    const usernameInput = getByTestId('usernameInput')
    const firstNameInput = getByTestId('firstNameInput')
    const lastNameInput = getByTestId('lastNameInput')
    const passwordInput = getByTestId('passwordInput')
    const passwordAgainInput = getByTestId('passwordAgainInput')
    const groupsSelect = getByTestId('groupsSelect')
    const submit = getByTestId('submit')

    expect(form).toBeInTheDocument()
    expect(usernameInput).toHaveValue('')
    expect(firstNameInput).toHaveValue('')
    expect(lastNameInput).toHaveValue('')
    expect(passwordInput).toHaveValue('')
    expect(passwordAgainInput).toHaveValue('')
    expect(groupsSelect).toHaveValue('student')
    expect(submit).toBeInTheDocument()
    expect(submit.textContent).toBe('Luo uusi käyttäjä')
  })

  it('handleSubmit function gets calles with right values', async () => {
    const handleSubmit = jest.fn()
    const { getByTestId } = render(<UserCreate handleSubmit={handleSubmit} />)
    // const form = getByTestId('form')
    const usernameInput = getByTestId('usernameInput')
    const firstNameInput = getByTestId('firstNameInput')
    const lastNameInput = getByTestId('lastNameInput')
    const passwordInput = getByTestId('passwordInput')
    const passwordAgainInput = getByTestId('passwordAgainInput')
    const groupsSelect = getByTestId('groupsSelect')
    const submit = getByTestId('submit')

    fireEvent.change(usernameInput, { target: { value: 'thetestman' } })
    fireEvent.change(firstNameInput, { target: { value: 'Testi' } })
    fireEvent.change(lastNameInput, { target: { value: 'Testimies' } })
    fireEvent.change(passwordInput, {
      target: { value: 'supersekretpass1234' },
    })
    fireEvent.change(passwordAgainInput, {
      target: { value: 'supersekretpass1234' },
    })
    fireEvent.change(groupsSelect, { target: { value: 'teacher' } })

    await waitFor(() => {
      fireEvent.click(submit)
    })
    expect(handleSubmit).toHaveBeenCalledTimes(1)
    expect(handleSubmit).toHaveBeenCalledWith(
      {
        username: 'thetestman',
        first_name: 'Testi',
        last_name: 'Testimies',
        password: 'supersekretpass1234',
        password_again: 'supersekretpass1234',
        is_active: true,
        groups: 'teacher',
      },
      expect.anything()
    )
  })
})
