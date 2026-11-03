import { motion } from 'framer-motion';
import ResponsiveImage from '../components/ResponsiveImage';
import { practiceChapters } from '../data/siteContent';
import styles from './Practice.module.css';

const reveal = { initial: { opacity: 0, y: 16 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, margin: '-40px' } };
const practiceFacts = {
  'P-01': { role: '学院新媒体中心负责人 · 校园宣传工作', outcome: '校级新媒体供稿图片上百张，作品获《光明日报》等媒体采用。' },
  'P-02': { role: '十五运会志愿者', outcome: '获中山大学十五运会先进个人及优秀志愿者。' },
  'P-03': { role: '社会实践影像记录', outcome: '参与的三下乡项目获评省级“优秀”。' },
  'P-04': { role: '影石 Insta360 校园影像创作者', outcome: '入选校园创作者计划，围绕校园、旅途与运动输出共创内容。' },
};

export default function Practice() {
  return (
    <div className={styles.page}>
      <div className="container">
        <header className={styles.header}>
          <span>PRACTICE & SERVICE</span><h1>个人实践</h1>
          <p>在校园媒体、志愿服务与社会实践中，用影像记录，也参与具体的工作。</p>
        </header>
        <section className={styles.chapters} aria-label="实践经历">
          {practiceChapters.map((chapter, index) => (
            <motion.article key={chapter.label} id={chapter.label.toLowerCase()} aria-labelledby={chapter.label + '-title'} className={[styles.chapter, index % 2 === 1 ? styles.reverse : ''].join(' ')} {...reveal}>
              <div className={styles.copy}>
                <span>{chapter.label}</span><h2 id={chapter.label + '-title'}>{chapter.title}</h2>
                <p className={styles.summary}>{chapter.summary}</p>
                <dl className={styles.facts}>
                  <div><dt>我的角色</dt><dd>{practiceFacts[chapter.label].role}</dd></div>
                  <div><dt>实践成果</dt><dd>{practiceFacts[chapter.label].outcome}</dd></div>
                </dl>
                {chapter.body.map((paragraph, paragraphIndex) => chapter.label === 'P-04' && paragraphIndex === 1 ? (
                  <details key={paragraph} className={styles.equipmentDetails}><summary>展开设备与拍摄方式</summary><p>{paragraph}</p></details>
                ) : <p key={paragraph}>{paragraph}</p>)}
                {chapter.links.map((link) => <a key={link.href} href={link.href} target="_blank" rel="noreferrer">{link.label} ↗</a>)}
              </div>
              <div className={[styles.media, styles['media' + chapter.media.length], chapter.layout ? styles[chapter.layout] : ''].filter(Boolean).join(' ')}>
                {chapter.media.map((media) => (
                  <figure key={media.src}>
                    <ResponsiveImage src={media.src} alt={media.alt} className={media.fit === 'contain' ? styles.document : undefined} sizes={chapter.layout === 'trio' ? '(max-width: 620px) calc(100vw - 40px), 200px' : '(max-width: 860px) calc(100vw - 40px), 600px'} />
                    {media.caption ? <figcaption><strong>{media.alt}</strong><span>{media.caption}</span></figcaption> : null}
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
