import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './Nav.module.css';

const links = [
  { path: '/portfolio', label: 'Work' },
  { path: '/about', label: 'About' },
  { path: '/contact', label: 'Contact' },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const navBg = isHome && !scrolled && !menuOpen
    ? 'transparent'
    : 'var(--color-cream)';

  return (
    <>
      <nav
        className={styles.nav}
        style={{ background: navBg }}
      >
        <div className={styles.inner}>
          <Link to="/" className={styles.brand}>
            xiziqi
          </Link>

          {/* Desktop links */}
          <div className={styles.desktopLinks}>
            {links.map(({ path, label }) => (
              <Link
                key={path}
                to={path}
                className={`${styles.link} ${location.pathname === path ? styles.active : ''}`}
              >
                {label}
              </Link>
            ))}
          </div>

          {/* Hamburger */}
          <button
            className={`${styles.hamburger} ${menuOpen ? styles.open : ''}`}
            onClick={() => setMenuOpen(prev => !prev)}
            aria-label="Toggle menu"
          >
            <span />
            <span />
          </button>
        </div>
      </nav>

      {/* Mobile overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className={styles.mobileOverlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className={styles.mobileLinks}>
              {links.map(({ path, label }, i) => (
                <motion.div
                  key={path}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link
                    to={path}
                    className={`${styles.mobileLink} ${location.pathname === path ? styles.activeMobile : ''}`}
                    onClick={() => setMenuOpen(false)}
                  >
                    {label}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
