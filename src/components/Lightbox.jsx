import { useEffect, useState, useCallback, useMemo, useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { images } from '../data/images';
import ResponsiveImage from './ResponsiveImage';
import styles from './Lightbox.module.css';

export default function Lightbox({ image, collection = images, onClose }) {
  const [currentId, setCurrentId] = useState(image.id);
  const [status, setStatus] = useState('loading');
  const [attempt, setAttempt] = useState(0);
  const dialogRef = useRef(null);
  const closeRef = useRef(null);
  const touchStart = useRef(null);
  const reduceMotion = useReducedMotion();
  const items = useMemo(() => {
    const unique = new Map(collection.map((item) => [item.id, item]));
    if (!unique.has(image.id)) return [image, ...unique.values()];
    return [...unique.values()];
  }, [collection, image]);
  const currentImage = items.find((item) => item.id === currentId) || image;
  const currentIndex = items.findIndex((item) => item.id === currentImage.id);

  useEffect(() => {
    setCurrentId(image.id);
  }, [image.id]);

  useEffect(() => {
    setStatus('loading');
    setAttempt(0);
  }, [currentImage.src]);

  const goTo = useCallback((delta) => {
    if (items.length < 2) return;
    setStatus('loading');
    setAttempt(0);
    setCurrentId(prev => {
      const idx = items.findIndex((item) => item.id === prev);
      return items[(idx + delta + items.length) % items.length].id;
    });
  }, [items]);

  useEffect(() => {
    const onKey = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onClose();
      } else if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
        event.preventDefault();
        goTo(event.key === 'ArrowLeft' ? -1 : 1);
      } else if (event.key === 'Tab') {
        const controls = [...dialogRef.current.querySelectorAll('button:not([disabled])')];
        const first = controls[0];
        const last = controls.at(-1);
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last?.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first?.focus();
        }
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [onClose, goTo]);

  useEffect(() => {
    const previousFocus = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();
    const keepFocusInside = (event) => {
      if (!dialogRef.current?.contains(event.target)) closeRef.current?.focus();
    };
    document.addEventListener('focusin', keepFocusInside);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('focusin', keepFocusInside);
      if (previousFocus?.isConnected) previousFocus.focus();
    };
  }, []);

  const handleTouchEnd = (event) => {
    if (!touchStart.current) return;
    const touch = event.changedTouches[0];
    const dx = touchStart.current.x - touch.clientX;
    const dy = touchStart.current.y - touch.clientY;
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.2) {
      goTo(dx > 0 ? 1 : -1);
    }
    touchStart.current = null;
  };

  const retry = () => {
    closeRef.current?.focus();
    setStatus('loading');
    setAttempt((value) => value + 1);
  };

  return (
    <motion.div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label={`查看照片：${currentImage.title}`}
      className={styles.overlay}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: reduceMotion ? 0 : 0.2 }}
      onClick={(event) => { if (event.target === event.currentTarget) onClose(); }}
    >
      <button ref={closeRef} type="button" className={styles.close} onClick={onClose} aria-label="关闭照片">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>

      <div className={styles.imageContainer}>
        <div
          className={styles.viewport}
          aria-busy={status === 'loading'}
          onTouchStart={(event) => {
            const touch = event.touches[0];
            touchStart.current = { x: touch.clientX, y: touch.clientY };
          }}
          onTouchEnd={handleTouchEnd}
          onTouchCancel={() => { touchStart.current = null; }}
        >
          {status === 'loading' && <div className={styles.spinner} role="status" aria-label="正在加载照片" />}
          {status === 'error' ? (
            <div className={styles.error} role="status">
              <p>照片暂时无法加载</p>
              <button type="button" onClick={retry}>重试加载照片</button>
            </div>
          ) : (
            <ResponsiveImage
              key={`${currentImage.src}-${attempt}`}
              src={currentImage.src}
              alt={currentImage.title}
              className={`${styles.image} ${status === 'loaded' ? styles.loaded : ''}`}
              onLoad={() => setStatus('loaded')}
              onError={() => setStatus('error')}
              sizes="(max-width: 768px) calc(100vw - 32px), min(90vw, 1800px)"
              draggable={false}
            />
          )}
        </div>
        <div className={styles.caption} aria-live="polite">
          <span className={styles.captionTitle}>{currentImage.title}</span>
          <span className={styles.counter}>{currentIndex + 1} / {items.length}</span>
        </div>
      </div>
      <div className={styles.navigation}>
        <button type="button" className={styles.arrow} onClick={() => goTo(-1)} disabled={items.length < 2} aria-label="上一张照片">← <span>上一张</span></button>
        <button type="button" className={styles.arrow} onClick={() => goTo(1)} disabled={items.length < 2} aria-label="下一张照片"><span>下一张</span> →</button>
      </div>
    </motion.div>
  );
}
