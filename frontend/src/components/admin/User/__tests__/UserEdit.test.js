import React from 'react'
import { render, fireEvent, waitFor, cleanup } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import 'regenerator-runtime/runtime'

import UserEdit from '../UserEdit'

describe('<UserEdit />', () => {
  afterEach(() => {
    cleanup()
  })
  it('check if UserEdit displays', () => {
    const { getByTestId } = render(<UserEdit oneUser={{ id: 1 }} />)
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
    expect(groupsSelect).toHaveValue('')
    expect(submit).toBeInTheDocument()
    expect(submit.textContent).toBe('Muokkaa käyttäjää')
  })

  it('handleSubmit function gets calles with right values', async () => {
    const handleUpdateSubmit = jest.fn()

    const { getByTestId } = render(
      <UserEdit handleUpdateSubmit={handleUpdateSubmit} oneUser={{ id: 1 }} />
    )
    // const form = getByTestId('form')
    const usernameInput = getByTestId('usernameInput')
    const firstNameInput = getByTestId('firstNameInput')
    const lastNameInput = getByTestId('lastNameInput')
    const passwordInput = getByTestId('passwordInput')
    const passwordAgainInput = getByTestId('passwordAgainInput')
    const groupsSelect = getByTestId('groupsSelect')
    const submit = getByTestId('submit')

    await waitFor(() => {
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
    })

    await waitFor(() => {
      fireEvent.click(submit)
    })
    expect(handleUpdateSubmit).toHaveBeenCalled()
    expect(handleUpdateSubmit).toHaveBeenCalledWith({
      id: undefined || 1,
      username: 'thetestman',
      first_name: 'Testi',
      last_name: 'Testimies',
      password: 'supersekretpass1234',
      password_again: 'supersekretpass1234',
      is_active: true,
      groups: 'teacher',
    })
  })
})
