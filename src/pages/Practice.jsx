import { motion } from 'framer-motion';
import { practiceChapters } from '../data/siteContent';
import styles from './Practice.module.css';

const reveal = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
};

export default function Practice() {
  return (
    <div className={styles.page}>
      <div className="container">
        <header className={styles.header}>
          <span>PRACTICE & SERVICE</span>
          <h1>个人实践</h1>
          <p>把观察转化为记录，把专业之外的时间投入真实的人、现场与共同任务。</p>
        </header>

        <section className={styles.chapters} aria-label="实践经历">
          {practiceChapters.map((chapter, index) => (
            <motion.article
              key={chapter.label}
              className={`${styles.chapter} ${index % 2 === 1 ? styles.reverse : ''}`}
              {...reveal}
            >
              <div className={styles.copy}>
                <span>{chapter.label}</span>
                <h2>{chapter.title}</h2>
                <p className={styles.summary}>{chapter.summary}</p>
                {chapter.body.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                {chapter.links.map((link) => (
                  <a key={link.href} href={link.href} target="_blank" rel="noreferrer">{link.label} ↗</a>
                ))}
              </div>
              <div className={`${styles.media} ${styles[`media${chapter.media.length}`]}`}>
                {chapter.media.map((media) => (
                  <figure key={media.src}>
                    <img
                      src={media.src}
                      alt={media.alt}
                      className={media.fit === 'contain' ? styles.contain : styles.cover}
                      loading="lazy"
                    />
                    {media.caption ? (
                      <figcaption><strong>{media.alt}</strong><span>{media.caption}</span></figcaption>
                    ) : null}
                  </figure>
                ))}
              </div>
            </motion.article>
          ))}
        </section>
      </div>
    </div>
  );
}
