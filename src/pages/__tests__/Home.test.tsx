import '@testing-library/jest-dom/vitest'
import { render } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { expect, test } from 'vitest'

import Home from '../home/Home'

test('renders "Find Professionals" button on the home page', () => {
  const { getByTestId } = render(
    <BrowserRouter>
      <Home />
    </BrowserRouter>,
  )

  const searchElement = getByTestId('search-button') // Add data-testid="search-button" to the button
  expect(searchElement).toBeInTheDocument()
})
