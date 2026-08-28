# Personal Photo Refresh Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the homepage carousel with five landscape city/travel photographs and add a personal-photo category to the photography portfolio.

**Architecture:** Keep the approved page composition and existing carousel/gallery components. Extend the asset preparation map, update the static content records, and expose the optimized personal photos through the existing filter and lightbox data flow.

**Tech Stack:** Vite 5, React 18, React Router 6, CSS Modules, Vitest, Testing Library, Pillow, GitHub Pages.

---

## File map

| Path | Responsibility |
|---|---|
| `scripts/prepare_personal_site_assets.py` | Prepare Shanghai and Beijing hero assets plus the Disney gallery asset. |
| `public/images/profile/hero-shanghai.jpg` | New landscape Shanghai carousel image. |
| `public/images/profile/hero-beijing.jpg` | New landscape Beijing carousel image. |
| `public/images/profile/gallery/15-disney.jpg` | New personal-photo portfolio asset. |
| `src/data/siteContent.js` | Define the exact five-slide carousel order. |
| `src/data/siteContent.test.js` | Verify slide order, landscape-only fit, and Hong Kong removal. |
| `src/data/images.js` | Add personal-photo records and the `personal` category. |
| `src/data/images.test.js` | Verify personal-photo contents, aspects, and ID-photo exclusion. |
| `src/pages/Portfolio.test.jsx` | Verify the new visible filter. |

### Task 1: Lock the homepage carousel contract

**Files:**
- Modify: `src/data/siteContent.test.js`
- Modify: `src/data/siteContent.js`

- [ ] **Step 1: Write the failing carousel test**

Replace the current location assertion and add landscape-fit checks:

```js
expect(heroSlides.map(({ location }) => location)).toEqual([
  '上海',
  '泉州',
  '杭州',
  '长城',
  '北京',
]);
expect(heroSlides.every(({ fit }) => fit === 'cover')).toBe(true);
expect(heroSlides.some(({ location }) => location === '香港')).toBe(false);
expect(heroSlides.every(({ src }) => !src.includes('id-photo'))).toBe(true);
```

- [ ] **Step 2: Run the targeted test and verify failure**

Run: `npm test -- src/data/siteContent.test.js`

Expected: FAIL because the current locations are `泉州`, `香港`, `长城`, and `杭州`.

- [ ] **Step 3: Implement the five landscape slides**

Replace `heroSlides` in `src/data/siteContent.js` with:

```js
export const heroSlides = [
  { src: profileImage('hero-shanghai.jpg'), alt: '黄新宏在上海旅行', location: '上海', position: '50% 48%', fit: 'cover' },
  { src: profileImage('hero-quanzhou.jpg'), alt: '黄新宏在泉州湖边', location: '泉州', position: '50% 42%', fit: 'cover' },
  { src: profileImage('hero-hangzhou.jpg'), alt: '黄新宏在杭州旅行', location: '杭州', position: '50% 46%', fit: 'cover' },
  { src: profileImage('hero-great-wall.jpg'), alt: '黄新宏在长城旅行', location: '长城', position: '50% 38%', fit: 'cover' },
  { src: profileImage('hero-beijing.jpg'), alt: '黄新宏在北京旅行', location: '北京', position: '50% 44%', fit: 'cover' },
];
```

- [ ] **Step 4: Run the targeted test**

Run: `npm test -- src/data/siteContent.test.js`

Expected: PASS.

- [ ] **Step 5: Commit the carousel data change**

```bash
git add src/data/siteContent.js src/data/siteContent.test.js
git commit -m "feat(home): refresh landscape carousel"
```

### Task 2: Prepare the new optimized assets

**Files:**
- Modify: `scripts/prepare_personal_site_assets.py`
- Create: `public/images/profile/hero-shanghai.jpg`
- Create: `public/images/profile/hero-beijing.jpg`
- Create: `public/images/profile/gallery/15-disney.jpg`

- [ ] **Step 1: Update the asset maps**

Set the hero map to the five approved landscape sources:

```python
HERO_IMAGES = {
    "上海.jpg": "hero-shanghai.jpg",
    "泉州.jpg": "hero-quanzhou.jpg",
    "杭州.jpg": "hero-hangzhou.jpg",
    "长城.jpg": "hero-great-wall.jpg",
    "北京.jpg": "hero-beijing.jpg",
}
```

Add the Disney source to `GALLERY_IMAGES`:

```python
"迪士尼.jpg": "gallery/15-disney.jpg",
```

- [ ] **Step 2: Generate the optimized files**

Run: `python scripts/prepare_personal_site_assets.py`

Expected: exit 0 and `Prepared personal homepage assets`.

- [ ] **Step 3: Verify files and dimensions**

Run:

```powershell
Get-Item public/images/profile/hero-shanghai.jpg,public/images/profile/hero-beijing.jpg,public/images/profile/gallery/15-disney.jpg | Select-Object Name,Length
```

Expected: all three files exist and have non-zero lengths.

- [ ] **Step 4: Commit prepared assets**

```bash
git add scripts/prepare_personal_site_assets.py public/images/profile/hero-shanghai.jpg public/images/profile/hero-beijing.jpg public/images/profile/gallery/15-disney.jpg
git commit -m "feat(content): prepare refreshed personal photos"
```

### Task 3: Add the personal-photo portfolio category

**Files:**
- Create: `src/data/images.test.js`
- Modify: `src/data/images.js`
- Modify: `src/pages/Portfolio.test.jsx`

