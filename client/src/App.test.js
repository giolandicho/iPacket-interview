import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event'
import App from './App';
import { expect } from '@jest/globals';

const renderWithRouter = (ui, {route = '/'} = {}) => {
  window.history.pushState({}, 'Test page', route)
  return{
    user: userEvent.setup(),
    ...render(ui, {wrapper: BrowserRouter}),
  }
}


test('fetches all users', async () => {
  renderWithRouter(<App />)
  const users = await screen.findAllByText(/Estimated Time to Completion:/)
  expect(users).toHaveLength(50);
});
test('all buttons render', async() => {
  renderWithRouter(<App />)
  const buttons = await screen.findAllByRole('button')
  expect(buttons).toHaveLength(50);
})
test('user disappears on like', async () => {
  const {user} = renderWithRouter(<App />)
  const users = await screen.findAllByText(/Estimated Time to Completion:/)
  expect(users).toHaveLength(50);

  await user.click(screen.getAllByRole('button')[0])
  expect(users).toHaveLength(users.length);
})
test('navigate', async () => {
  const {user} = renderWithRouter(<App/>)
  await screen.findByText('Likes')
  await user.click(screen.getByText(/Likes/i))
  await user.click(screen.getByText(/Reject All/i))
  expect(screen.getByText(/No candidates liked yet!/i)).toBeInTheDocument()
})