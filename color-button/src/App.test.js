import { render, screen, fireEvent } from '@testing-library/react'
import App from './App'
import { replaceCamelWithSpaces } from './App'

test('button has correct initial color', () => {
  render(<App />)
  // find an element with a role of button and text of 'Change to Midnight Blue'
  const colorButton = screen.getByRole('button', {
    name: 'Change to Midnight Blue',
  })

  // expect the bgColor to be red
  expect(colorButton).toHaveStyle({ backgroundColor: 'MediumVioletRed' })

  // click button
  fireEvent.click(colorButton)

  // expect the bgColor to be blue
  expect(colorButton).toHaveStyle({ backgroundColor: 'MidnightBlue' })

  // expect the button text to be 'Change to red'
  expect(colorButton.textContent).toBe('Change to Medium Violet Red')
})

test('initial conditions', () => {
  render(<App />)

  const colorButton = screen.getByRole('button', {
    name: 'Change to Midnight Blue',
  })
  const checkbox = screen.getByRole('checkbox')

  // check that the button starts out enabled
  expect(colorButton).toBeEnabled()

  // check that the checkbox starts out unchecked
  expect(checkbox).not.toBeChecked()
})

test('Checkbox disables button on first click and enables on second click', () => {
  render(<App />)

  const button = screen.getByRole('button')
  const checkbox = screen.getByRole('checkbox', { name: 'Disable button' })

  fireEvent.click(checkbox)
  expect(button).toBeDisabled()

  fireEvent.click(checkbox)
  expect(button).toBeEnabled()
})

test('Change backgroudColor to gray when button is disabled', () => {
  render(<App />)

  const button = screen.getByRole('button')
  const checkbox = screen.getByRole('checkbox', { name: 'Disable button' })

  fireEvent.click(checkbox)
  expect(button).toHaveStyle({ backgroundColor: 'gray' })

  fireEvent.click(checkbox)
  expect(button).toHaveStyle({ backgroundColor: 'MediumVioletRed' })
})

describe('spaces before camel-case capital letters', () => {
  test('Works for no inner capital letters', () => {
    expect(replaceCamelWithSpaces('Red')).toBe('Red')
  })

  test('Works for one inner capital letter', () => {
    expect(replaceCamelWithSpaces('MidnightBlue')).toBe('Midnight Blue')
  })

  test('Works for multiple inner capital letters', () => {
    expect(replaceCamelWithSpaces('MediumVioletRed')).toBe('Medium Violet Red')
  })
})
