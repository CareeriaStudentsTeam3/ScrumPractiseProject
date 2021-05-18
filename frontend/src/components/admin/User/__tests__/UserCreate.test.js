import React from 'react'
import { render, fireEvent, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import 'regenerator-runtime/runtime'

import UserCreate from '../UserCreate'

test('check if UserCreate displays', async () => {
  // const addNewUser = jest.fn()
  const { getByTestId } = render(<UserCreate />)
  const form = getByTestId('form')
  const usernameInput = getByTestId('usernameInput')
  const firstNameInput = getByTestId('firstNameInput')
  const lastNameInput = getByTestId('lastNameInput')
  const passwordInput = getByTestId('passwordInput')
  const passwordAgainInput = getByTestId('passwordAgainInput')
  const groupdSelect = getByTestId('groupdSelect')

  expect(form).toBeInTheDocument()
  expect(usernameInput).toHaveValue('')
  expect(firstNameInput).toHaveValue('')
  expect(lastNameInput).toHaveValue('')
  expect(passwordInput).toHaveValue('')
  expect(passwordAgainInput).toHaveValue('')
  expect(groupdSelect).toBeInTheDocument()
})

test('hmmm', async () => {
  const addNewUser = jest.fn()
  const { getByTestId } = render(<UserCreate addNewUser={addNewUser} />)
  // const form = getByTestId('form')
  const usernameInput = getByTestId('usernameInput')
  const firstNameInput = getByTestId('firstNameInput')
  const lastNameInput = getByTestId('lastNameInput')
  const passwordInput = getByTestId('passwordInput')
  const passwordAgainInput = getByTestId('passwordAgainInput')
  const groupdSelect = getByTestId('groupdSelect')
  const submit = getByTestId('submit')

  fireEvent.change(usernameInput, { target: { value: 'nikonen' } })
  fireEvent.change(firstNameInput, { target: { value: 'Niko' } })
  fireEvent.change(lastNameInput, { target: { value: 'Muukkonen' } })
  fireEvent.change(passwordInput, { target: { value: 'testi123456' } })
  fireEvent.change(passwordAgainInput, { target: { value: 'testi123456' } })
  fireEvent.change(groupdSelect, { target: { value: 'student' } })

  await waitFor(() => {
    fireEvent.click(submit)
    expect(usernameInput).toHaveValue('nikonen')
  })

  await waitFor(() => {
    expect(addNewUser).toHaveBeenCalled()
  })
})
