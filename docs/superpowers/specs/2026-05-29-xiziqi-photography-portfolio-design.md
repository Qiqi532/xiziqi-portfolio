# Xiziqi Photography Portfolio — Design Spec

**Date:** 2026-05-29
**Status:** Approved

---

## Overview

Personal photography portfolio website for **Xiziqi**, showcasing campus, landscape, and portrait photography. Dual purpose: attract clients for bookings AND express personal photographic vision.

## Brand

- **Name:** Xiziqi
- **Language:** English
- **Tone:** Artistic, warm, approachable yet refined

---

## Technical Architecture

### Stack

| Layer | Choice |
|-------|--------|
| Framework | React 18 + Vite |
| Routing | react-router-dom v6 |
| Animations | framer-motion (page transitions, scroll reveals) |
| Styling | CSS Modules + CSS custom properties |
| Deployment | Static export (any static host) |

### Project Structure

```
Photographer/
├── index.html
├── package.json
├── vite.config.js
├── public/
│   └── images/
│       ├── campus/        # Campus photos (user fills)
│       ├── landscape/     # Landscape photos (user fills)
│       └── portrait/      # Portrait photos (user fills)
└── src/
    ├── main.jsx
    ├── App.jsx
    ├── styles/
    │   └── global.css
    ├── components/
    │   ├── Nav.jsx            # Transparent overlay → solid on scroll
    │   ├── Footer.jsx         # Centered, brand + social icons
    │   ├── Gallery.jsx        # Feature-lead grid + category filter
    │   ├── LazyImage.jsx      # Intersection Observer lazy loading
    │   ├── Lightbox.jsx       # Full-screen photo viewer + prev/next
    │   └── ContactForm.jsx    # Contact form (placeholder, no backend)
    └── pages/
        ├── Home.jsx           # Full-bleed hero + featured picks
        ├── Portfolio.jsx      # Gallery + ?category= filter
        ├── About.jsx          # Photo + bio + location/gear
        └── Contact.jsx        # Contact cards + form
```

### Routes

| Path | Page | Notes |
|------|------|-------|
| `/` | Home | Full-bleed hero + 3 featured picks |
| `/portfolio` | Portfolio | Default: all. `?category=campus\|landscape\|portrait` for filter |
| `/about` | About | Portrait photo + bio text |
| `/contact` | Contact | Contact info cards + inquiry form |

---

## Visual Design

### Color Palette

| Token | Hex | Usage |
|-------|-----|-------|
| Forest | `#2D5A27` | Headings, accents, active nav |
| Warm Cream | `#F5EFE6` | Page background |
| Sand | `#E8DDD0` | Cards, section backgrounds |
| Charcoal | `#3A3A3A` | Body text |
| Warm Accent | `#E8C4A0` | Links, hover states, subtle highlights |

### Typography

| Role | Font | Style |
|------|------|-------|
| Headings | Cormorant Garamond | Italic, 400–600 weight |
| Body | Lato | Regular 400, Light 300 |
| Accent labels | Lato | Uppercase, letter-spacing |

Both loaded from Google Fonts.

### Visual Texture
- Subtle CSS noise/grain overlay on hero backgrounds
- Rounded corners (8–12px) on cards and images
- Soft gradient washes in section transitions
- Organic, breathing spacing (generous padding, not cramped)

---

## Page Designs

### Navigation (All Pages)
- **Desktop:** Transparent overlay on homepage hero → transitions to solid `#F5EFE6` background on scroll (detected via Intersection Observer). Brand name (italic Cormorant Garamond) on left, nav links (Lato) on right.
- **Mobile:** Hamburger icon → full-screen overlay menu with fade-in animation. Links stacked vertically in Cormorant Garamond italic.
- **Active state:** Current page link highlighted in Forest green with subtle underline.

### Home Page
- **Hero:** Full-bleed panoramic image strip spanning screen width. Tagline "Through my lens" centered above in Cormorant Garamond italic. Subtitle "stories from campus, nature & the human spirit" below in Lato. Scroll-down indicator at bottom.
- **Below fold:** 3 featured project cards (one per category) in asymmetric 2+1 grid. Each card: image + category label + brief description. Click navigates to `/portfolio?category=...`.
- **Footer:** Simple centered footer with brand name, social icons, copyright.

### Portfolio Page
- **Filter bar:** Centered pill/tab style — "All | Campus | Landscape | Portrait". Active category underlined in Forest green. Filtering animates with Framer Motion layout transitions.
- **Grid:** Feature-lead layout. Top section: one large (2:1 ratio) hero image + 2 smaller side images. Below: 3-column grid of thumbnails. All images use `LazyImage` component.
- **Click behavior:** Opens `Lightbox` with full-resolution view, prev/next navigation, close button.

### About Page
- **Layout:** Two-column (stacks on mobile). Left: large portrait photo (square, rounded corners). Right: bio text in Lato, location + gear info below. Centered "About Xiziqi" heading with decorative divider line.
- **Content placeholders:** Name, location, bio paragraphs, camera gear — all marked with `[placeholder]` text.

### Contact Page
- **Layout:** Two-column (stacks on mobile). Left: contact info cards (email, social media) in Sand-colored cards. Right: inquiry form in white card with rounded corners.
- **Form fields:** Name, Email, Shoot Type (dropdown), Message (textarea). Send button in Forest green. Form is static — no backend, ready for future integration.
- **Social links:** Instagram, WeChat, Xiaohongshu — icon + handle placeholders.

### Footer (All Pages)
- Centered layout with subtle top border in Sand.
- Brand name "xiziqi" in Cormorant Garamond italic.
- Social icon row (simple SVG icons).
- Copyright line in Lato light.

---

## Key Components

### LazyImage
- Intersection Observer-based lazy loading.
- Shows skeleton/color-wash placeholder while loading.
- Smooth fade-in on load complete.
- Supports `aspectRatio` prop for preventing layout shift.

### Lightbox
- Full-screen overlay with dark semi-transparent backdrop.
- Image centered with max dimensions.
- Previous/Next arrow buttons (large touch targets).
- Close button + Escape key + click-outside to dismiss.
- Swipe support on mobile (touch events).

### Gallery
- Category filter with animated layout transitions (framer-motion `AnimatePresence` + `layout`).
- Feature-lead grid: first image larger, rest in uniform grid.
- Props: `images[]`, `activeCategory`, `onCategoryChange`.

### Nav
- `position: fixed` with transparent → solid background transition.
- Scroll detection via a sentinel element and Intersection Observer.
- Mobile hamburger with animated overlay (framer-motion).

---

## Responsive Behavior

| Breakpoint | Behavior |
|------------|----------|
| ≥ 1024px | Full desktop layout with multi-column grids |
| 768–1023px | Tablet: 2-column grids, reduced padding |
| < 768px | Mobile: single column, hamburger menu, stacked layouts |

---

## What's NOT in Scope
- Backend / form submission handling
- CMS or admin panel
- Image optimization pipeline (manual upload to `public/images/`)
- SEO meta tags (can be added later)
- Analytics
- Multi-language support
