import { useCallback, useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import styles from './Nav.module.css';

const links = [
  { path: '/', label: '主页' },
  { path: '/research', label: '研究学习' },
  { path: '/practice', label: '个人实践' },
  { path: '/portfolio', label: '摄影' },
  { path: '/about', label: '关于' },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const pathname = location.pathname.replace(/\/+$/, '') || '/';
  const menuRef = useRef(null);
  const triggerRef = useRef(null);
  const restoreFocus = useRef(true);
  const reduceMotion = useReducedMotion();
  const closeMenu = useCallback((restore = true) => {
    restoreFocus.current = restore;
    setMenuOpen(false);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    closeMenu(false);
  }, [location.pathname, closeMenu]);

  useEffect(() => {
    if (!menuOpen) return undefined;
    const previousOverflow = document.body.style.overflow;
    const trigger = triggerRef.current;
    const menu = menuRef.current;
    document.body.style.overflow = 'hidden';
    menu.querySelector('a')?.focus();

    const getControls = () => [...menu.querySelectorAll('a[href], button:not([disabled])')];
    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        closeMenu();
      } else if (event.key === 'Tab') {
        const controls = getControls();
        const first = controls[0];
        const last = controls.at(-1);
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last?.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first?.focus();
        }
      }
    };
    const keepFocusInside = (event) => {
      if (!menu.contains(event.target)) getControls()[0]?.focus();
    };
    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('focusin', keepFocusInside);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('focusin', keepFocusInside);
      if (restoreFocus.current && trigger?.isConnected) trigger.focus();
    };
  }, [menuOpen, closeMenu]);

  useEffect(() => {
    const desktop = window.matchMedia('(min-width: 801px)');
    const onDesktop = (event) => {
      if (event.matches) closeMenu(false);
    };
    desktop.addEventListener?.('change', onDesktop);
    return () => desktop.removeEventListener?.('change', onDesktop);
  }, [closeMenu]);

  const navBg = scrolled || menuOpen ? 'rgba(248, 250, 251, 0.94)' : 'rgba(248, 250, 251, 0.82)';

  return (
    <>
      <nav
        aria-label="主导航"
        className={styles.nav}
        style={{ background: navBg }}
      >
        <div className={styles.inner}>
          <Link to="/" className={styles.brand}>
            黄新宏
          </Link>

          <div className={styles.desktopLinks}>
            {links.map(({ path, label }) => (
              <Link
                key={path}
                to={path}
                aria-current={pathname === path ? 'page' : undefined}
                className={`${styles.link} ${pathname === path ? styles.active : ''}`}
              >
                {label}
              </Link>
            ))}
          </div>

          <button
            ref={triggerRef}
            type="button"
            className={`${styles.hamburger} ${menuOpen ? styles.open : ''}`}
            onClick={() => {
              restoreFocus.current = true;
              setMenuOpen(prev => !prev);
            }}
            aria-label="打开菜单"
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
          >
            <span />
            <span />
          </button>
        </div>
      </nav>

        {menuOpen && (
          <motion.div
            ref={menuRef}
            id="mobile-navigation"
            role="dialog"
            aria-modal="true"
            aria-label="导航菜单"
            className={styles.mobileOverlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: reduceMotion ? 0 : 0.2 }}
          >
            <button type="button" className={styles.menuClose} onClick={() => closeMenu()} aria-label="关闭菜单">×</button>
            <div className={styles.mobileLinks}>
              {links.map(({ path, label }, i) => (
                <motion.div
                  key={path}
                  initial={{ opacity: 0, y: reduceMotion ? 0 : 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: reduceMotion ? 0 : i * 0.04 }}
                >
                  <Link
                    to={path}
                    aria-current={pathname === path ? 'page' : undefined}
                    className={`${styles.mobileLink} ${pathname === path ? styles.activeMobile : ''}`}
                    onClick={() => closeMenu(pathname === path)}
                  >
                    {label}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
    </>
  );
}
