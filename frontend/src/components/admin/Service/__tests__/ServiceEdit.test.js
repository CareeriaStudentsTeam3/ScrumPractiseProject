import React from 'react'
import { render, fireEvent, waitFor, cleanup } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import 'regenerator-runtime/runtime'

import ServiceEdit from '../ServiceEdit'

describe('<ServiceEdit />', () => {
  afterEach(() => {
    cleanup()
  })
  it('check if ServiceEdit displays', () => {
    const { getByTestId } = render(<ServiceEdit service={{ id: 4 }} />)
    const form = getByTestId('form')
    const serviceNameInput = getByTestId('serviceNameInput')
    const durationInput = getByTestId('durationInput')
    const priceInput = getByTestId('priceInput')
    const maxGroupSizeInput = getByTestId('maxGroupSizeInput')
    const submit = getByTestId('submit')

    expect(form).toBeInTheDocument()
    expect(serviceNameInput).toHaveValue('')
    expect(durationInput).toHaveValue('')
    expect(priceInput).toHaveValue(null)
    expect(maxGroupSizeInput).toHaveValue(null)
    expect(submit).toBeInTheDocument()
    expect(submit.textContent).toBe('Muokkaa palvelua')
  })

  it('handleSubmit function gets calles with right values', async () => {
    const handleUpdateSubmit = jest.fn()
    const { getByTestId } = render(
      <ServiceEdit
        handleUpdateSubmit={handleUpdateSubmit}
        service={{ id: 4 }}
      />
    )
    // const form = getByTestId('form')
    const serviceNameInput = getByTestId('serviceNameInput')
    const durationInput = getByTestId('durationInput')
    const priceInput = getByTestId('priceInput')
    const maxGroupSizeInput = getByTestId('maxGroupSizeInput')
    const submit = getByTestId('submit')

    fireEvent.change(serviceNameInput, { target: { value: 'Test service' } })
    fireEvent.change(durationInput, { target: { value: 120 } })
    fireEvent.change(priceInput, { target: { value: 19.99 } })
    fireEvent.change(maxGroupSizeInput, {
      target: { value: 4 },
    })

    await waitFor(() => {
      fireEvent.click(submit)
    })
    expect(handleUpdateSubmit).toHaveBeenCalledTimes(1)
    expect(handleUpdateSubmit).toHaveBeenCalledWith({
      id: undefined || 4,
      service_name: 'Test service',
      duration: '120',
      price: 19.99,
      max_group_size: 4,
    })
  })
})
