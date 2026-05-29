import { Link } from 'react-router-dom';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <Link to="/" className={styles.brand}>
          xiziqi
        </Link>

        <div className={styles.socials}>
          <a href="#" className={styles.socialLink} aria-label="Instagram">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
              <circle cx="12" cy="12" r="5"/>
              <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none"/>
            </svg>
          </a>
          <a href="#" className={styles.socialLink} aria-label="WeChat">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M8.5 11a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z"/>
              <path d="M15.5 11a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z"/>
              <path d="M9 14c-2.5 0-4.5 1.5-4.5 3.5h9c0-2-2-3.5-4.5-3.5z"/>
              <circle cx="18" cy="13" r="5"/>
            </svg>
          </a>
          <a href="#" className={styles.socialLink} aria-label="Xiaohongshu">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2L2 7l10 5 10-5-10-5z"/>
              <path d="M2 17l10 5 10-5"/>
              <path d="M2 12l10 5 10-5"/>
            </svg>
          </a>
        </div>

        <p className={styles.copy}>
          &copy; {new Date().getFullYear()} Xiziqi. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
