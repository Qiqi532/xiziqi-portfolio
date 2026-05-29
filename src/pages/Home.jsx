import { Link } from 'react-router-dom';
import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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

const heroPhotos = images
  .filter(img => img.category === 'landscape' || img.category === 'campus');

export default function Home() {
  const [heroIdx, setHeroIdx] = useState(0);

  const nextHero = useCallback(() => {
    setHeroIdx(prev => (prev + 1) % heroPhotos.length);
  }, []);

  useEffect(() => {
    if (heroPhotos.length === 0) return;
    const timer = setInterval(nextHero, 6000);
    return () => clearInterval(timer);
  }, [nextHero]);

  const heroImg = heroPhotos[heroIdx];

  return (
    <>
      <section className={styles.hero}>
        <AnimatePresence mode="wait">
          <motion.div
            key={heroImg?.id || 'fallback'}
            className={styles.heroBg}
            initial={{ opacity: 0, scale: 1.08 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
          >
            {heroImg && (
              <img
                src={heroImg.src}
                alt={heroImg.title}
                className={styles.heroBgImg}
              />
            )}
          </motion.div>
        </AnimatePresence>

        <div className={styles.heroOverlay} />

        <motion.div className={styles.heroContent} {...fadeUp(0.3)}>
          <h1 className={styles.heroTitle}>Xiziqi</h1>
          <p className={styles.heroSubtitle}>
            landscape &middot; campus &middot; portrait
          </p>
          <Link to="/portfolio" className={styles.heroCta}>
            View Portfolio
          </Link>
        </motion.div>

        <motion.div
          className={styles.heroDots}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          {heroPhotos.map((_, i) => (
            <button
              key={i}
              className={`${styles.heroDot} ${i === heroIdx ? styles.heroDotActive : ''}`}
              onClick={() => setHeroIdx(i)}
              aria-label={`Photo ${i + 1}`}
            />
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
