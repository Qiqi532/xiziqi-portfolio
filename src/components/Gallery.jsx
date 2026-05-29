import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import LazyImage from './LazyImage';
import { images, categories } from '../data/images';
import styles from './Gallery.module.css';

export default function Gallery({ onImageClick }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeCategory = searchParams.get('category') || 'all';

  const filtered = useMemo(() => {
    if (activeCategory === 'all') return images;
    return images.filter(img => img.category === activeCategory);
  }, [activeCategory]);

  const handleCategoryChange = (key) => {
    if (key === 'all') {
      setSearchParams({});
    } else {
      setSearchParams({ category: key });
    }
  };

  // Feature image (first in filtered) + rest in grid
  const [feature, ...rest] = filtered;

  return (
    <div>
      {/* Filter bar */}
      <div className={styles.filterBar}>
        {categories.map(cat => (
          <button
            key={cat.key}
            className={`${styles.filterBtn} ${activeCategory === cat.key ? styles.filterActive : ''}`}
            onClick={() => handleCategoryChange(cat.key)}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Feature-lead grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeCategory}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.4 }}
        >
          {feature && (
            <div className={styles.featureRow}>
              <div className={styles.featureMain}>
                <button
                  className={styles.imageBtn}
                  onClick={() => onImageClick?.(feature)}
                >
                  <LazyImage
                    src={feature.thumb}
                    alt={feature.title}
                    aspectRatio="16/10"
                  />
                  <div className={styles.imageOverlay}>
                    <span className={styles.imageTitle}>{feature.title}</span>
                    <span className={styles.imageCat}>
                      {categories.find(c => c.key === feature.category)?.label}
                    </span>
                  </div>
                </button>
              </div>
              <div className={styles.featureSide}>
                {rest.slice(0, 2).map(img => (
                  <button
                    key={img.id}
                    className={styles.imageBtn}
                    onClick={() => onImageClick?.(img)}
                  >
                    <LazyImage
                      src={img.thumb}
                      alt={img.title}
                      aspectRatio="4/3"
                    />
                    <div className={styles.imageOverlay}>
                      <span className={styles.imageTitle}>{img.title}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Remaining grid */}
          {rest.length > 2 && (
            <div className={styles.grid}>
              {rest.slice(2).map(img => (
                <button
                  key={img.id}
                  className={styles.imageBtn}
                  onClick={() => onImageClick?.(img)}
                >
                  <LazyImage
                    src={img.thumb}
                    alt={img.title}
                    aspectRatio={img.aspect === 'landscape' ? '4/3' : '3/4'}
                  />
                  <div className={styles.imageOverlay}>
                    <span className={styles.imageTitle}>{img.title}</span>
                  </div>
                </button>
              ))}
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
