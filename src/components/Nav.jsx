import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
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

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const navBg = scrolled || menuOpen ? 'rgba(248, 250, 251, 0.94)' : 'rgba(248, 250, 251, 0.82)';

  return (
    <>
      <nav
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
                className={`${styles.link} ${location.pathname === path ? styles.active : ''}`}
              >
                {label}
              </Link>
            ))}
          </div>

          <button
            className={`${styles.hamburger} ${menuOpen ? styles.open : ''}`}
            onClick={() => setMenuOpen(prev => !prev)}
            aria-label={menuOpen ? '关闭菜单' : '打开菜单'}
          >
            <span />
            <span />
          </button>
        </div>
      </nav>

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
