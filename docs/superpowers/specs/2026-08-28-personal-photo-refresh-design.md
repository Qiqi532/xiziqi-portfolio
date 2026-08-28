# Personal Photo Refresh Design

**Date:** 2026-08-28  
**Status:** Approved for specification review

## Goal

Refresh the homepage lifestyle carousel with five landscape photographs and add a personal-photo category to the photography portfolio without changing the approved A-layout or the About page.

## Homepage carousel

- Use exactly five slides in this order: Shanghai, Quanzhou, Hangzhou, Great Wall, Beijing.
- Source the slides from `intro/pic/上海.jpg`, `泉州.jpg`, `杭州.jpg`, `长城.jpg`, and `北京.jpg`.
- All five source files are landscape images. The homepage must not use a portrait slide or the blurred-background portrait treatment.
- Remove Hong Kong from the homepage carousel. Keep its optimized image available for the personal-photo portfolio category.
- Preserve the current autoplay, manual controls, accessibility labels, pause behavior, and responsive frame.
- Prepare optimized web copies under `public/images/profile/`; runtime code must not read from `intro/`.

## Photography portfolio

- Add a fourth visible category named `个人照` alongside `校园`, `风光`, and `人像`.
- Populate it with personal-life photographs that are not part of the existing photography categories: coast, photonics conference, National Games, Nanjing, Hong Kong, fieldwork, basketball, and Disney.
- Reuse approved optimized profile assets where possible and add an optimized Disney asset.
- Exclude the ID photo from the portfolio.
- Personal-photo records must preserve their real landscape or portrait aspect so the existing gallery can lay them out without stretching.
- The lightbox must continue to work for the new category.

## Page boundaries

- Keep the homepage structure, copy, research summaries, practice summaries, and contact block unchanged.
- Keep the About page and its existing personal gallery unchanged.
- Do not add new network calls, analytics, or third-party image dependencies.

## Data and implementation

- Keep homepage slide metadata in `src/data/siteContent.js`.
- Extend `src/data/images.js` with personal-photo records and a `personal` category label.
- Extend the existing asset preparation script instead of manually maintaining duplicate image-processing logic.
- Reuse the existing `HeroCarousel`, `Gallery`, and `Lightbox` components; no new page or carousel component is required.

## Verification

- Data tests verify the five-slide order and confirm that Hong Kong is absent from the homepage.
- Portfolio tests verify that the `个人照` filter is visible and that the ID photo is not included.
- Run the full Vitest suite and Vite production build.
- Visually check homepage desktop/mobile framing and the personal-photo filter/gallery.
- Deploy to GitHub Pages and verify the current JS/CSS bundle plus representative Shanghai, Beijing, Hong Kong, and Disney assets online.

