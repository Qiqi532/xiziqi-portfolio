import { act, fireEvent, render, screen, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import Nav from './Nav';

let desktopChange;

beforeEach(() => {
  desktopChange = undefined;
  window.matchMedia = vi.fn((query) => ({
    matches: false,
    addEventListener: vi.fn((type, listener) => {
      if (query.includes('801px')) desktopChange = listener;
    }),
    removeEventListener: vi.fn(),
  }));
});

const renderNav = () => render(<MemoryRouter initialEntries={['/portfolio']}><Nav /></MemoryRouter>);

describe('Nav', () => {
  it('exposes the current page and moves focus into a menu that Escape closes', () => {
    renderNav();
    const trigger = screen.getByRole('button', { name: '打开菜单' });
    expect(screen.getByRole('link', { name: '摄影' })).toHaveAttribute('aria-current', 'page');
    trigger.focus();
    fireEvent.click(trigger);
    const menu = screen.getByRole('dialog', { name: '导航菜单' });
    expect(trigger).toHaveAttribute('aria-expanded', 'true');
    expect(trigger).toHaveAttribute('aria-controls', menu.id);
    expect(within(menu).getByRole('link', { name: '主页' })).toHaveFocus();
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(trigger).toHaveFocus();
    expect(trigger).toHaveAttribute('aria-expanded', 'false');
  });

  it('keeps Tab navigation inside the open menu', () => {
    renderNav();
    fireEvent.click(screen.getByRole('button', { name: '打开菜单' }));
    const menu = screen.getByRole('dialog', { name: '导航菜单' });
    const close = within(menu).getByRole('button', { name: '关闭菜单' });
    const last = within(menu).getByRole('link', { name: '关于' });
    last.focus();
    fireEvent.keyDown(document, { key: 'Tab' });
    expect(close).toHaveFocus();
    fireEvent.keyDown(document, { key: 'Tab', shiftKey: true });
    expect(last).toHaveFocus();
  });

  it('closes the menu and restores scrolling at the desktop breakpoint', () => {
    renderNav();
    fireEvent.click(screen.getByRole('button', { name: '打开菜单' }));
    expect(document.body.style.overflow).toBe('hidden');
    act(() => desktopChange({ matches: true }));
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(document.body.style.overflow).not.toBe('hidden');
  });
});
