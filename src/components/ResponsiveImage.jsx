import { useState } from 'react';
import imageAssets from '../data/imageAssets.json';

const defaultSizes = '(max-width: 640px) 100vw, (max-width: 1000px) 50vw, 33vw';

function imageKey(src) {
  if (typeof src !== 'string') return null;
  let path = src;
  try {
    if (/^https?:\/\//i.test(path)) {
      const url = new URL(path);
      if (typeof window === 'undefined' || url.origin !== window.location.origin) return null;
      path = url.pathname;
    }
    path = decodeURI(path.split(/[?#]/)[0]);
  } catch { return null; }
  const base = import.meta.env.BASE_URL;
  if (base !== '/' && path.startsWith(base)) path = path.slice(base.length);
  return path.replace(/^\//, '').replace(/^images\/thumbnails\//, 'images/');
}

const assetUrl = (path) => `${import.meta.env.BASE_URL}${path}`;

export default function ResponsiveImage({ src, alt, sizes = defaultSizes, loading = 'lazy', decoding = 'async', width, height, onError, srcSet, ...props }) {
  const [jpegSource, setJpegSource] = useState(null);
  const record = imageAssets[imageKey(src)];
  const usingWebp = record && jpegSource !== src && record.webp.length > 0;
  const variants = record ? record[usingWebp ? 'webp' : 'jpeg'] : null;
  const preferred = variants?.find((variant) => variant.width >= 960) || variants?.at(-1);

  function handleError(event) {
    if (usingWebp && record.jpeg.length > 0) { setJpegSource(src); return; }
    onError?.(event);
  }

  return <img {...props} src={preferred ? assetUrl(preferred.src) : src} srcSet={variants?.length ? variants.map((variant) => `${assetUrl(variant.src)} ${variant.width}w`).join(', ') : srcSet} alt={alt} sizes={sizes} loading={loading} decoding={decoding} width={width ?? record?.width} height={height ?? record?.height} onError={handleError} />;
}
