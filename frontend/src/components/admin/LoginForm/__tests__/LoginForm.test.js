import React from 'react'
import { render, fireEvent, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import 'regenerator-runtime/runtime'

import LoginForm from '../LoginForm'

describe('<LoginForm />', () => {
  it('check if LoginForm displays', () => {
    const { getByTestId } = render(<LoginForm />)
    const form = getByTestId('form')
    const username = getByTestId('usernameInput')
    const password = getByTestId('passwordInput')
    const submit = getByTestId('submit')

    expect(form).toBeInTheDocument()
    expect(username).toHaveValue('')
    expect(password).toHaveValue('')
    expect(submit).toBeInTheDocument()
    expect(submit.textContent).toBe('Kirjaudu sisään')
  })

  it('handleSubmit function gets calles with right values', async () => {
    const handleSubmit = jest.fn()
    const { getByTestId } = render(<LoginForm handleSubmit={handleSubmit} />)
    // const form = getByTestId('form')
    const username = getByTestId('usernameInput')
    const password = getByTestId('passwordInput')
    const submit = getByTestId('submit')

    fireEvent.change(username, { target: { value: 'Testinen' } })
    fireEvent.change(password, { target: { value: 'Testi12345' } })

    await waitFor(() => {
      fireEvent.click(submit)
    })
    expect(handleSubmit).toHaveBeenCalled()
    expect(handleSubmit).toHaveBeenCalledWith(
      {
        username: 'Testinen',
        password: 'Testi12345',
      },
      expect.anything()
    )
  })
})
