import { useEffect, useLayoutEffect } from 'react';
import { useLocation, useNavigationType } from 'react-router-dom';
import { notFoundMetadata, pageMetadata } from '../data/pageMetadata';

const positions = new Map();

export default function RouteExperience({ children }) {
  const location = useLocation();
  const navigationType = useNavigationType();

  useLayoutEffect(() => {
    const pathname = location.pathname.replace(/\/+$/, '') || '/';
    const metadata = pageMetadata[pathname] || notFoundMetadata;
    document.title = metadata.title;
    for (const [selector, value] of [
      ['meta[name="description"]', metadata.description],
      ['meta[property="og:title"]', metadata.title],
      ['meta[property="og:description"]', metadata.description],
    ]) document.querySelector(selector)?.setAttribute('content', value);
    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) {
      const url = new URL(`${import.meta.env.BASE_URL}${pathname.slice(1)}${pathname === '/' ? '' : '/'}`, window.location.origin).href;
      canonical.setAttribute('href', url);
      document.querySelector('meta[property="og:url"]')?.setAttribute('content', url);
    }

    let target = null;
    if (location.hash) {
      try { target = document.getElementById(decodeURIComponent(location.hash.slice(1))); } catch { /* A malformed fragment still opens the page. */ }
    }
    if (target) target.scrollIntoView({ block: 'start' });
    else {
      const position = navigationType === 'POP' ? positions.get(location.key) : null;
      window.scrollTo(0, position?.y || 0);
    }
    if (navigationType !== 'POP') {
      const heading = target || document.querySelector('main h1');
      if (heading) { heading.setAttribute('tabindex', '-1'); heading.focus({ preventScroll: true }); }
    }
  }, [location.pathname, location.hash]);

  useEffect(() => {
    const savePosition = () => positions.set(location.key, { y: window.scrollY });
    window.addEventListener('scroll', savePosition, { passive: true });
    return () => window.removeEventListener('scroll', savePosition);
  }, [location.key]);

  return children;
}
