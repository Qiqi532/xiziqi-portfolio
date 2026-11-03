import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import LazyImage from './LazyImage';

describe('LazyImage', () => {
  it('replaces indefinite loading with a retryable error state', () => {
    render(<LazyImage src="/one.jpg" alt="校园晨光" />);
    fireEvent.error(screen.getByRole('img', { name: '校园晨光' }));
    expect(screen.getByText('图片暂时无法加载')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: '重试加载图片' }));
    expect(screen.queryByText('图片暂时无法加载')).not.toBeInTheDocument();
    expect(screen.getByRole('img', { name: '校园晨光' })).toHaveAttribute('src', '/one.jpg');
  });

  it('resets a previous error when the source changes', () => {
    const { rerender } = render(<LazyImage src="/one.jpg" alt="校园晨光" />);
    fireEvent.error(screen.getByRole('img', { name: '校园晨光' }));
    rerender(<LazyImage src="/two.jpg" alt="城市夜色" />);
    expect(screen.queryByText('图片暂时无法加载')).not.toBeInTheDocument();
    expect(screen.getByRole('img', { name: '城市夜色' })).toHaveAttribute('src', '/two.jpg');
  });
});
