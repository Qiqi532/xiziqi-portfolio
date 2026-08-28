import { Link } from 'react-router-dom';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <Link to="/" className={styles.brand}>黄新宏</Link>
        <a href="mailto:huangxh89@mail2.sysu.edu.cn" className={styles.mail}>邮箱联系</a>

        <p className={styles.copy}>
          &copy; {new Date().getFullYear()} 黄新宏 · 研究、实践与摄影
        </p>
      </div>
    </footer>
  );
}
