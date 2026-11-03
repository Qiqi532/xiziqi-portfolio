import styles from './PhotographyCreator.module.css';

export default function PhotographyCreator({ creator }) {
  return (
    <section className={styles.card} aria-label="小红书创作">
      <div className={styles.intro}>
        <div className={styles.byline}>
          <span className={styles.platform}>小红书</span>
          <span className={styles.name}>@{creator.name}</span>
        </div>
        <h2>在小红书，分享镜头内外</h2>
        <p className={styles.description}>{creator.description}</p>
        <ul className={styles.topics} aria-label="分享主题">
          {creator.topics.map((topic) => <li key={topic}>{topic}</li>)}
        </ul>
      </div>
      <div className={styles.activity}>
        <dl className={styles.stats}>
          {creator.stats.map(({ value, label }) => (
            <div key={label}>
              <dt>{label}</dt>
              <dd>{value}</dd>
            </div>
          ))}
        </dl>
        <a className={styles.link} href={creator.href} target="_blank" rel="noopener noreferrer">
          去小红书看看 <span aria-hidden="true">↗</span>
        </a>
      </div>
    </section>
  );
}
