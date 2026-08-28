import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Portfolio from './Portfolio';

it('keeps Chinese photography filters', () => {
  render(<MemoryRouter><Portfolio /></MemoryRouter>);
  expect(screen.getByRole('button', { name: '校园' })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: '风光' })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: '人像' })).toBeInTheDocument();
});
