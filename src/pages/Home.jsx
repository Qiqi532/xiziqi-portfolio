import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import LazyImage from '../components/LazyImage';
import { images, categories } from '../data/images';
import styles from './Home.module.css';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: [0.25, 0.1, 0.25, 1] },
});

const featuredCategories = categories.filter(c => c.key !== 'all');
const featuredImages = featuredCategories.map(cat =>
  images.find(img => img.category === cat.key)
).filter(Boolean);

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className={styles.hero}>
        <motion.div className={styles.heroContent} {...fadeUp(0.2)}>
          <h1 className={styles.heroTitle}>Through my lens</h1>
          <p className={styles.heroSubtitle}>
            stories from campus, nature &amp; the human spirit
          </p>
        </motion.div>

        <motion.div
          className={styles.heroStrip}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
        >
          {images.slice(0, 4).map(img => (
            <div key={img.id} className={styles.heroImageWrap}>
              <LazyImage
                src={img.thumb}
                alt={img.title}
                aspectRatio={img.aspect === 'portrait' ? '4/5' : '16/9'}
              />
            </div>
          ))}
        </motion.div>

        <motion.div
          className={styles.scrollHint}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          <span>Scroll</span>
          <div className={styles.scrollLine} />
        </motion.div>
      </section>

      {/* Featured Picks */}
      <section className={styles.featured}>
        <div className="container">
          <motion.h2
            className={styles.sectionTitle}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.7 }}
          >
            Featured Work
          </motion.h2>
          <hr className="section-divider" />

          <div className={styles.featuredGrid}>
            {featuredImages.map((img, i) => (
              <motion.div
                key={img.id}
                className={styles.featuredCard}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
              >
                <Link
                  to={`/portfolio?category=${img.category}`}
                  className={styles.featuredLink}
                >
                  <LazyImage
                    src={img.thumb}
                    alt={img.title}
                    aspectRatio="4/3"
                  />
                  <div className={styles.featuredLabel}>
                    <span className={styles.featuredCategory}>
                      {categories.find(c => c.key === img.category)?.label}
                    </span>
                    <span className={styles.featuredTitle}>{img.title}</span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
