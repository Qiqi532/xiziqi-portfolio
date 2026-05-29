# Xiziqi Photography Portfolio — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a 4-page photography portfolio website (Home, Portfolio, About, Contact) with React + Vite, natural/organic aesthetic, feature-lead gallery grid, lightbox, and smooth page transitions.

**Architecture:** React 18 SPA with react-router-dom v6 for routing and framer-motion for animations. CSS Modules with CSS custom properties for theming. Component tree: App → (Nav, page content via Outlet, Footer). Gallery + Lightbox handle the portfolio experience. LazyImage wraps all photos with Intersection Observer loading.

**Tech Stack:** React 18, Vite 5, react-router-dom v6, framer-motion v11, CSS Modules, Google Fonts (Cormorant Garamond + Lato)

---

## File Map

| File | Responsibility |
|------|---------------|
| `package.json` | Dependencies and scripts |
| `vite.config.js` | Vite config (React plugin) |
| `index.html` | Entry HTML, Google Fonts link |
| `src/main.jsx` | React DOM root render |
| `src/App.jsx` | Router definition + layout shell |
| `src/styles/global.css` | CSS variables, font faces, reset |
| `src/components/Nav.jsx` | Transparent→solid nav, mobile menu |
| `src/components/Nav.module.css` | Nav styles |
| `src/components/Footer.jsx` | Centered footer |
| `src/components/Footer.module.css` | Footer styles |
| `src/components/LazyImage.jsx` | Lazy-loaded image with placeholder |
| `src/components/LazyImage.module.css` | LazyImage styles |
| `src/components/Gallery.jsx` | Category filter + feature-lead grid |
| `src/components/Gallery.module.css` | Gallery styles |
| `src/components/Lightbox.jsx` | Full-screen photo viewer |
| `src/components/Lightbox.module.css` | Lightbox styles |
| `src/components/ContactForm.jsx` | Inquiry form (static) |
| `src/components/ContactForm.module.css` | Form styles |
| `src/pages/Home.jsx` | Full-bleed hero + featured picks |
| `src/pages/Home.module.css` | Home styles |
| `src/pages/Portfolio.jsx` | Portfolio page with Gallery |
| `src/pages/Portfolio.module.css` | Portfolio styles |
| `src/pages/About.jsx` | Photo + bio layout |
| `src/pages/About.module.css` | About styles |
| `src/pages/Contact.jsx` | Contact info + form |
| `src/pages/Contact.module.css` | Contact styles |
| `src/data/images.js` | Placeholder image data |

---

### Task 1: Project Scaffold

**Files:**
- Create: `package.json`
- Create: `vite.config.js`
- Create: `index.html`
- Create: `src/main.jsx`

- [ ] **Step 1: Create package.json**

```json
{
  "name": "xiziqi-portfolio",
  "private": true,
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "framer-motion": "^11.0.0",
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "react-router-dom": "^6.23.0"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.3.0",
    "vite": "^5.4.0"
  }
}
```

- [ ] **Step 2: Create vite.config.js**

```js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
});
```

- [ ] **Step 3: Create index.html**

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Xiziqi — Photography</title>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400;1,600&family=Lato:wght@300;400;700&display=swap"
      rel="stylesheet"
    />
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
```

- [ ] **Step 4: Create src/main.jsx**

```jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './styles/global.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
```

- [ ] **Step 5: Install dependencies and verify scaffold**

Run: `cd "C:\Users\黄新宏\Desktop\Photographer" && npm install`
Expected: Dependencies install without errors.

- [ ] **Step 6: Verify dev server starts**

Run: `npm run dev`
Expected: Vite dev server starts. Visit the URL — blank page with no errors in console.
Then stop the server (Ctrl+C).

---

### Task 2: Global Styles

**Files:**
- Create: `src/styles/global.css`

- [ ] **Step 1: Create global.css with CSS variables and reset**

```css
/* === CSS Custom Properties === */
:root {
  --color-forest: #2d5a27;
  --color-forest-light: #6b9b63;
  --color-cream: #f5efe6;
  --color-sand: #e8ddd0;
  --color-charcoal: #3a3a3a;
  --color-warm-accent: #e8c4a0;
  --color-white: #ffffff;

  --font-heading: 'Cormorant Garamond', Georgia, serif;
  --font-body: 'Lato', system-ui, sans-serif;

  --radius-sm: 8px;
  --radius-md: 12px;
  --radius-lg: 20px;

  --max-width: 1200px;
  --nav-height: 64px;
}

/* === Reset === */
*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  scroll-behavior: smooth;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

body {
  font-family: var(--font-body);
  font-weight: 400;
  font-size: 16px;
  line-height: 1.6;
  color: var(--color-charcoal);
  background-color: var(--color-cream);
  min-height: 100vh;
}

h1, h2, h3, h4, h5, h6 {
  font-family: var(--font-heading);
  font-weight: 400;
  color: var(--color-forest);
  line-height: 1.2;
}

h1 { font-size: clamp(2.5rem, 5vw, 4rem); font-style: italic; }
h2 { font-size: clamp(2rem, 4vw, 3rem); font-style: italic; }
h3 { font-size: clamp(1.25rem, 2.5vw, 1.75rem); }

a {
  color: var(--color-forest);
  text-decoration: none;
  transition: color 0.2s ease;
}

a:hover {
  color: var(--color-forest-light);
}

img {
  display: block;
  max-width: 100%;
}

button {
  cursor: pointer;
  font-family: var(--font-body);
  border: none;
  background: none;
}

ul, ol {
  list-style: none;
}

/* === Utility === */
.container {
  width: 100%;
  max-width: var(--max-width);
  margin: 0 auto;
  padding: 0 24px;
}

.page-section {
  padding: 80px 0;
}

