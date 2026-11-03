import { fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import { MemoryRouter, useLocation } from 'react-router-dom';
import { expect, it, vi } from 'vitest';
import Gallery from './Gallery';
import { images } from '../data/images';

it('filters exhibition works and opens a complete vertical composition', () => {
  const onImageClick = vi.fn();
  render(<MemoryRouter initialEntries={['/portfolio?category=exhibition']}><Gallery onImageClick={onImageClick} /></MemoryRouter>);
  const gallery = screen.getByRole('region', { name: '摄影作品展廊' });
  expect(within(gallery).getAllByRole('img')).toHaveLength(7);
  expect(screen.getByRole('button', { name: '入展作品' })).toHaveAttribute('aria-pressed', 'true');
  const cliff = screen.getByRole('img', { name: '海蚀巨壁' });
  expect(cliff.parentElement.style.aspectRatio).toBe('1800/2400');
  fireEvent.click(screen.getByRole('button', { name: '查看海蚀巨壁' }));
  expect(onImageClick).toHaveBeenCalledWith(
    images.find(({ title }) => title === '海蚀巨壁'),
    images.filter(({ exhibition }) => exhibition),
  );
});

function LocationProbe() {
  return <output data-testid="location">{useLocation().search}</output>;
}

it('starts with a distinct selected collection and records it in the URL', async () => {
  render(<MemoryRouter><Gallery /><LocationProbe /></MemoryRouter>);
  await waitFor(() => expect(screen.getByTestId('location')).toHaveTextContent('category=selected'));
  expect(screen.getByRole('button', { name: '精选' })).toHaveAttribute('aria-pressed', 'true');
  const shown = within(screen.getByRole('region', { name: '摄影作品展廊' })).getAllByRole('img');
  expect(shown.length).toBeLessThan(images.length);
  expect(new Set(shown.map((image) => image.getAttribute('src'))).size).toBe(shown.length);
  expect(screen.queryByRole('img', { name: '摄影分享现场' })).not.toBeInTheDocument();
  expect(within(screen.getByRole('region', { name: '摄影作品展廊' })).getByRole('status')).toHaveTextContent(`精选 · ${shown.length} 张`);
});

it('recovers an invalid category as all photos without discarding other query parameters', async () => {
  render(<MemoryRouter initialEntries={['/portfolio?category=missing&from=home']}><Gallery /><LocationProbe /></MemoryRouter>);
  await waitFor(() => expect(screen.getByTestId('location')).toHaveTextContent('category=all'));
  expect(screen.getByTestId('location')).toHaveTextContent('from=home');
  expect(screen.getByRole('button', { name: '全部' })).toHaveAttribute('aria-pressed', 'true');
  expect(within(screen.getByRole('region', { name: '摄影作品展廊' })).getAllByRole('img')).toHaveLength(images.length);
});

it('switches to personal photos with the new sharing portrait', async () => {
  render(<MemoryRouter><Gallery /></MemoryRouter>);
  fireEvent.click(screen.getByRole('button', { name: '个人照' }));
  await waitFor(() => expect(screen.queryByRole('img', { name: '晨曦中的校园' })).not.toBeInTheDocument());
  expect(screen.getByRole('img', { name: '摄影分享现场' })).toBeInTheDocument();
  expect(within(screen.getByRole('region', { name: '摄影作品展廊' })).getAllByRole('img')).toHaveLength(17);
});
