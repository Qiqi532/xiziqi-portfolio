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
                src="/images/self.jpg"
                alt="Xiziqi"
                className={styles.portraitImg}
              />
            </div>
          </motion.div>

          <motion.div className={styles.textCol} {...fadeUp(0.3)}>
            <p className={styles.bio}>
              Hi, I&rsquo;m <strong>[your name]</strong> — a photographer
              based in <strong>[your location]</strong>. I believe every image
              carries a story waiting to be told.
            </p>
            <p className={styles.bio}>
              My lens gravitates toward the quiet poetry of campus life, the
              vastness of natural landscapes, and the unguarded moments that
              reveal who we truly are.
            </p>
            <p className={styles.bio}>
              When I&rsquo;m not behind the camera, you&rsquo;ll find me
              [a personal note about your hobbies or interests].
            </p>

            <div className={styles.meta}>
              <div className={styles.metaItem}>
                <span className={styles.metaIcon}>&#x1F4CD;</span>
                <span className={styles.metaLabel}>Based in</span>
                <span className={styles.metaValue}>[your city]</span>
              </div>
              <div className={styles.metaItem}>
                <span className={styles.metaIcon}>&#x1F4F7;</span>
                <span className={styles.metaLabel}>Gear</span>
                <span className={styles.metaValue}>[your camera / lens]</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