.section-divider {
  width: 40px;
  height: 2px;
  background: var(--color-forest-light);
  margin: 16px auto;
  border: none;
}

/* === Grain overlay === */
.grain-overlay {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 9999;
  opacity: 0.03;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
}
```

- [ ] **Step 2: Verify styles load**

Run: `npm run dev` then check browser DevTools — inspect `<body>`, verify CSS variables show in computed styles.
Then stop the server.

---

### Task 3: App Shell (Router + Layout)

**Files:**
- Create: `src/App.jsx`

- [ ] **Step 1: Create App.jsx with route definitions and layout**

```jsx
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Nav from './components/Nav';
import Footer from './components/Footer';
import Home from './pages/Home';
import Portfolio from './pages/Portfolio';
import About from './pages/About';
import Contact from './pages/Contact';

export default function App() {
  const location = useLocation();

  return (
    <>
      <div className="grain-overlay" />
      <Nav />
      <main>
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </AnimatePresence>
      </main>
      <Footer />
    </>
  );
}
```

- [ ] **Step 2: Create stub pages so the app compiles**

Create placeholder files for all pages (they will be replaced in later tasks):

`src/pages/Home.jsx`:
```jsx
export default function Home() {
  return <div style={{padding: '120px 24px', textAlign: 'center'}}>Home</div>;
}
```

`src/pages/Portfolio.jsx`:
```jsx
export default function Portfolio() {
  return <div style={{padding: '120px 24px', textAlign: 'center'}}>Portfolio</div>;
}
```

`src/pages/About.jsx`:
```jsx
export default function About() {
  return <div style={{padding: '120px 24px', textAlign: 'center'}}>About</div>;
}
```

`src/pages/Contact.jsx`:
```jsx
export default function Contact() {
  return <div style={{padding: '120px 24px', textAlign: 'center'}}>Contact</div>;
}
```

Create stub Nav and Footer too:

`src/components/Nav.jsx`:
```jsx
export default function Nav() {
  return <nav style={{padding: '20px 24px', textAlign: 'center'}}>Nav placeholder</nav>;
}
```

`src/components/Footer.jsx`:
```jsx
export default function Footer() {
  return <footer style={{padding: '20px 24px', textAlign: 'center'}}>Footer placeholder</footer>;
}
```

- [ ] **Step 3: Verify routing works**

Run: `npm run dev`
Expected: Navigate to `/`, `/portfolio`, `/about`, `/contact` — each shows its stub text. No console errors.
Then stop the server.

---

### Task 4: Image Data + LazyImage Component

**Files:**
- Create: `src/data/images.js`
- Create: `src/components/LazyImage.jsx`
- Create: `src/components/LazyImage.module.css`

- [ ] **Step 1: Create image data with placeholder URLs**

```js
// Placeholder images using picsum.photos — replace with your own photos
// Categorized into campus, landscape, portrait

const baseImg = (id, w, h) => `https://picsum.photos/seed/${id}/${w}/${h}`;

export const images = [
  // Campus
  { id: 1, src: baseImg('campus1', 800, 1000), thumb: baseImg('campus1', 400, 500), category: 'campus', title: 'Golden Hour Library', aspect: 'portrait' },
  { id: 2, src: baseImg('campus2', 1200, 800), thumb: baseImg('campus2', 600, 400), category: 'campus', title: 'Autumn Path', aspect: 'landscape' },
  { id: 3, src: baseImg('campus3', 800, 1000), thumb: baseImg('campus3', 400, 500), category: 'campus', title: 'Quiet Corner', aspect: 'portrait' },
  { id: 4, src: baseImg('campus4', 1200, 800), thumb: baseImg('campus4', 600, 400), category: 'campus', title: 'Morning Light', aspect: 'landscape' },

  // Landscape
  { id: 5, src: baseImg('land1', 1200, 800), thumb: baseImg('land1', 600, 400), category: 'landscape', title: 'Mountain Mist', aspect: 'landscape' },
  { id: 6, src: baseImg('land2', 800, 1200), thumb: baseImg('land2', 400, 600), category: 'landscape', title: 'Vertical Horizon', aspect: 'portrait' },
  { id: 7, src: baseImg('land3', 1200, 800), thumb: baseImg('land3', 600, 400), category: 'landscape', title: 'Golden Fields', aspect: 'landscape' },
  { id: 8, src: baseImg('land4', 1000, 1000), thumb: baseImg('land4', 500, 500), category: 'landscape', title: 'Still Waters', aspect: 'square' },

  // Portrait
  { id: 9, src: baseImg('port1', 800, 1000), thumb: baseImg('port1', 400, 500), category: 'portrait', title: 'Candid Smile', aspect: 'portrait' },
  { id: 10, src: baseImg('port2', 800, 1000), thumb: baseImg('port2', 400, 500), category: 'portrait', title: 'Window Light', aspect: 'portrait' },
  { id: 11, src: baseImg('port3', 1200, 800), thumb: baseImg('port3', 600, 400), category: 'portrait', title: 'In Thought', aspect: 'landscape' },
  { id: 12, src: baseImg('port4', 800, 1000), thumb: baseImg('port4', 400, 500), category: 'portrait', title: 'Laughter', aspect: 'portrait' },
];

export const categories = [
  { key: 'all', label: 'All' },
  { key: 'campus', label: 'Campus' },
  { key: 'landscape', label: 'Landscape' },
  { key: 'portrait', label: 'Portrait' },
];
```

- [ ] **Step 2: Create LazyImage component**

```jsx
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
```

- [ ] **Step 3: Create LazyImage styles**

```css
.wrapper {
  position: relative;
  overflow: hidden;
  border-radius: var(--radius-sm);
  background: var(--color-sand);
}

