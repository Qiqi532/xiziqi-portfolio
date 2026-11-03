import { useEffect, useState } from 'react';
import ResponsiveImage from './ResponsiveImage';
import styles from './HeroCarousel.module.css';

export default function HeroCarousel({ slides }) {
  const [index, setIndex] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [hidden, setHidden] = useState(document.hidden);
  const [failedImages, setFailedImages] = useState(() => new Set());
  const [reduceMotion, setReduceMotion] = useState(
    () => window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  );

  const currentIndex = slides.length ? index % slides.length : 0;
  const current = slides[currentIndex];
  const paused = hovered || focused || hidden || reduceMotion;

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updateMotionPreference = (event) => setReduceMotion(event.matches);
    mediaQuery.addEventListener?.('change', updateMotionPreference);
    return () => mediaQuery.removeEventListener?.('change', updateMotionPreference);
  }, []);

  useEffect(() => {
    const updateVisibility = () => setHidden(document.hidden);
    document.addEventListener('visibilitychange', updateVisibility);
    return () => document.removeEventListener('visibilitychange', updateVisibility);
  }, []);

  useEffect(() => {
    if (paused || slides.length < 2) return undefined;
    const timer = window.setInterval(() => {
      setIndex((value) => (value + 1) % slides.length);
    }, 5000);
    return () => window.clearInterval(timer);
  }, [paused, slides.length]);

  if (!current) return null;

  const selectSlide = (nextIndex) => {
    setIndex((nextIndex + slides.length) % slides.length);
  };

  const markImageFailed = () => {
    setFailedImages((images) => new Set(images).add(current.src));
  };

  return (
    <figure
      className={styles.frame}
      aria-label="个人生活照片轮播"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocusCapture={() => setFocused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false);
      }}
    >
      {failedImages.has(current.src) ? (
        <div className={styles.fallback} role="img" aria-label={`${current.location}照片暂时无法显示`}>
          <span>{current.location}</span>
        </div>
      ) : (
        <ResponsiveImage
          key={current.src}
          src={current.src}
          alt={current.alt}
          className={styles.image}
          style={{ objectPosition: current.position }}
          loading="eager"
          fetchpriority={currentIndex === 0 ? 'high' : 'auto'}
          sizes="(max-width: 840px) calc(100vw - 40px), 560px"
          onError={markImageFailed}
        />
      )}
      <figcaption className={styles.controls}>
        <button type="button" aria-label="上一张照片" onClick={() => selectSlide(currentIndex - 1)}>←</button>
        <span className={styles.caption}>{current.location}<small>{String(currentIndex + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}</small></span>
        <button type="button" aria-label="下一张照片" onClick={() => selectSlide(currentIndex + 1)}>→</button>
      </figcaption>
    </figure>
  );
}
