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

it('renders the Insta360 campus creator chapter', () => {
  render(<MemoryRouter><Practice /></MemoryRouter>);
  expect(screen.getByRole('heading', { name: '影石校园影像创作者' })).toBeInTheDocument();
  expect(screen.getByText(/2025 年入选影石 Insta360 校园影像创作者计划/)).toBeInTheDocument();
  expect(screen.getAllByRole('img', { name: /影石Insta360/ })).toHaveLength(3);
  expect(screen.getByText(/X 系列 · 8K 全景，先拍后取景/)).toBeInTheDocument();
  expect(screen.getByText(/Ace Pro 系列 · 与徕卡联合研发，昼夜运动画面/)).toBeInTheDocument();
});