.skeleton {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    110deg,
    var(--color-sand) 30%,
    var(--color-cream) 50%,
    var(--color-sand) 70%
  );
  background-size: 200% 100%;
  animation: shimmer 1.5s ease-in-out infinite;
  transition: opacity 0.4s ease;
}

.skeleton.hidden {
  opacity: 0;
}

.image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0;
  transition: opacity 0.5s ease;
}

.image.visible {
  opacity: 1;
}

@keyframes shimmer {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}
```

- [ ] **Step 4: Verify LazyImage works**

Temporarily import LazyImage in Home.jsx and render a test image. Check DevTools Network tab — image should load only when scrolled into view.
Then revert Home.jsx to stub.

---

### Task 5: Nav Component

**Files:**
- Modify: `src/components/Nav.jsx`
- Create: `src/components/Nav.module.css`

- [ ] **Step 1: Rewrite Nav.jsx with scroll-aware transparency + mobile menu**

```jsx
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './Nav.module.css';

const links = [
  { path: '/portfolio', label: 'Work' },
  { path: '/about', label: 'About' },
  { path: '/contact', label: 'Contact' },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const navBg = isHome && !scrolled && !menuOpen
    ? 'transparent'
    : 'var(--color-cream)';

  return (
    <>
      <nav
        className={styles.nav}
        style={{ background: navBg }}
      >
        <div className={styles.inner}>
          <Link to="/" className={styles.brand}>
            xiziqi
          </Link>

          {/* Desktop links */}
          <div className={styles.desktopLinks}>
            {links.map(({ path, label }) => (
              <Link
                key={path}
                to={path}
                className={`${styles.link} ${location.pathname === path ? styles.active : ''}`}
              >
                {label}
              </Link>
            ))}
          </div>

          {/* Hamburger */}
          <button
            className={`${styles.hamburger} ${menuOpen ? styles.open : ''}`}
            onClick={() => setMenuOpen(prev => !prev)}
            aria-label="Toggle menu"
          >
            <span />
            <span />
          </button>
        </div>
      </nav>

      {/* Mobile overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className={styles.mobileOverlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className={styles.mobileLinks}>
              {links.map(({ path, label }, i) => (
                <motion.div
                  key={path}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link
                    to={path}
                    className={`${styles.mobileLink} ${location.pathname === path ? styles.activeMobile : ''}`}
                    onClick={() => setMenuOpen(false)}
                  >
                    {label}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
```

- [ ] **Step 2: Create Nav.module.css**

```css
.nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  height: var(--nav-height);
  transition: background 0.3s ease;
  border-bottom: 1px solid transparent;
  transition: background 0.3s ease, border-color 0.3s ease;
}

.nav:not([style*="transparent"]) {
  border-bottom-color: var(--color-sand);
}

.inner {
  max-width: var(--max-width);
  margin: 0 auto;
  padding: 0 24px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.brand {
  font-family: var(--font-heading);
  font-size: 1.5rem;
  font-style: italic;
  color: var(--color-forest);
  letter-spacing: 0.5px;
}

.desktopLinks {
  display: flex;
  gap: 32px;
  align-items: center;
}

.link {
  font-size: 0.85rem;
  font-weight: 400;
  color: var(--color-forest);
  text-transform: lowercase;
  letter-spacing: 1px;
  padding: 4px 0;
  border-bottom: 1px solid transparent;
  transition: border-color 0.2s ease;
}

.link:hover,
.active {
  border-bottom-color: var(--color-forest-light);
}

.hamburger {
  display: none;
  flex-direction: column;
  gap: 5px;
  padding: 4px;
  z-index: 1001;
}

.hamburger span {
  display: block;
  width: 24px;
  height: 2px;
  background: var(--color-forest);
  transition: transform 0.3s ease, opacity 0.3s ease;
}

.hamburger.open span:first-child {
  transform: translateY(7px) rotate(45deg);
}

.hamburger.open span:last-child {
  transform: translateY(-7px) rotate(-45deg);
}

.mobileOverlay {
  position: fixed;
  inset: 0;
  z-index: 999;
  background: var(--color-cream);
  display: flex;
  align-items: center;
  justify-content: center;
}

.mobileLinks {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px;
}

.mobileLink {
  font-family: var(--font-heading);
  font-size: 2rem;
  font-style: italic;
  color: var(--color-forest);
  transition: color 0.2s ease;
}

.activeMobile {
  color: var(--color-forest-light);
}

@media (max-width: 768px) {
  .desktopLinks {
    display: none;
  }

  .hamburger {
    display: flex;
  }
}
```

- [ ] **Step 3: Verify navigation**

Run: `npm run dev`
Expected:
- Desktop: nav links visible, click navigates to pages
- Homepage: nav is transparent over content
- Scroll down on any page: nav gets cream background + border
- Mobile (resize < 768px): hamburger appears, desktop links hide
- Click hamburger: full-screen overlay with animated links
- Navigate to new page: menu auto-closes
Then stop the server.

---

### Task 6: Footer Component

**Files:**
- Modify: `src/components/Footer.jsx`
- Create: `src/components/Footer.module.css`

- [ ] **Step 1: Rewrite Footer.jsx**

```jsx
import { Link } from 'react-router-dom';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <Link to="/" className={styles.brand}>
          xiziqi
        </Link>

        <div className={styles.socials}>
          <a href="#" className={styles.socialLink} aria-label="Instagram">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
              <circle cx="12" cy="12" r="5"/>
              <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none"/>
            </svg>
          </a>
          <a href="#" className={styles.socialLink} aria-label="WeChat">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M8 10.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z"/>
              <path d="M14 10.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z"/>
              <path d="M9 13.5c-2.5 0-4.5 1.5-4.5 3.5h9c0-2-2-3.5-4.5-3.5z"/>
              <circle cx="17" cy="12" r="5"/>
            </svg>
          </a>
          <a href="#" className={styles.socialLink} aria-label="Xiaohongshu">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2L2 7l10 5 10-5-10-5z"/>
              <path d="M2 17l10 5 10-5"/>
              <path d="M2 12l10 5 10-5"/>
            </svg>
          </a>
        </div>

        <p className={styles.copy}>
          &copy; {new Date().getFullYear()} Xiziqi. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
```

- [ ] **Step 2: Create Footer.module.css**

```css
.footer {
  border-top: 1px solid var(--color-sand);
  padding: 48px 24px 32px;
  text-align: center;
}

.inner {
  max-width: var(--max-width);
  margin: 0 auto;
}

.brand {
  font-family: var(--font-heading);
  font-size: 1.5rem;
  font-style: italic;
  color: var(--color-forest);
}

.socials {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin: 20px 0;
}

.socialLink {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: var(--color-sand);
  color: var(--color-forest);
  transition: background 0.2s ease, color 0.2s ease;
}

.socialLink:hover {
  background: var(--color-forest);
  color: var(--color-cream);
}

.copy {
  font-size: 0.8rem;
  font-weight: 300;
  color: #999;
}
```

- [ ] **Step 3: Verify footer renders**

Run: `npm run dev`
Expected: Footer appears at bottom of every page with brand name, 3 social icons (circle buttons), copyright line.
Then stop the server.

---

### Task 7: Home Page

**Files:**
- Modify: `src/pages/Home.jsx`
- Create: `src/pages/Home.module.css`

- [ ] **Step 1: Rewrite Home.jsx with full-bleed hero and featured picks**

```jsx
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import LazyImage from '../components/LazyImage';
import { images, categories } from '../data/images';
import styles from './Home.module.css';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: [0.25, 0.1, 0.25, 1] },
});

const featuredCategories = categories.filter(c => c.key !== 'all');
const featuredImages = featuredCategories.map(cat =>
  images.find(img => img.category === cat.key)
).filter(Boolean);

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className={styles.hero}>
        <motion.div className={styles.heroContent} {...fadeUp(0.2)}>
          <h1 className={styles.heroTitle}>Through my lens</h1>
          <p className={styles.heroSubtitle}>
            stories from campus, nature &amp; the human spirit
          </p>
        </motion.div>

        <motion.div
          className={styles.heroStrip}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
        >
          {images.slice(0, 4).map(img => (
            <div key={img.id} className={styles.heroImageWrap}>
              <LazyImage
                src={img.thumb}
                alt={img.title}
                aspectRatio={img.aspect === 'portrait' ? '4/5' : '16/9'}
              />
            </div>
          ))}
        </motion.div>

        <motion.div
          className={styles.scrollHint}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          <span>Scroll</span>
          <div className={styles.scrollLine} />
        </motion.div>
      </section>

      {/* Featured Picks */}
      <section className={styles.featured}>
        <div className="container">
          <motion.h2
            className={styles.sectionTitle}
            {...fadeUp(0.1)}
          >
            Featured Work
          </motion.h2>
          <hr className="section-divider" />

          <div className={styles.featuredGrid}>
            {featuredImages.map((img, i) => (
              <motion.div
                key={img.id}
                className={styles.featuredCard}
                {...fadeUp(0.2 + i * 0.15)}
              >
                <Link
                  to={`/portfolio?category=${img.category}`}
                  className={styles.featuredLink}
                >
                  <LazyImage
                    src={img.thumb}
                    alt={img.title}
                    aspectRatio="4/3"
                  />
                  <div className={styles.featuredLabel}>
                    <span className={styles.featuredCategory}>
                      {categories.find(c => c.key === img.category)?.label}
                    </span>
                    <span className={styles.featuredTitle}>{img.title}</span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
```

- [ ] **Step 2: Create Home.module.css**

```css
/* === Hero === */
.hero {
  position: relative;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: calc(var(--nav-height) + 40px) 24px 60px;
  overflow: hidden;
}

.heroContent {
  text-align: center;
  margin-bottom: 48px;
}

.heroTitle {
  margin-bottom: 8px;
}

.heroSubtitle {
  font-size: 1rem;
  font-weight: 300;
  color: var(--color-forest-light);
  letter-spacing: 2px;
  text-transform: lowercase;
}

/* === Hero image strip === */
.heroStrip {
  display: flex;
  gap: 6px;
  width: 100%;
  max-width: 1000px;
}

.heroImageWrap {
  flex: 1;
  min-width: 0;
}

.heroImageWrap:first-child {
  flex: 1.5;
}

/* === Scroll hint === */
.scrollHint {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  margin-top: 48px;
  font-size: 0.7rem;
  letter-spacing: 3px;
  text-transform: uppercase;
  color: #aaa;
}

.scrollLine {
  width: 1px;
  height: 40px;
  background: linear-gradient(to bottom, var(--color-forest-light), transparent);
  animation: scrollPulse 2s ease-in-out infinite;
}

@keyframes scrollPulse {
  0%, 100% { opacity: 0.3; transform: scaleY(0.6); }
  50% { opacity: 1; transform: scaleY(1); }
}

/* === Featured === */
.featured {
  padding: 80px 0 100px;
}

.sectionTitle {
  text-align: center;
  margin-bottom: 4px;
}

.featuredGrid {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  gap: 16px;
  margin-top: 40px;
}

.featuredCard {
  overflow: hidden;
  border-radius: var(--radius-md);
  transition: transform 0.3s ease;
}

.featuredCard:hover {
  transform: translateY(-4px);
}

.featuredLink {
  display: block;
}

.featuredLabel {
  padding: 16px 8px 0;
}

.featuredCategory {
  display: block;
  font-size: 0.7rem;
  text-transform: uppercase;
  letter-spacing: 2px;
  color: var(--color-forest-light);
}

.featuredTitle {
  display: block;
  font-family: var(--font-heading);
  font-size: 1.2rem;
  font-style: italic;
  color: var(--color-forest);
  margin-top: 2px;
}

@media (max-width: 768px) {
  .heroStrip {
    flex-wrap: wrap;
  }

  .heroImageWrap {
    flex: 0 0 calc(50% - 3px) !important;
  }

  .featuredGrid {
    grid-template-columns: 1fr;
    gap: 32px;
  }
}
```

- [ ] **Step 3: Verify homepage**

Run: `npm run dev`
Expected:
- Hero section: centered tagline in Cormorant Garamond italic, subtitle below
- 4-image strip below the tagline
- Scroll-down indicator animates
- Scroll down: "Featured Work" section with 3 cards (Campus, Landscape, Portrait)
- Cards link to `/portfolio?category=...`
- All images lazy-load with shimmer animation
Then stop the server.

---

### Task 8: Gallery Component

**Files:**
- Create: `src/components/Gallery.jsx`
- Create: `src/components/Gallery.module.css`

- [ ] **Step 1: Create Gallery.jsx**

```jsx
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
```

- [ ] **Step 2: Create Gallery.module.css**

```css
.filterBar {
  display: flex;
  justify-content: center;
  gap: 8px;
  margin-bottom: 40px;
  flex-wrap: wrap;
}

.filterBtn {
  padding: 8px 20px;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 400;
  letter-spacing: 0.5px;
  color: var(--color-charcoal);
  background: var(--color-sand);
  transition: background 0.2s ease, color 0.2s ease;
}

.filterBtn:hover {
  background: var(--color-forest-light);
  color: var(--color-cream);
}

.filterActive {
  background: var(--color-forest);
  color: var(--color-cream);
}

/* === Feature Row === */
.featureRow {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 12px;
  margin-bottom: 12px;
}

.featureMain {
  min-height: 300px;
}

.featureSide {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

/* === Image button === */
.imageBtn {
  display: block;
  width: 100%;
  position: relative;
  overflow: hidden;
  border-radius: var(--radius-sm);
  cursor: pointer;
  background: none;
  border: none;
  padding: 0;
}

.imageOverlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to top,
    rgba(45, 90, 39, 0.6) 0%,
    transparent 50%
  );
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 16px;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.imageBtn:hover .imageOverlay {
  opacity: 1;
}

.imageTitle {
  font-family: var(--font-heading);
  font-size: 1.1rem;
  font-style: italic;
  color: white;
}

.imageCat {
  font-size: 0.7rem;
  text-transform: uppercase;
  letter-spacing: 2px;
  color: rgba(255, 255, 255, 0.8);
}

/* === Grid === */
.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
}

@media (max-width: 768px) {
  .featureRow {
    grid-template-columns: 1fr;
  }

  .grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 480px) {
  .grid {
    grid-template-columns: 1fr;
  }
}
```

- [ ] **Step 3: Verify Gallery**

Temporarily render Gallery in Portfolio page (will be formalized in Task 9).
Run: `npm run dev`, navigate to `/portfolio`
Expected:
- Filter pills: All | Campus | Landscape | Portrait
- Click filter: URL updates (`?category=campus`), images filter with fade animation
- Feature image in large 2:1 slot, 2 smaller side images
- Remaining images in 3-column grid below
- Hover: overlay with title appears
Then stop the server.

---

### Task 9: Portfolio Page + Lightbox Integration

**Files:**
- Modify: `src/pages/Portfolio.jsx`
- Create: `src/pages/Portfolio.module.css`

- [ ] **Step 1: Rewrite Portfolio.jsx**

```jsx
import { useState } from 'react';
import { motion } from 'framer-motion';
import Gallery from '../components/Gallery';
import Lightbox from '../components/Lightbox';
import styles from './Portfolio.module.css';

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] },
};

export default function Portfolio() {
  const [lightboxImage, setLightboxImage] = useState(null);

  return (
    <div className={styles.page}>
      <div className="container">
        <motion.div className={styles.header} {...fadeUp}>
          <h2>Portfolio</h2>
          <hr className="section-divider" />
          <p className={styles.subtitle}>
            A selection of work across campus, landscape, and portrait photography
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <Gallery onImageClick={(img) => setLightboxImage(img)} />
        </motion.div>
      </div>

      {lightboxImage && (
        <Lightbox
          image={lightboxImage}
          onClose={() => setLightboxImage(null)}
        />
      )}
    </div>
  );
}
```

- [ ] **Step 2: Create Portfolio.module.css**

```css
.page {
  padding-top: calc(var(--nav-height) + 60px);
  padding-bottom: 80px;
  min-height: 100vh;
}

.header {
  text-align: center;
  margin-bottom: 48px;
}

.header h2 {
  margin-bottom: 4px;
}

.subtitle {
  font-size: 0.95rem;
  color: #888;
  font-weight: 300;
  margin-top: 16px;
}
```

- [ ] **Step 3: Verify Portfolio page**

Run: `npm run dev`, navigate to `/portfolio`
Expected: Page heading "Portfolio" centered at top. Gallery with filter and feature-lead grid below. Click any image — should trigger lightbox (will error until Task 10).
Then stop the server.

---

### Task 10: Lightbox Component

**Files:**
- Create: `src/components/Lightbox.jsx`
- Create: `src/components/Lightbox.module.css`

- [ ] **Step 1: Create Lightbox.jsx**

```jsx
import { useEffect, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { images } from '../data/images';
import styles from './Lightbox.module.css';

export default function Lightbox({ image, onClose }) {
  const [loaded, setLoaded] = useState(false);
  const currentIndex = images.findIndex(img => img.id === image.id);

  const goTo = useCallback((delta) => {
    const newIndex = (currentIndex + delta + images.length) % images.length;
    // Dispatch custom event since we need to change the image prop
    window.dispatchEvent(new CustomEvent('lightbox-navigate', {
      detail: images[newIndex]
    }));
  }, [currentIndex]);

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

  // Handle navigation event
  useEffect(() => {
    const handler = (e) => {
      setLoaded(false);
      // We use a trick: re-render with new image via parent state
      // This is handled through the onImageClick in parent
    };
    window.addEventListener('lightbox-navigate', handler);
    return () => window.removeEventListener('lightbox-navigate', handler);
  }, []);

  return (
    <motion.div
      className={styles.overlay}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      onClick={onClose}
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
      <motion.div
        className={styles.imageContainer}
        onClick={(e) => e.stopPropagation()}
        key={image.id}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        {!loaded && <div className={styles.spinner} />}
        <img
          src={image.src}
          alt={image.title}
          className={`${styles.image} ${loaded ? styles.loaded : ''}`}
          onLoad={() => setLoaded(true)}
        />

        {/* Caption */}
        <div className={styles.caption}>
          <span className={styles.captionTitle}>{image.title}</span>
          <span className={styles.counter}>
            {currentIndex + 1} / {images.length}
          </span>
        </div>
      </motion.div>
    </motion.div>
  );
}
```

Wait — the navigation logic above is flawed. The `goTo` dispatches an event but the Lightbox still renders the same `image` prop. Let me fix this by using internal state for the current image, initialized from the prop.

**Corrected Lightbox.jsx:**

```jsx
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
```

- [ ] **Step 2: Create Lightbox.module.css**

```css
.overlay {
  position: fixed;
  inset: 0;
  z-index: 2000;
  background: rgba(0, 0, 0, 0.92);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  cursor: zoom-out;
}

.close {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 2001;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  color: white;
  border: none;
  cursor: pointer;
  transition: background 0.2s ease;
}

.close:hover {
  background: rgba(255, 255, 255, 0.2);
}

.arrow {
  position: fixed;
  top: 50%;
  z-index: 2001;
  width: 56px;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  color: white;
  border: none;
  cursor: pointer;
  transition: background 0.2s ease;
  transform: translateY(-50%);
}

.arrow:hover {
  background: rgba(255, 255, 255, 0.2);
}

.prev { left: 16px; }
.next { right: 16px; }

.imageContainer {
  position: relative;
  max-width: 90vw;
  max-height: 85vh;
  cursor: default;
}

.spinner {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 32px;
  height: 32px;
  margin: -16px 0 0 -16px;
  border: 2px solid rgba(255, 255, 255, 0.2);
  border-top-color: white;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

.image {
  max-width: 90vw;
  max-height: 85vh;
  object-fit: contain;
  border-radius: 4px;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.image.loaded {
  opacity: 1;
}

.caption {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 4px 0;
  color: white;
}

.captionTitle {
  font-family: var(--font-heading);
  font-size: 1.1rem;
  font-style: italic;
}

.counter {
  font-size: 0.8rem;
  opacity: 0.5;
  font-weight: 300;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

@media (max-width: 768px) {
  .arrow {
    display: none;
  }

  .close {
    top: 12px;
    right: 12px;
  }
}
```

- [ ] **Step 3: Verify Lightbox**

Run: `npm run dev`, navigate to `/portfolio`, click an image.
Expected:
- Full-screen dark overlay with image centered
- Close button (top-right), prev/next arrows
- Keyboard: Escape closes, Arrow keys navigate
- Caption shows title + "1/12" counter
- Images switch with smooth scale animation
- Mobile: arrows hidden, swipe to navigate
Then stop the server.

---

### Task 11: About Page

**Files:**
- Modify: `src/pages/About.jsx`
- Create: `src/pages/About.module.css`

- [ ] **Step 1: Rewrite About.jsx**

```jsx
import { motion } from 'framer-motion';
import styles from './About.module.css';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay, ease: [0.25, 0.1, 0.25, 1] },
});

export default function About() {
  return (
    <div className={styles.page}>
      <div className="container">
        <motion.div className={styles.header} {...fadeUp(0)}>
          <h2>About Xiziqi</h2>
          <hr className="section-divider" />
        </motion.div>

        <div className={styles.content}>
          <motion.div className={styles.photoCol} {...fadeUp(0.2)}>
            <div className={styles.portrait}>
              {/* Placeholder — replace with your portrait */}
              <div className={styles.portraitPlaceholder}>
                <span>Your<br/>Portrait</span>
              </div>
            </div>
          </motion.div>

          <motion.div className={styles.textCol} {...fadeUp(0.3)}>
            <p className={styles.bio}>
              Hi, I&rsquo;m <strong>[your name]</strong> — a photographer
              based in <strong>[your location]</strong>. I believe every image
              carries a story waiting to be told.
            </p>
            <p className={styles.bio}>
              My lens gravitates toward the quiet poetry of campus life, the
              vastness of natural landscapes, and the unguarded moments that
              reveal who we truly are.
            </p>
            <p className={styles.bio}>
              When I&rsquo;m not behind the camera, you&rsquo;ll find me
              [a personal note about your hobbies or interests].
            </p>

            <div className={styles.meta}>
              <div className={styles.metaItem}>
                <span className={styles.metaIcon}>&#x1F4CD;</span>
                <span className={styles.metaLabel}>Based in</span>
                <span className={styles.metaValue}>[your city]</span>
              </div>
              <div className={styles.metaItem}>
                <span className={styles.metaIcon}>&#x1F4F7;</span>
                <span className={styles.metaLabel}>Gear</span>
                <span className={styles.metaValue}>[your camera / lens]</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Create About.module.css**

```css
.page {
  padding-top: calc(var(--nav-height) + 60px);
  padding-bottom: 80px;
  min-height: 100vh;
}

.header {
  text-align: center;
  margin-bottom: 48px;
}

.header h2 {
  margin-bottom: 4px;
}

.content {
  display: flex;
  gap: 48px;
  align-items: flex-start;
}

.photoCol {
  flex: 0 0 40%;
}

.portrait {
  width: 100%;
  aspect-ratio: 1;
  border-radius: var(--radius-md);
  overflow: hidden;
}

.portraitPlaceholder {
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, var(--color-sand), var(--color-warm-accent));
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-family: var(--font-heading);
  font-size: 1.4rem;
  font-style: italic;
  color: var(--color-forest-light);
  line-height: 1.4;
}

.textCol {
  flex: 1;
}

.bio {
  font-size: 1rem;
  line-height: 1.8;
  color: var(--color-charcoal);
  margin-bottom: 16px;
}

.bio strong {
  color: var(--color-forest);
  font-weight: 700;
}

.meta {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 32px;
  padding-top: 24px;
  border-top: 1px solid var(--color-sand);
}

.metaItem {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.9rem;
}

.metaIcon {
  font-size: 1.1rem;
}

.metaLabel {
  color: #999;
  font-weight: 300;
  min-width: 80px;
}

.metaValue {
  color: var(--color-charcoal);
}

@media (max-width: 768px) {
  .content {
    flex-direction: column;
  }

  .photoCol {
    flex: none;
    max-width: 320px;
    margin: 0 auto;
  }
}
```

- [ ] **Step 3: Verify About page**

Run: `npm run dev`, navigate to `/about`
Expected: Page heading "About Xiziqi" centered, portrait placeholder on left, bio text on right, meta info (location + gear) at bottom. On mobile: stacks vertically.
Then stop the server.

---

### Task 12: Contact Page + ContactForm

**Files:**
- Modify: `src/pages/Contact.jsx`
- Create: `src/pages/Contact.module.css`
- Modify: `src/components/ContactForm.jsx`
- Create: `src/components/ContactForm.module.css`

- [ ] **Step 1: Rewrite Contact.jsx**

```jsx
import { motion } from 'framer-motion';
import ContactForm from '../components/ContactForm';
import styles from './Contact.module.css';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay, ease: [0.25, 0.1, 0.25, 1] },
});

export default function Contact() {
  return (
    <div className={styles.page}>
      <div className="container">
        <motion.div className={styles.header} {...fadeUp(0)}>
          <h2>Get in Touch</h2>
          <hr className="section-divider" />
          <p className={styles.subtitle}>
            Interested in a shoot? Have a collaboration idea? Just want to say
            hello? Drop me a message.
          </p>
        </motion.div>

        <div className={styles.content}>
          <motion.div className={styles.infoCol} {...fadeUp(0.2)}>
            <div className={styles.infoCard}>
              <div className={styles.infoIcon}>&#x2709;</div>
              <div className={styles.infoLabel}>Email</div>
              <div className={styles.infoValue}>your@email.com</div>
            </div>

            <div className={styles.infoCard}>
              <div className={styles.infoIcon}>&#x1F4F1;</div>
              <div className={styles.infoLabel}>Social</div>
              <div className={styles.infoLinks}>
                <a href="#" className={styles.socialLink}>Instagram</a>
                <span className={styles.divider}>&bull;</span>
                <a href="#" className={styles.socialLink}>WeChat</a>
                <span className={styles.divider}>&bull;</span>
                <a href="#" className={styles.socialLink}>Xiaohongshu</a>
              </div>
            </div>

            <p className={styles.responseNote}>
              I typically respond within 24 hours.
            </p>
          </motion.div>

          <motion.div className={styles.formCol} {...fadeUp(0.3)}>
            <ContactForm />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Create Contact.module.css**

```css
.page {
  padding-top: calc(var(--nav-height) + 60px);
  padding-bottom: 80px;
  min-height: 100vh;
}

.header {
  text-align: center;
  margin-bottom: 48px;
}

.header h2 {
  margin-bottom: 4px;
}

.subtitle {
  font-size: 0.95rem;
  color: #888;
  font-weight: 300;
  margin-top: 16px;
  max-width: 500px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.6;
}

.content {
  display: flex;
  gap: 48px;
  align-items: flex-start;
}

.infoCol {
  flex: 0 0 320px;
}

.formCol {
  flex: 1;
}

.infoCard {
  background: var(--color-sand);
  border-radius: var(--radius-sm);
  padding: 24px;
  margin-bottom: 16px;
}

.infoIcon {
  font-size: 1.5rem;
  margin-bottom: 8px;
}

.infoLabel {
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: var(--color-forest-light);
  font-weight: 700;
  margin-bottom: 4px;
}

.infoValue {
  font-size: 1rem;
  color: var(--color-charcoal);
}

.infoLinks {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  align-items: center;
}

.socialLink {
  font-size: 0.95rem;
  color: var(--color-charcoal);
  transition: color 0.2s ease;
}

.socialLink:hover {
  color: var(--color-forest);
}

.divider {
  color: #ccc;
  font-size: 0.7rem;
}

.responseNote {
  font-size: 0.8rem;
  color: #aaa;
  font-weight: 300;
  font-style: italic;
  margin-top: 8px;
}

@media (max-width: 768px) {
  .content {
    flex-direction: column-reverse;
  }

  .infoCol {
    flex: none;
    width: 100%;
  }
}
```

- [ ] **Step 3: Rewrite ContactForm.jsx**

```jsx
import { useState } from 'react';
import styles from './ContactForm.module.css';

export default function ContactForm() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    type: '',
    message: '',
  });

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Placeholder — no backend yet
    alert('Thanks for your message! This form is currently a placeholder. Reach out directly at your@email.com');
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.field}>
        <label className={styles.label} htmlFor="name">Your Name</label>
        <input
          type="text"
          id="name"
          name="name"
          className={styles.input}
          placeholder="How should I call you?"
          value={form.name}
          onChange={handleChange}
        />
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor="email">Email Address</label>
        <input
          type="email"
          id="email"
          name="email"
          className={styles.input}
          placeholder="your@email.com"
          value={form.email}
          onChange={handleChange}
        />
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor="type">Shoot Type</label>
        <select
          id="type"
          name="type"
          className={styles.input}
          value={form.type}
          onChange={handleChange}
        >
          <option value="">Select a type...</option>
          <option value="campus">Campus</option>
          <option value="landscape">Landscape</option>
          <option value="portrait">Portrait</option>
          <option value="other">Other</option>
        </select>
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor="message">Message</label>
        <textarea
          id="message"
          name="message"
          className={styles.textarea}
          placeholder="Tell me about your vision..."
          rows={4}
          value={form.message}
          onChange={handleChange}
        />
      </div>

      <button type="submit" className={styles.submit}>
        Send Message
      </button>
    </form>
  );
}
```

- [ ] **Step 4: Create ContactForm.module.css**

```css
.form {
  background: white;
  border-radius: var(--radius-md);
  padding: 32px;
  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.04);
}

