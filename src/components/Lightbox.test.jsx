import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import Lightbox from './Lightbox';

const collection = [
  { id: 'first', src: '/first.jpg', title: '第一张' },
  { id: 'second', src: '/second.jpg', title: '第二张' },
];

describe('Lightbox', () => {
  it('navigates and counts only the supplied collection', () => {
    render(<Lightbox image={collection[0]} collection={collection} onClose={vi.fn()} />);
    expect(screen.getByRole('dialog', { name: '查看照片：第一张' })).toHaveAttribute('aria-modal', 'true');
    fireEvent.click(screen.getByRole('button', { name: '下一张照片' }));
    expect(screen.getByRole('img', { name: '第二张' })).toBeInTheDocument();
    expect(screen.getByText('2 / 2')).toBeInTheDocument();
    fireEvent.keyDown(document, { key: 'ArrowRight' });
    expect(screen.getByRole('img', { name: '第一张' })).toBeInTheDocument();
  });

  it('focuses and traps the dialog, then restores the trigger on close', () => {
    const onClose = vi.fn();
    const trigger = document.createElement('button');
    document.body.appendChild(trigger);
    trigger.focus();
    const { unmount } = render(<Lightbox image={collection[0]} collection={collection} onClose={onClose} />);
    const close = screen.getByRole('button', { name: '关闭照片' });
    expect(close).toHaveFocus();
    screen.getByRole('button', { name: '下一张照片' }).focus();
    fireEvent.keyDown(document, { key: 'Tab' });
    expect(close).toHaveFocus();
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(onClose).toHaveBeenCalledOnce();
    unmount();
    expect(trigger).toHaveFocus();
    trigger.remove();
  });

  it('provides retry after an image failure and resets failure when moving on', async () => {
    render(<Lightbox image={collection[0]} collection={collection} onClose={vi.fn()} />);
    fireEvent.error(screen.getByRole('img', { name: '第一张' }));
    expect(screen.getByText('照片暂时无法加载')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: '重试加载照片' }));
    expect(screen.getByRole('img', { name: '第一张' })).toBeInTheDocument();
    fireEvent.error(screen.getByRole('img', { name: '第一张' }));
    fireEvent.click(screen.getByRole('button', { name: '下一张照片' }));
    await waitFor(() => expect(screen.queryByText('照片暂时无法加载')).not.toBeInTheDocument());
    expect(screen.getByRole('img', { name: '第二张' })).toBeInTheDocument();
  });
});
