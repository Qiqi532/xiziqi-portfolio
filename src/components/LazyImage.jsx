import { useState, useRef, useEffect } from 'react';
import ResponsiveImage from './ResponsiveImage';
import styles from './LazyImage.module.css';

export default function LazyImage({ src, alt, aspectRatio = '3/4', className = '' }) {
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);
  const [attempt, setAttempt] = useState(0);
  const [inView, setInView] = useState(false);
  const imgRef = useRef(null);

  useEffect(() => {
    if (!('IntersectionObserver' in window)) {
      setInView(true);
      return undefined;
    }
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

  useEffect(() => {
    setLoaded(false);
    setFailed(false);
    setAttempt(0);
  }, [src]);

  const handleLoad = () => setLoaded(true);
  const retry = () => {
    setLoaded(false);
    setFailed(false);
    setAttempt((value) => value + 1);
  };

  return (
    <div
      ref={imgRef}
      className={`${styles.wrapper} ${className}`}
      style={{ aspectRatio }}
    >
      {!failed && <div aria-hidden="true" className={`${styles.skeleton} ${loaded ? styles.hidden : ''}`} />}

      {failed ? (
        <div className={styles.error} role="status">
          <p>图片暂时无法加载</p>
          <button type="button" onClick={retry}>重试加载图片</button>
        </div>
      ) : inView && (
        <ResponsiveImage
          key={`${src}-${attempt}`}
          src={src}
          alt={alt}
          className={`${styles.image} ${loaded ? styles.visible : ''}`}
          onLoad={handleLoad}
          onError={() => setFailed(true)}
          loading="lazy"
          sizes="(max-width: 540px) calc(100vw - 40px), (max-width: 900px) calc((100vw - 72px) / 2), 360px"
        />
      )}
    </div>
  );
}