.field {
  margin-bottom: 20px;
}

.label {
  display: block;
  font-size: 0.8rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: var(--color-forest-light);
  margin-bottom: 6px;
}

.input,
.textarea {
  width: 100%;
  padding: 12px 16px;
  border: 1px solid var(--color-sand);
  border-radius: var(--radius-sm);
  font-family: var(--font-body);
  font-size: 0.95rem;
  color: var(--color-charcoal);
  background: var(--color-cream);
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
  outline: none;
}

.input:focus,
.textarea:focus {
  border-color: var(--color-forest-light);
  box-shadow: 0 0 0 3px rgba(107, 155, 99, 0.15);
}

.input::placeholder,
.textarea::placeholder {
  color: #ccc;
}

.textarea {
  resize: vertical;
  min-height: 100px;
}

.submit {
  width: 100%;
  padding: 14px;
  background: var(--color-forest);
  color: white;
  font-family: var(--font-body);
  font-size: 0.95rem;
  font-weight: 700;
  letter-spacing: 0.5px;
  border: none;
  border-radius: var(--radius-sm);
  cursor: pointer;
  transition: background 0.2s ease, transform 0.1s ease;
}

.submit:hover {
  background: var(--color-forest-light);
}

.submit:active {
  transform: scale(0.98);
}
```

- [ ] **Step 5: Verify Contact page**

Run: `npm run dev`, navigate to `/contact`
Expected:
- Page heading "Get in Touch" with subtitle
- Left column: Email card, Social card, response note
- Right column: White form card with Name, Email, Shoot Type (dropdown), Message (textarea), Send button
- Click Send: alert shows placeholder message
- Mobile: form on top, info cards below
Then stop the server.

---

### Task 13: Page Transitions & Polish

**Files:**
- Modify: `src/App.jsx` (already has AnimatePresence wrapper from Task 3 — verify it works)
- Modify: `src/styles/global.css` (add page transition keyframes)
- Modify: `src/pages/Home.jsx` (ensure exit animation)
- Modify: `src/pages/Portfolio.jsx` (ensure exit animation)
- Modify: `src/pages/About.jsx` (ensure exit animation)
- Modify: `src/pages/Contact.jsx` (ensure exit animation)

- [ ] **Step 1: Add page transition styles to global.css**

Append to `src/styles/global.css`:

```css
/* === Page transitions === */
.page-enter {
  opacity: 0;
  transform: translateY(12px);
}

