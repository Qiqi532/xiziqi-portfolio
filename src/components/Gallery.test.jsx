import { fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
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
  expect(onImageClick).toHaveBeenCalledWith(images.find(({ title }) => title === '海蚀巨壁'));
});

it('switches to personal photos with the new sharing portrait', async () => {
  render(<MemoryRouter><Gallery /></MemoryRouter>);
  fireEvent.click(screen.getByRole('button', { name: '个人照' }));
  await waitFor(() => expect(screen.queryByRole('img', { name: '晨曦中的校园' })).not.toBeInTheDocument());
  expect(screen.getByRole('img', { name: '摄影分享现场' })).toBeInTheDocument();
  expect(within(screen.getByRole('region', { name: '摄影作品展廊' })).getAllByRole('img')).toHaveLength(17);
});
