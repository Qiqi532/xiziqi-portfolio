import { useState } from 'react';
import { contactChannels } from '../data/siteContent';
import styles from './ContactLinks.module.css';

export default function ContactLinks({ email, light = false }) {
  const [feedback, setFeedback] = useState('');
  const { xiaohongshu } = contactChannels;

  const copyHandle = async () => {
    try {
      if (!navigator.clipboard?.writeText) throw new Error('Clipboard unavailable');
      await navigator.clipboard.writeText(xiaohongshu.handle);
      setFeedback('已复制');
    } catch {
      setFeedback(`请手动复制：${xiaohongshu.handle}`);
    }
  };

  return (
    <div className={`${styles.contact} ${light ? styles.light : ''}`}>
      <div className={styles.links}>
        <a href={`mailto:${email}`}>通过邮箱联系</a>
        <a href={xiaohongshu.href} target="_blank" rel="noreferrer">访问小红书主页 ↗</a>
        <button type="button" onClick={copyHandle} aria-label="复制小红书号">复制账号</button>
      </div>
      <p>
        小红书号：<span className={styles.handle}>{xiaohongshu.handle}</span>
        <span className={styles.feedback} aria-live="polite">{feedback}</span>
      </p>
    </div>
  );
}