- [ ] **Step 1: Write failing data tests**

Create `src/data/images.test.js`:

```js
import { describe, expect, it } from 'vitest';
import { categories, images } from './images';

describe('photography portfolio data', () => {
  it('offers a personal-photo category without an ID photo', () => {
    expect(categories).toContainEqual({ key: 'personal', label: '个人照' });

    const personalPhotos = images.filter(({ category }) => category === 'personal');
    expect(personalPhotos).toHaveLength(10);
    expect(personalPhotos.some(({ src }) => src.includes('14-hong-kong.jpg'))).toBe(true);
    expect(personalPhotos.some(({ src }) => src.includes('15-disney.jpg'))).toBe(true);
    expect(personalPhotos.every(({ src }) => !src.includes('id-photo'))).toBe(true);
  });

  it('preserves portrait and landscape aspect metadata', () => {
    const personalPhotos = images.filter(({ category }) => category === 'personal');
    expect(personalPhotos.some(({ aspect }) => aspect === 'portrait')).toBe(true);
    expect(personalPhotos.some(({ aspect }) => aspect === 'landscape')).toBe(true);
  });
});
```

Add to `src/pages/Portfolio.test.jsx`:

```js
expect(screen.getByRole('button', { name: '个人照' })).toBeInTheDocument();
```

- [ ] **Step 2: Run the targeted tests and verify failure**

Run: `npm test -- src/data/images.test.js src/pages/Portfolio.test.jsx`

Expected: FAIL because the category and records do not exist.

- [ ] **Step 3: Add explicit personal-photo records**

Add to `src/data/images.js` after `portraitFiles`:

```js
const personalPhotos = [
  { file: '15-disney.jpg', title: '迪士尼旅途', aspect: 'landscape' },
  { file: '03-photonics-conference.jpg', title: '光电会议', aspect: 'landscape' },
  { file: '08-nanjing.jpg', title: '南京夜色', aspect: 'landscape' },
  { file: '05-national-games.jpg', title: '全运会现场', aspect: 'landscape' },
  { file: '06-national-games.jpg', title: '志愿者合影', aspect: 'landscape' },
  { file: '10-fieldwork.jpg', title: '田野记录', aspect: 'landscape' },
  { file: '01-coast.jpg', title: '海边日落', aspect: 'portrait' },
  { file: '04-national-games.jpg', title: '志愿服务', aspect: 'portrait' },
  { file: '11-basketball.jpg', title: '篮球赛场', aspect: 'portrait' },
  { file: '14-hong-kong.jpg', title: '香港街头', aspect: 'portrait' },
];
```

Add the category label:

```js
personal: '个人照',
```

Add a focused mapping function:

```js
function makePersonalImages(photos, startId) {
  return photos.map(({ file, title, aspect }, index) => ({
    id: startId + index,
    src: `${base}/profile/gallery/${file}`,
    thumb: `${base}/profile/gallery/${file}`,
    category: 'personal',
    title,
    aspect,
  }));
}
```

Append records and filter metadata:

```js
export const images = [
  ...makeImages(campusFiles, 'campus', 1),
  ...makeImages(landscapeFiles, 'landscape', 100),
  ...makeImages(portraitFiles, 'portrait', 200),
  ...makePersonalImages(personalPhotos, 300),
];

export const categories = [
  { key: 'all', label: '全部' },
  { key: 'campus', label: '校园' },
  { key: 'landscape', label: '风光' },
  { key: 'portrait', label: '人像' },
  { key: 'personal', label: '个人照' },
];
```

- [ ] **Step 4: Run the targeted tests**

Run: `npm test -- src/data/images.test.js src/pages/Portfolio.test.jsx`

Expected: PASS.

- [ ] **Step 5: Commit the portfolio data change**

```bash
git add src/data/images.js src/data/images.test.js src/pages/Portfolio.test.jsx
git commit -m "feat(portfolio): add personal photo category"
```

### Task 4: Review, verify, and deploy

**Files:**
- Review: all files changed in Tasks 1–3
- Generated: `dist/`

- [ ] **Step 1: Simplify only the new code**

Review the new records and mapping function for duplicated paths, unclear names, or unnecessary component changes. Do not refactor unrelated gallery or carousel behavior.

- [ ] **Step 2: Run the full test suite**

Run: `npm test`

Expected: all test files and tests pass with zero failures.

- [ ] **Step 3: Build the production site**

Run: `npm run build`

Expected: Vite exits 0 and generates matching `dist/index.html` and `dist/404.html`.

- [ ] **Step 4: Visually verify the local production build**

Run: `npm run preview -- --host 127.0.0.1`

Check:

- Homepage shows five landscape slides in the approved order with no Hong Kong slide.
- Desktop and mobile carousel frames do not stretch or letterbox images.
- Photography page exposes `个人照` and opens its landscape and portrait photos in the lightbox.
- No ID photo appears in the personal-photo category.

- [ ] **Step 5: Push source and deploy GitHub Pages**

```bash
git push origin master
npm run deploy
```

Expected: source push succeeds and the deployment command prints `Published`.

- [ ] **Step 6: Verify the public deployment**

Request the public homepage, portfolio route, current JS/CSS assets, and these representative images:

```text
images/profile/hero-shanghai.jpg
images/profile/hero-beijing.jpg
images/profile/gallery/14-hong-kong.jpg
images/profile/gallery/15-disney.jpg
```

Expected: homepage and assets return the newly deployed bundle/content; representative images return HTTP 200.
