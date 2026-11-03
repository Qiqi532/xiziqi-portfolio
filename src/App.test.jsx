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

it('redirects the legacy contact route to about', async () => {
  render(<MemoryRouter initialEntries={['/contact']}><App /></MemoryRouter>);
  expect(await screen.findByRole('heading', { name: '关于' })).toBeInTheDocument();
});

it('shows a useful recovery route for an unknown address', async () => {
  render(<MemoryRouter initialEntries={['/missing-page']}><App /></MemoryRouter>);
  expect(await screen.findByRole('heading', { name: '这条路还没有留下足迹。' })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: /返回主页/ })).toHaveAttribute('href', '/');
  expect(document.title).toBe('页面未找到｜黄新宏');
});
