import { motion } from 'framer-motion';
import styles from './About.module.css';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay, ease: [0.25, 0.1, 0.25, 1] },
});

export default function About() {
  return (
    <div className={styles.page}>
      <div className="container">
        <motion.div className={styles.header} {...fadeUp(0)}>
          <h2>About Xiziqi</h2>
          <hr className="section-divider" />
        </motion.div>

        <div className={styles.content}>
          <motion.div className={styles.photoCol} {...fadeUp(0.2)}>
            <div className={styles.portrait}>
              <img
                src={`${import.meta.env.BASE_URL}images/self.jpg`}
                alt="曦熙子柒"
                className={styles.portraitImg}
              />
            </div>
          </motion.div>

          <motion.div className={styles.textCol} {...fadeUp(0.3)}>
            <p className={styles.bio}>
              Hi, I&rsquo;m <strong>曦熙子柒</strong> — a photographer
              based in <strong>珠海 SYSU</strong>, originally from 泉州.
            </p>
            <p className={styles.bio}>
              📔 An SYSU undergrad who can&rsquo;t quite figure out physics — so I
              tell stories through my lens instead. My work spans{' '}
              <strong>landscape</strong>, <strong>campus life</strong>, and{' '}
              <strong>portrait</strong> photography — capturing light, moments, and
              the poetry in between.
            </p>
            <p className={styles.bio}>
              ✨ Contracted photographer with{' '}
              <strong>视觉中国 (VCG)</strong> and{' '}
              <strong>海丝泉州</strong>. When I&rsquo;m not behind the camera,
              you&rsquo;ll find me sharing campus life stories and photography
              travel guides.
            </p>

            <div className={styles.tags}>
              <span className={styles.tag}>风光</span>
              <span className={styles.tag}>人文</span>
              <span className={styles.tag}>人像约拍</span>
              <span className={styles.tag}>校园摄影</span>
            </div>

            <div className={styles.meta}>
              <div className={styles.metaItem}>
                <span className={styles.metaIcon}>&#x1F4CD;</span>
                <span className={styles.metaLabel}>Based in</span>
                <span className={styles.metaValue}>珠海 · SYSU</span>
              </div>
              <div className={styles.metaItem}>
                <span className={styles.metaIcon}>&#x1F4F7;</span>
                <span className={styles.metaLabel}>Camera</span>
                <span className={styles.metaValue}>Nikon</span>
              </div>
              <div className={styles.metaItem}>
                <span className={styles.metaIcon}>&#x1F31F;</span>
                <span className={styles.metaLabel}>Affiliation</span>
                <span className={styles.metaValue}>视觉中国 · 海丝泉州</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
