import { useState } from 'react';
import { contactChannels } from '../data/siteContent';
import styles from './ContactLinks.module.css';

export default function ContactLinks({ email, light = false }) {
  const [feedback, setFeedback] = useState({});
  const { github, xiaohongshu, wechat } = contactChannels;

  const copyHandle = async (key, value) => {
    try {
      if (!navigator.clipboard?.writeText) throw new Error('Clipboard unavailable');
      await navigator.clipboard.writeText(value);
      setFeedback((prev) => ({ ...prev, [key]: '已复制' }));
    } catch {
      setFeedback((prev) => ({ ...prev, [key]: `请手动复制：${value}` }));
    }
  };

  return (
    <div className={`${styles.contact} ${light ? styles.light : ''}`}>
      <div className={styles.links}>
        <a href={`mailto:${email}`}>通过邮箱联系</a>
        <a href={github.href} target="_blank" rel="noreferrer">访问 GitHub ↗</a>
        <a href={xiaohongshu.href} target="_blank" rel="noreferrer">访问小红书主页 ↗</a>
        <button type="button" onClick={() => copyHandle('wechat', wechat.handle)} aria-label="复制微信号">
          复制微信号
        </button>
      </div>
      <p>
        GitHub：<span className={styles.handle}>{github.handle}</span>
        <span className={styles.separator}>·</span>
        小红书号：<span className={styles.handle}>{xiaohongshu.handle}</span>
        <span className={styles.separator}>·</span>
        微信：<span className={styles.handle}>{wechat.handle}</span>
        {feedback.wechat && <span className={styles.feedback} aria-live="polite">{feedback.wechat}</span>}
      </p>
    </div>
  );
}
