import { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { images } from '../data/images';
import styles from './Lightbox.module.css';

export default function Lightbox({ image, onClose }) {
  const [currentId, setCurrentId] = useState(image.id);
  const [loaded, setLoaded] = useState(false);
  const currentImage = images.find(img => img.id === currentId) || image;
  const currentIndex = images.findIndex(img => img.id === currentId);

  const goTo = useCallback((delta) => {
    setLoaded(false);
    setCurrentId(prev => {
      const idx = images.findIndex(img => img.id === prev);
      const newIdx = (idx + delta + images.length) % images.length;
      return images[newIdx].id;
    });
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') goTo(-1);
      if (e.key === 'ArrowRight') goTo(1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose, goTo]);

  // Prevent body scroll
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  // Touch swipe support
  const [touchStart, setTouchStart] = useState(null);
  const handleTouchStart = (e) => setTouchStart(e.touches[0].clientX);
  const handleTouchEnd = (e) => {
    if (touchStart === null) return;
    const diff = touchStart - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      goTo(diff > 0 ? 1 : -1);
    }
    setTouchStart(null);
  };

  return (
    <motion.div
      className={styles.overlay}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      onClick={onClose}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Close button */}
      <button className={styles.close} onClick={onClose} aria-label="Close">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>

      {/* Navigation arrows */}
      <button
        className={`${styles.arrow} ${styles.prev}`}
        onClick={(e) => { e.stopPropagation(); goTo(-1); }}
        aria-label="Previous"
      >
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <polyline points="15 18 9 12 15 6" />
        </svg>
      </button>

      <button
        className={`${styles.arrow} ${styles.next}`}
        onClick={(e) => { e.stopPropagation(); goTo(1); }}
        aria-label="Next"
      >
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </button>

      {/* Image */}
      <AnimatePresence mode="wait">
        <motion.div
          className={styles.imageContainer}
          onClick={(e) => e.stopPropagation()}
          key={currentId}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{ duration: 0.25 }}
        >
          {!loaded && <div className={styles.spinner} />}
          <img
            src={currentImage.src}
            alt={currentImage.title}
            className={`${styles.image} ${loaded ? styles.loaded : ''}`}
            onLoad={() => setLoaded(true)}
            draggable={false}
          />

          {/* Caption */}
          <div className={styles.caption}>
            <span className={styles.captionTitle}>{currentImage.title}</span>
            <span className={styles.counter}>
              {currentIndex + 1} / {images.length}
            </span>
          </div>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
}
