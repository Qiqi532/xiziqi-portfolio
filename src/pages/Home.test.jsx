import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Home from './Home';

it('renders the long-form personal homepage entry points', () => {
  render(<MemoryRouter><Home /></MemoryRouter>);
  expect(screen.getByRole('heading', { name: /在公式与光影之间/ })).toBeInTheDocument();
  expect(screen.getByRole('img', { name: /上海/ })).toBeInTheDocument();
  expect(screen.queryByText('01 / PORTRAIT')).not.toBeInTheDocument();
  expect(screen.queryByRole('heading', { name: '研究之外的个人切面' })).not.toBeInTheDocument();
  expect(screen.getByRole('link', { name: /进入研究学习页/ })).toHaveAttribute('href', '/research');
  expect(screen.getByRole('link', { name: /浏览全部摄影作品/ })).toHaveAttribute('href', '/portfolio');
  expect(screen.getByRole('link', { name: /小红书主页/ })).toHaveAttribute(
    'href',
    'https://www.xiaohongshu.com/user/profile/64afebdd000000001f004818',
  );
  expect(screen.getByText('9776387705')).toBeInTheDocument();
  expect(screen.getByRole('button', { name: '复制微信号' })).toBeInTheDocument();
});
