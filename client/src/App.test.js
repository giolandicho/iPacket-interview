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
  expect(users).toHaveLength(100);
});
test('all buttons render', async() => {
  renderWithRouter(<App />)
  const buttons = await screen.findAllByRole('button')
  expect(buttons).toHaveLength(100);
})
test('user disappears on like', async () => {
  const {user} = renderWithRouter(<App />)
  const users = await screen.findAllByText(/Estimated Time to Completion:/)
  expect(users).toHaveLength(100);

  await user.click(screen.getAllByText('Like')[0])
  expect(users).toHaveLength(users.length);
})
test('navigate', async () => {
  const {user} = renderWithRouter(<App/>)
  await screen.findByText('Likes')
  await user.click(screen.getByText(/Likes/i))
  await user.click(screen.getByText(/Reject All/i))
  expect(screen.getByText(/No candidates liked yet!/i)).toBeInTheDocument()
})
test('users get added to likes list', async() => {
  const {user} = renderWithRouter(<App />)
  await screen.findAllByText(/Estimated Time to Completion:/)
  await user.click(screen.getAllByText('Like')[0])
  await user.click(screen.getAllByText('Like')[1])
  await user.click(screen.getByText(/Likes/i))
  const users = await screen.findAllByText(/Reject/)
  expect(users).toHaveLength(users.length)
})