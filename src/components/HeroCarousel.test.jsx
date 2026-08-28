import { act, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import HeroCarousel from './HeroCarousel';

const slides = [
  { src: '/one.jpg', alt: '泉州生活照', location: '泉州', position: 'center' },
  { src: '/two.jpg', alt: '香港生活照', location: '香港', position: 'top' },
];

beforeEach(() => {
  window.matchMedia = vi.fn(() => ({ matches: false, addEventListener: vi.fn(), removeEventListener: vi.fn() }));
});

afterEach(() => {
  vi.useRealTimers();
});

describe('HeroCarousel', () => {
  it('supports manual next and previous navigation', () => {
    render(<HeroCarousel slides={slides} />);
    fireEvent.click(screen.getByRole('button', { name: '下一张照片' }));
    expect(screen.getByRole('img', { name: '香港生活照' })).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: '上一张照片' }));
    expect(screen.getByRole('img', { name: '泉州生活照' })).toBeInTheDocument();
  });

  it('advances every five seconds when motion is allowed', () => {
    vi.useFakeTimers();
    render(<HeroCarousel slides={slides} />);
    act(() => vi.advanceTimersByTime(5000));
    expect(screen.getByRole('img', { name: '香港生活照' })).toBeInTheDocument();
  });

  it('does not autoplay when reduced motion is requested', () => {
    vi.useFakeTimers();
    window.matchMedia = vi.fn(() => ({ matches: true, addEventListener: vi.fn(), removeEventListener: vi.fn() }));
    render(<HeroCarousel slides={slides} />);
    act(() => vi.advanceTimersByTime(5000));
    expect(screen.getByRole('img', { name: '泉州生活照' })).toBeInTheDocument();
  });
});
