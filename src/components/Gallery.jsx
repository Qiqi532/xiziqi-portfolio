import { useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import LazyImage from './LazyImage';
import { images, categories } from '../data/images';
import styles from './Gallery.module.css';

const filters = [{ key: 'selected', label: '精选' }, ...categories.filter(({ key }) => key !== 'selected')];
const validCategories = new Set(filters.map(({ key }) => key));
const exhibition = images.filter((image) => image.exhibition);
const representatives = exhibition.length
  ? images.filter(({ category }) => category === 'portrait').slice(0, 2)
  : ['campus', 'landscape', 'portrait'].flatMap((key) => images.filter(({ category }) => category === key).slice(0, 2));
const selectedIds = new Set([...exhibition, ...representatives].map(({ id }) => id));

export default function Gallery({ onImageClick }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const requestedCategory = searchParams.get('category');
  const activeCategory = requestedCategory === null ? 'selected' : validCategories.has(requestedCategory) ? requestedCategory : 'all';
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (requestedCategory === activeCategory) return;
    setSearchParams((previous) => {
      const next = new URLSearchParams(previous);
      next.set('category', activeCategory);
      return next;
    }, { replace: true });
  }, [requestedCategory, activeCategory, setSearchParams]);

  const filtered = useMemo(() => {
    if (activeCategory === 'all') return images;
    if (activeCategory === 'selected') return images.filter(({ id }) => selectedIds.has(id));
    if (activeCategory === 'exhibition') return images.filter((img) => img.exhibition);
    return images.filter(img => img.category === activeCategory);
  }, [activeCategory]);

  const handleCategoryChange = (key) => {
    const next = new URLSearchParams(searchParams);
    next.set('category', key);
    setSearchParams(next);
  };

  return (
    <section aria-label="摄影作品展廊">
      <div className={styles.filterBar} role="group" aria-label="摄影分类">
        {filters.map(cat => (
          <button
            type="button"
            key={cat.key}
            className={`${styles.filterBtn} ${activeCategory === cat.key ? styles.filterActive : ''}`}
            aria-pressed={activeCategory === cat.key}
            onClick={() => handleCategoryChange(cat.key)}
          >
            {cat.label}
          </button>
        ))}
      </div>
      <p className={styles.resultCount} role="status">{filters.find(({ key }) => key === activeCategory)?.label} · {filtered.length} 张</p>

      <AnimatePresence mode="wait">
        <motion.div
          className={styles.grid}
          key={activeCategory}
          initial={{ opacity: 0, y: reduceMotion ? 0 : 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: reduceMotion ? 0 : -10 }}
          transition={{ duration: reduceMotion ? 0 : 0.2 }}
        >
          {filtered.map((img) => (
            <article key={img.id} className={styles.imageCard}>
              <LazyImage
                src={img.thumb}
                alt={img.title}
                aspectRatio={img.width && img.height ? `${img.width}/${img.height}` : img.aspect === 'portrait' ? '3/4' : '3/2'}
              />
              <button
                type="button"
                className={styles.imageBtn}
                onClick={() => onImageClick?.(img, filtered)}
                aria-label={`查看${img.title}`}
              />
              <span className={styles.imageCaption}>
                <span className={styles.imageTitle}>{img.title}</span>
                <span className={styles.imageCat}>
                  {img.exhibition ? '摄影展入选' : categories.find((category) => category.key === img.category)?.label}
                </span>
              </span>
            </article>
          ))}
        </motion.div>
      </AnimatePresence>
    </section>
  );
}
