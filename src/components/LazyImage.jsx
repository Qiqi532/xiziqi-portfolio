import { useState, useRef, useEffect } from 'react';
import styles from './LazyImage.module.css';

export default function LazyImage({ src, alt, aspectRatio = '3/4', className = '' }) {
  const [loaded, setLoaded] = useState(false);
  const [inView, setInView] = useState(false);
  const imgRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: '200px' }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleLoad = () => setLoaded(true);

  return (
    <div
      ref={imgRef}
      className={`${styles.wrapper} ${className}`}
      style={{ aspectRatio }}
    >
      {/* Skeleton placeholder */}
      <div className={`${styles.skeleton} ${loaded ? styles.hidden : ''}`} />

      {/* Actual image */}
      {inView && (
        <img
          src={src}
          alt={alt}
          className={`${styles.image} ${loaded ? styles.visible : ''}`}
          onLoad={handleLoad}
          loading="lazy"
        />
      )}
    </div>
  );
}