.page-enter-active {
  opacity: 1;
  transform: translateY(0);
  transition: opacity 0.4s ease, transform 0.4s ease;
}

.page-exit {
  opacity: 1;
}

.page-exit-active {
  opacity: 0;
  transition: opacity 0.25s ease;
}
```

- [ ] **Step 2: Verify all page transitions work**

Run: `npm run dev`
Expected:
- Navigate between pages: content fades in with slight upward slide
- Previous page fades out smoothly
- No layout jumps during transitions
- URLs update correctly
- Browser back/forward works as expected

- [ ] **Step 3: Final review — verify the complete checklist**

Go through every page at desktop and mobile widths:
- [ ] Home: hero, image strip, scroll hint, featured picks, links work
- [ ] Portfolio: filter pills work, grid renders, click opens lightbox
- [ ] Lightbox: prev/next, keyboard, close, caption, counter
- [ ] About: layout, placeholder text, responsive stack
- [ ] Contact: cards + form, submit alert
- [ ] Nav: transparent on home → solid on scroll, mobile hamburger
- [ ] Footer: present on all pages, social icon hover effects
- [ ] No console errors

- [ ] **Step 4: Build for production**

Run: `npm run build`
Expected: Build completes without errors. Output in `dist/` folder.
Run: `npm run preview` to verify production build.
Then stop the server.

---

## Dependencies Between Tasks

```
Task 1 (Scaffold)
  └─> Task 2 (Global Styles)
        └─> Task 3 (App Shell)
              ├─> Task 4 (Images + LazyImage)
              ├─> Task 5 (Nav)
              ├─> Task 6 (Footer)
              ├─> Task 7 (Home Page) ── depends on Task 4
              ├─> Task 8 (Gallery)    ── depends on Task 4
              ├─> Task 9 (Portfolio)  ── depends on Task 8
              ├─> Task 10 (Lightbox)  ── depends on Task 9
              ├─> Task 11 (About)
              ├─> Task 12 (Contact)
              └─> Task 13 (Polish)    ── depends on all
```

Tasks 4, 5, 6, 11, 12 can run in parallel after Task 3.
Tasks 8→9→10 are a sequential chain.
Task 13 is the final pass.
