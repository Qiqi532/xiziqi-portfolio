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
    if (activeCategory === 'exhibition') return images.filter((img) => img.exhibition);
    return images.filter(img => img.category === activeCategory);
  }, [activeCategory]);

  const handleCategoryChange = (key) => {
    if (key === 'all') {
      setSearchParams({});
    } else {
      setSearchParams({ category: key });
    }
  };

  return (
    <section aria-label="摄影作品展廊">
      {/* Filter bar */}
      <div className={styles.filterBar}>
        {categories.map(cat => (
          <button
            key={cat.key}
            className={`${styles.filterBtn} ${activeCategory === cat.key ? styles.filterActive : ''}`}
            aria-pressed={activeCategory === cat.key}
            onClick={() => handleCategoryChange(cat.key)}
          >
            {cat.label}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          className={styles.grid}
          key={activeCategory}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.4 }}
        >
          {filtered.map((img) => (
            <button
              key={img.id}
              className={styles.imageBtn}
              onClick={() => onImageClick?.(img)}
              aria-label={`查看${img.title}`}
            >
              <LazyImage
                src={img.thumb}
                alt={img.title}
                aspectRatio={img.width && img.height ? `${img.width}/${img.height}` : img.aspect === 'portrait' ? '3/4' : '3/2'}
              />
              <span className={styles.imageCaption}>
                <span className={styles.imageTitle}>{img.title}</span>
                <span className={styles.imageCat}>
                  {img.exhibition ? '摄影展入选' : categories.find((category) => category.key === img.category)?.label}
                </span>
              </span>
            </button>
          ))}
        </motion.div>
      </AnimatePresence>
    </section>
  );
}
