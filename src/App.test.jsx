import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

it('renders the five public routes in navigation', () => {
  render(<MemoryRouter><App /></MemoryRouter>);
  for (const label of ['主页', '研究学习', '个人实践', '摄影', '关于']) {
    expect(screen.getByRole('link', { name: label })).toBeInTheDocument();
  }
  expect(screen.queryByText('Guestbook')).not.toBeInTheDocument();
});

it('redirects the legacy contact route to about', () => {
  render(<MemoryRouter initialEntries={['/contact']}><App /></MemoryRouter>);
  expect(screen.getByRole('heading', { name: '关于' })).toBeInTheDocument();
});
