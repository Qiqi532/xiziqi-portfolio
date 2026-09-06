import { fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import ContactLinks from './ContactLinks';

afterEach(() => {
  vi.restoreAllMocks();
});

describe('ContactLinks', () => {
  it('copies the WeChat handle and reports success', async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, 'clipboard', { configurable: true, value: { writeText } });
    render(<ContactLinks email="hello@example.com" />);
    fireEvent.click(screen.getByRole('button', { name: '复制微信号' }));
    expect(await screen.findByText('已复制')).toBeInTheDocument();
    expect(writeText).toHaveBeenCalledWith('Xizq532-H');
  });

  it('keeps a selectable fallback when clipboard access fails', async () => {
    Object.defineProperty(navigator, 'clipboard', {
      configurable: true,
      value: { writeText: vi.fn().mockRejectedValue(new Error('denied')) },
    });
    render(<ContactLinks email="hello@example.com" />);
    fireEvent.click(screen.getByRole('button', { name: '复制微信号' }));
    expect(await screen.findByText('请手动复制：Xizq532-H')).toBeInTheDocument();
  });
});
