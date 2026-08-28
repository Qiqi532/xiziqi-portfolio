import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Practice from './Practice';

it('renders approved practice highlights', () => {
  render(<MemoryRouter><Practice /></MemoryRouter>);
  expect(screen.getByRole('heading', { name: '个人实践' })).toBeInTheDocument();
  expect(screen.getByText(/千年古树的现代生存密码/)).toBeInTheDocument();
  expect(screen.getByText(/黄新宏摄\/光明图片/)).toBeInTheDocument();
  expect(screen.getByRole('link', { name: /中国国家旅游原文/ })).toHaveAttribute(
    'href',
    'https://mp.weixin.qq.com/s/Z0PCQqgu3jJmgwXXOfa8ng',
  );
  expect(screen.getAllByRole('img', { name: /十五运会/ })).toHaveLength(3);
  expect(screen.getByText(/锦绣连山，针线间的壮乡记忆/)).toBeInTheDocument();
});
