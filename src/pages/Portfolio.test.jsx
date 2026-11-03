import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Portfolio from './Portfolio';

it('keeps Chinese photography filters', () => {
  render(<MemoryRouter><Portfolio /></MemoryRouter>);
  expect(screen.getByRole('button', { name: '校园' })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: '风光' })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: '人像' })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: '个人照' })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: '入展作品' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: '珠港澳大学生摄影展' })).toBeInTheDocument();
  expect(screen.getByText('特别推荐')).toBeInTheDocument();
  const partnership = screen.getByRole('region', { name: '签约摄影师' });
  expect(partnership).toHaveTextContent('视觉中国');
  expect(partnership).toHaveTextContent('海丝泉州');
  expect(screen.getByRole('region', { name: '小红书创作' })).toHaveTextContent('1.9 万');
  expect(screen.getByRole('region', { name: '小红书创作' })).toHaveTextContent('近 500');
});
