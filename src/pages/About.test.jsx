import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import About from './About';

it('renders a concise public biography without guestbook', () => {
  render(<MemoryRouter><About /></MemoryRouter>);
  expect(screen.getByRole('heading', { name: '关于' })).toBeInTheDocument();
  expect(screen.queryByText('Guestbook')).not.toBeInTheDocument();
  expect(screen.getAllByTestId('personal-photo')).toHaveLength(16);
  expect(screen.getByRole('img', { name: '黄新宏在香港街头' })).toHaveAttribute('data-featured', 'true');
  expect(screen.queryByRole('img', { name: /证件照/ })).not.toBeInTheDocument();
  expect(screen.getByRole('link', { name: /邮箱/ })).toHaveAttribute('href', expect.stringMatching(/^mailto:/));
  expect(screen.getByRole('link', { name: /小红书主页/ })).toHaveAttribute(
    'href',
    expect.stringContaining('xiaohongshu.com/user/profile/'),
  );
  expect(screen.getByRole('button', { name: '复制微信号' })).toBeInTheDocument();
});
