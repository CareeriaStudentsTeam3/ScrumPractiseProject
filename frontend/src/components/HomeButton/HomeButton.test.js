import React from 'react'
import { render } from '@testing-library/react'
import HomeButton from './HomeButton'
import '@testing-library/jest-dom/extend-expect'

test('HomeButton renders correctly', () => {
  const { getByTestId } = render(<HomeButton />)

  const buttonEle = getByTestId('home-button')

  expect(buttonEle.textContent).toBe('Palaa etusivulle')
})
