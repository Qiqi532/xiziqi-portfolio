import { fireEvent, render, screen } from '@testing-library/react';
import { afterEach, expect, it, vi } from 'vitest';
import ResponsiveImage from './ResponsiveImage';

vi.mock('../data/imageAssets.json', () => ({
  default: {
    'images/campus/校园.jpg': {
      width: 2400,
      height: 1602,
      webp: [480, 960, 1600].map((width) => ({ src: `images/responsive/campus-${width}.webp`, width })),
      jpeg: [480, 960, 1600].map((width) => ({ src: `images/responsive/campus-${width}.jpg`, width })),
    },
    'images/profile/avatar.png': {
      width: 360,
      height: 540,
      webp: [{ src: 'images/responsive/avatar-360.webp', width: 360 }],
      jpeg: [{ src: 'images/responsive/avatar-360.jpg', width: 360 }],
    },
  },
}));

afterEach(() => {
  vi.unstubAllEnvs();
});

it('renders a native responsive image with a 960px default and the original aspect ratio', () => {
  vi.stubEnv('BASE_URL', '/');
  const { container } = render(<ResponsiveImage src="/images/campus/校园.jpg" alt="校园" />);
  const image = screen.getByRole('img', { name: '校园' });
  expect(container.firstElementChild).toBe(image);
  expect(image).toHaveAttribute('src', '/images/responsive/campus-960.webp');
  expect(image).toHaveAttribute('srcset', '/images/responsive/campus-480.webp 480w, /images/responsive/campus-960.webp 960w, /images/responsive/campus-1600.webp 1600w');
  expect(image).toHaveAttribute('width', '2400');
  expect(image).toHaveAttribute('height', '1602');
  expect(image).toHaveAttribute('loading', 'lazy');
  expect(image).toHaveAttribute('decoding', 'async');
  expect(image).toHaveAttribute('sizes', '(max-width: 640px) 100vw, (max-width: 1000px) 50vw, 33vw');
});

it('passes image attributes, styling and load events through', () => {
  const onLoad = vi.fn();
  render(<ResponsiveImage src="/images/campus/校园.jpg" alt="精选" sizes="100vw" width={800} height={534} loading="eager" fetchpriority="high" data-featured="true" aria-label="精选照片" className="featured" style={{ objectFit: 'contain' }} onLoad={onLoad} />);
  const image = screen.getByRole('img', { name: '精选照片' });
  expect(image).toHaveAttribute('data-featured', 'true');
  expect(image).toHaveAttribute('fetchpriority', 'high');
  expect(image).toHaveAttribute('sizes', '100vw');
  expect(image).toHaveAttribute('loading', 'eager');
  expect(image).toHaveAttribute('width', '800');
  expect(image).toHaveAttribute('height', '534');
  expect(image).toHaveClass('featured');
  expect(image).toHaveStyle({ objectFit: 'contain' });
  fireEvent.load(image);
  expect(onLoad).toHaveBeenCalledOnce();
});

it('switches both src and srcSet to JPEG before reporting an unrecoverable error', () => {
  vi.stubEnv('BASE_URL', '/');
  const onError = vi.fn();
  render(<ResponsiveImage src="/images/campus/校园.jpg" alt="校园" onError={onError} />);
  const image = screen.getByRole('img', { name: '校园' });
  fireEvent.error(image);
  expect(image).toHaveAttribute('src', '/images/responsive/campus-960.jpg');
  expect(image).toHaveAttribute('srcset', '/images/responsive/campus-480.jpg 480w, /images/responsive/campus-960.jpg 960w, /images/responsive/campus-1600.jpg 1600w');
  expect(onError).not.toHaveBeenCalled();
  fireEvent.error(image);
  expect(onError).toHaveBeenCalledOnce();
});

it('maps encoded thumbnail paths and emits assets below the GitHub Pages base path', () => {
  vi.stubEnv('BASE_URL', '/xiziqi-portfolio/');
  render(<ResponsiveImage src={`/xiziqi-portfolio/images/thumbnails/campus/${encodeURIComponent('校园.jpg')}?v=1`} alt="入展作品" />);
  const image = screen.getByRole('img', { name: '入展作品' });
  expect(image).toHaveAttribute('src', '/xiziqi-portfolio/images/responsive/campus-960.webp');
  expect(image.getAttribute('srcset')).toContain('/xiziqi-portfolio/images/responsive/campus-480.webp 480w');
});

it('uses a small source without upscaling and returns to WebP when the source changes', () => {
  vi.stubEnv('BASE_URL', '/');
  const { rerender } = render(<ResponsiveImage src="/images/campus/校园.jpg" alt="照片" />);
  fireEvent.error(screen.getByRole('img', { name: '照片' }));
  rerender(<ResponsiveImage src="/images/profile/avatar.png" alt="照片" />);
  const image = screen.getByRole('img', { name: '照片' });
  expect(image).toHaveAttribute('src', '/images/responsive/avatar-360.webp');
  expect(image).toHaveAttribute('srcset', '/images/responsive/avatar-360.webp 360w');
  expect(image).toHaveAttribute('width', '360');
  expect(image).toHaveAttribute('height', '540');
});

it('preserves unknown or external sources and their existing srcSet', () => {
  const src = 'https://example.com/images/campus/%E6%A0%A1%E5%9B%AD.jpg';
  const onError = vi.fn();
  render(<ResponsiveImage src={src} alt="外部图片" srcSet="https://example.com/photo.jpg 800w" onError={onError} />);
  const image = screen.getByRole('img', { name: '外部图片' });
  expect(image).toHaveAttribute('src', src);
  expect(image).toHaveAttribute('srcset', 'https://example.com/photo.jpg 800w');
  expect(image).not.toHaveAttribute('width');
  fireEvent.error(image);
  expect(onError).toHaveBeenCalledOnce();
});

it('keeps malformed encoded URLs intact', () => {
  render(<ResponsiveImage src="/images/%broken.jpg" alt="未登记图片" />);
  expect(screen.getByRole('img', { name: '未登记图片' })).toHaveAttribute('src', '/images/%broken.jpg');
});
