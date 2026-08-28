# Personal Homepage Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Convert the existing photography portfolio into a bright, science-oriented personal homepage with research, practice, photography, and about sections while preserving the existing portfolio experience.

**Architecture:** Keep the Vite/React single-page application and GitHub Pages base path. Move all personal copy and curated records into one static data module, build Research and Practice as dedicated pages, and use a long-form Home page as the entry point. Keep photography data and gallery interactions separate from personal-profile content; remove the guestbook and Supabase client entirely.

**Tech Stack:** React 18, React Router 6, Framer Motion, Vite 5, CSS Modules, Vitest, React Testing Library.

---

## File structure

| File | Responsibility |
|---|---|
| `src/data/siteContent.js` | Approved public profile, research, practice, contact, and selected personal-image metadata. |
| `src/pages/Research.jsx` + `Research.module.css` | Research projects, publications, competitions, and skills. |
| `src/pages/Practice.jsx` + `Practice.module.css` | Campus communication, volunteering, social practice, and representative outcomes. |
| `src/pages/Home.jsx` + `Home.module.css` | Long-form homepage, linking to all three subject pages. |
| `src/pages/About.jsx` + `About.module.css` | Short biography, selected personal images, and a mail link; no guestbook. |
| `src/components/Nav.jsx` + `Nav.module.css` | Five-route navigation and accessible mobile menu. |
| `src/components/Footer.jsx` + `Footer.module.css` | Accurate name, copyright, and approved contact link. |
| `src/App.jsx` | Route definitions, including the legacy `/contact` redirect. |
| `src/styles/global.css` | Laboratory-cool-gray design tokens and global typography/focus rules. |
| `src/test/setup.js`, `src/**/*.test.jsx` | Route, navigation, rendering, and no-guestbook regression tests. |

## Material intake rules

- Treat `intro/科研.pdf`, `intro/实习.pdf`, `intro/黄新宏-开放日汇报PPT.pptx`, and `intro/中山大学-黄新宏 - 线下交流.pptx` as source material, not public assets.
- Inspect every PPT slide before using it. Extract only claims the user approves as public, then write concise web copy in `src/data/siteContent.js`.
- Copy only user-approved images into `public/images/profile/` using descriptive ASCII filenames. Do not expose certificate scans, PPT exports, phone number, WeChat, birth date, place of origin, GPA, ranking, or detailed course grades.
- Preserve the existing `public/images/{campus,landscape,portrait}/` photography collection and its URL encoding behavior.

### Task 1: Audit and curate the new source materials

**Files:**
- Create: `docs/content-audit-2026-08-28.md`
- Create: `public/images/profile/` (selected files only)
- Modify: `src/data/siteContent.js` (created in Task 2)

- [ ] **Step 1: Inspect every source document and slide before copying content.**

  Use the PDF workflow for both PDFs and the presentation workflow for both PPTX files. Create `docs/content-audit-2026-08-28.md` with this exact table structure:

  ```markdown
  | Source | Slide/page | Public web claim | Destination | Approval status |
  |---|---:|---|---|---|
  | 科研.pdf | 1 | 光纤温盐传感项目负责人 | Research project card | approved |
  ```

- [ ] **Step 2: Make the public-content decision explicit.**

  Include these exclusions at the top of the audit document:

  ```markdown
  ## Never publish
  - Phone number, WeChat ID, birth date, place of origin
  - GPA, rank, course scores, certificate scans
  - Unapproved PPT figures, laboratory data, collaborator information, or audience photographs
  ```

- [ ] **Step 3: Curate assets without touching the original `intro/` files.**

  Copy at most one hero image, two practice images, and three personal-slice images into `public/images/profile/`. Use names such as `hero-portrait.jpg`, `practice-science-outreach.jpg`, and `life-conference.jpg`; record each source path and approved alt text in the audit table.

- [ ] **Step 4: Review the audit with the user before implementation uses any new claim or photo.**

  Expected outcome: every row intended for the site is marked `approved`; no unapproved material is copied into `public/`.

- [ ] **Step 5: Commit the approved content audit and assets.**

  ```bash
  git add docs/content-audit-2026-08-28.md public/images/profile
  git commit -m "docs(content): audit personal homepage materials"
  ```

### Task 2: Establish data and test foundations

**Files:**
- Modify: `package.json`
- Create: `vite.config.js` test configuration
- Create: `src/test/setup.js`
- Create: `src/data/siteContent.js`
- Create: `src/data/siteContent.test.js`

- [ ] **Step 1: Add the test runner and DOM testing dependencies.**

  ```bash
  npm install --save-dev vitest jsdom @testing-library/react @testing-library/jest-dom
  ```

  Add scripts:

  ```json
  "test": "vitest run",
  "test:watch": "vitest"
  ```

- [ ] **Step 2: Configure Vitest in `vite.config.js`.**

  ```js
  test: {
    environment: 'jsdom',
    setupFiles: './src/test/setup.js',
    globals: true,
  }
  ```

  Create `src/test/setup.js`:

  ```js
  import '@testing-library/jest-dom/vitest';
  ```

- [ ] **Step 3: Write the failing content-contract test.**

  ```js
  import { describe, expect, it } from 'vitest';
  import { profile, researchProjects, practiceHighlights } from './siteContent';

  describe('public homepage content', () => {
    it('contains two research projects and public-safe profile fields', () => {
      expect(researchProjects).toHaveLength(2);
      expect(practiceHighlights.length).toBeGreaterThan(0);
      expect(profile).not.toHaveProperty('phone');
      expect(profile).not.toHaveProperty('wechat');
    });
  });
  ```

- [ ] **Step 4: Run the test and verify it fails because the module does not exist.**

  ```bash
  npm test -- src/data/siteContent.test.js
  ```

  Expected: failure resolving `./siteContent`.

- [ ] **Step 5: Create the static content module.**

  Export `profile`, `researchProjects`, `publications`, `practiceHighlights`, `selectedPhotography`, and `personalMoments`. Use only approved audit rows and this interface shape:

  ```js
  export const researchProjects = [{
    id: 'optical-sensing',
    label: 'R-01',
    title: '光纤温盐传感',
    summary: '...',
    status: '已完成',
    href: '/research#optical-sensing',
  }];
  ```

- [ ] **Step 6: Run the content test and commit the foundation.**

  ```bash
  npm test -- src/data/siteContent.test.js
  git add package.json package-lock.json vite.config.js src/test/setup.js src/data/siteContent.js src/data/siteContent.test.js
  git commit -m "feat(content): add public profile data foundation"
  ```

### Task 3: Replace global visual tokens and route shell

**Files:**
- Modify: `src/styles/global.css`
- Modify: `src/App.jsx`
- Modify: `src/components/Nav.jsx`
- Modify: `src/components/Nav.module.css`
- Modify: `src/components/Footer.jsx`
- Modify: `src/components/Footer.module.css`
- Create: `src/App.test.jsx`

- [ ] **Step 1: Write failing route and navigation tests.**

  Test that `主页`, `研究学习`, `个人实践`, `摄影`, and `关于` are rendered in the navigation, and that `/contact` redirects to `/about`.

  ```jsx
  expect(screen.getByRole('link', { name: '研究学习' })).toHaveAttribute('href', '/research');
  expect(screen.queryByText('Guestbook')).not.toBeInTheDocument();
  ```

- [ ] **Step 2: Run the test and confirm the old two-link navigation fails it.**

  ```bash
  npm test -- src/App.test.jsx
  ```

- [ ] **Step 3: Implement cool-gray global tokens and focus styling.**

  Replace the forest/cream palette with:

  ```css
  :root {
    --color-ink: #17242c;
    --color-text: #34434b;
    --color-accent: #587383;
    --color-mist: #dfe9ed;
    --color-fog: #edf2f4;
    --color-paper: #f8fafb;
    --color-line: #d1dce0;
  }

  :focus-visible { outline: 2px solid var(--color-accent); outline-offset: 3px; }
  ```

- [ ] **Step 4: Add `/research` and `/practice` routes, keep `/portfolio` and `/about`, and retain `/contact` as a redirect.**

  Register the new page components in `src/App.jsx`; remove the `Contact` page import. Update navigation and mobile overlay to use the five confirmed Chinese labels.

- [ ] **Step 5: Update the footer.**

  Replace placeholder social links and photography-only branding with the public display name and a single approved mail link. Do not render WeChat or placeholder `href="#"` links.

- [ ] **Step 6: Run route tests, build, and commit.**

  ```bash
  npm test -- src/App.test.jsx
  npm run build
  git add src/App.jsx src/styles/global.css src/components/Nav.jsx src/components/Nav.module.css src/components/Footer.jsx src/components/Footer.module.css src/App.test.jsx
  git commit -m "feat(shell): add personal homepage navigation"
  ```

### Task 4: Build Research and Practice pages

**Files:**
- Create: `src/pages/Research.jsx`
- Create: `src/pages/Research.module.css`
- Create: `src/pages/Practice.jsx`
- Create: `src/pages/Practice.module.css`
- Create: `src/pages/Research.test.jsx`
- Create: `src/pages/Practice.test.jsx`

- [ ] **Step 1: Write failing page tests.**

  ```jsx
  expect(screen.getByRole('heading', { name: '研究学习' })).toBeInTheDocument();
  expect(screen.getByText('光纤温盐传感')).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: '个人实践' })).toBeInTheDocument();
  ```

- [ ] **Step 2: Run both tests and verify they fail because pages are absent.**

  ```bash
  npm test -- src/pages/Research.test.jsx src/pages/Practice.test.jsx
  ```

- [ ] **Step 3: Implement `Research`.**

  Render project cards from `researchProjects`, publication rows from `publications`, competition entries, and skills. Use `id={project.id}` so homepage links such as `/research#optical-sensing` land on the correct project. Do not include grades, rank, course scores, PDFs, or certificate images.

- [ ] **Step 4: Implement `Practice`.**

  Render approved `practiceHighlights` as dated/numbered entries and selected approved images with meaningful Chinese `alt` text. Do not render any unapproved PPT screenshot or group photo.

- [ ] **Step 5: Run page tests, build, and commit.**

  ```bash
  npm test -- src/pages/Research.test.jsx src/pages/Practice.test.jsx
  npm run build
  git add src/pages/Research.jsx src/pages/Research.module.css src/pages/Practice.jsx src/pages/Practice.module.css src/pages/Research.test.jsx src/pages/Practice.test.jsx
  git commit -m "feat(profile): add research and practice pages"
  ```

### Task 5: Rebuild the Home page as the long-form entry point

**Files:**
- Modify: `src/pages/Home.jsx`
- Modify: `src/pages/Home.module.css`
- Create: `src/pages/Home.test.jsx`

- [ ] **Step 1: Write the failing homepage test.**

  ```jsx
  expect(screen.getByRole('heading', { name: /在公式与光影之间/ })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: /进入研究学习页/ })).toHaveAttribute('href', '/research');
  expect(screen.getByRole('link', { name: /浏览全部摄影作品/ })).toHaveAttribute('href', '/portfolio');
  ```

- [ ] **Step 2: Run the test and verify it fails against the photography-only home page.**

  ```bash
  npm test -- src/pages/Home.test.jsx
  ```

- [ ] **Step 3: Implement the six confirmed sections.**

  Use `siteContent.js` and render this sequence: identity hero, research preview, practice preview, selected photography, personal moments, contact. Use `Link` targets `/research`, `/practice`, `/portfolio`, and `/about`. Keep Framer Motion reveals only where they do not block reading or navigation.

- [ ] **Step 4: Implement the laboratory-cool-gray layout.**

  Apply near-white backgrounds, graphite text, mist separators, and blue-gray labels/links. Use a light grid or circle in the hero as a decorative element only; preserve readable text if the hero image fails. Use `filter: grayscale()` only on curated image presentation, not on the full document.

- [ ] **Step 5: Run the homepage test, build, and commit.**

  ```bash
  npm test -- src/pages/Home.test.jsx
  npm run build
  git add src/pages/Home.jsx src/pages/Home.module.css src/pages/Home.test.jsx
  git commit -m "feat(home): add long-form personal homepage"
  ```

### Task 6: Preserve photography and simplify About/contact

**Files:**
- Modify: `src/data/images.js`
- Modify: `src/pages/Portfolio.jsx`
- Modify: `src/pages/Portfolio.module.css`
- Modify: `src/pages/About.jsx`
- Modify: `src/pages/About.module.css`
- Delete: `src/components/Guestbook.jsx`
- Delete: `src/components/Guestbook.module.css`
- Delete: `src/pages/Contact.jsx`
- Delete: `src/pages/Contact.module.css`
- Delete: `src/lib/supabase.js`
- Modify: `package.json`
- Create: `src/pages/Portfolio.test.jsx`
- Create: `src/pages/About.test.jsx`

- [ ] **Step 1: Write regression tests before removing the guestbook.**

  ```jsx
  expect(screen.getByRole('button', { name: '校园' })).toBeInTheDocument();
  expect(screen.queryByText('Guestbook')).not.toBeInTheDocument();
  expect(screen.getByRole('link', { name: /邮箱/ })).toHaveAttribute('href', expect.stringMatching(/^mailto:/));
  ```

- [ ] **Step 2: Run tests and confirm the current About page fails the no-guestbook assertion.**

  ```bash
  npm test -- src/pages/Portfolio.test.jsx src/pages/About.test.jsx
  ```

- [ ] **Step 3: Update photography labels and metadata for Chinese-first presentation.**

  Change `categories` labels to `全部`, `校园`, `风光`, `人像`; retain category keys and `encodeURIComponent(file)` in image URLs. Preserve Gallery filters, lazy loading, and Lightbox click behavior.

- [ ] **Step 4: Replace `About` with concise biography, approved personal moments, and mail contact.**

  Remove the `Guestbook` import and every guestbook/contact card. Render no phone number, WeChat ID, social placeholder, or raw personal data beyond the approved public profile fields.

- [ ] **Step 5: Delete the Supabase/guestbook code and dependency.**

  ```bash
  npm uninstall @supabase/supabase-js
  ```

  Remove the four confirmed files only after no source imports them.

- [ ] **Step 6: Run regression tests, search for removed references, build, and commit.**

  ```bash
  npm test -- src/pages/Portfolio.test.jsx src/pages/About.test.jsx
  rg -n "Guestbook|supabase|VITE_SUPABASE|WeChat|2286079159" src package.json
  npm run build
  git add src/data/images.js src/pages/Portfolio.jsx src/pages/Portfolio.module.css src/pages/About.jsx src/pages/About.module.css package.json package-lock.json src/pages/Portfolio.test.jsx src/pages/About.test.jsx
  git rm src/components/Guestbook.jsx src/components/Guestbook.module.css src/pages/Contact.jsx src/pages/Contact.module.css src/lib/supabase.js
  git commit -m "refactor(contact): remove guestbook and Supabase"
  ```

### Task 7: Validate responsive behavior and GitHub Pages delivery

**Files:**
- Modify: CSS files only if a failure is found during responsive validation.
- Modify: `docs/content-audit-2026-08-28.md` with final asset decisions.

- [ ] **Step 1: Run the full test and production build suite.**

  ```bash
  npm test
  npm run build
  ```

  Expected: all tests pass and Vite emits `dist/` without errors.

- [ ] **Step 2: Preview the production build under the configured GitHub Pages base path.**

  ```bash
  npm run preview -- --host 127.0.0.1
  ```

  Manually verify `/xiziqi-portfolio/`, `/xiziqi-portfolio/research`, `/xiziqi-portfolio/practice`, `/xiziqi-portfolio/portfolio`, and `/xiziqi-portfolio/about` at desktop and mobile widths.

- [ ] **Step 3: Perform the public-data and image fallback checks.**

  Confirm no page displays phone number, WeChat, birth date, GPA/ranking, certificate scan, guestbook, or Supabase error. In browser DevTools, block one selected profile image request and confirm its adjacent text remains readable.

- [ ] **Step 4: Commit final validation fixes and deploy only with explicit user approval.**

  ```bash
  git add src docs/content-audit-2026-08-28.md
  git commit -m "test(home): verify personal homepage delivery"
  ```

  Do not run `npm run deploy` until the user explicitly asks to publish.

## Self-review

- Spec coverage: Tasks 1-2 cover new PPT/PDF/photo intake; Tasks 3-6 cover all five routes, the long-form homepage, visual system, photography preservation, safe contact, and guestbook removal; Task 7 covers build, mobile, base path, accessibility-adjacent fallback, and public-data validation.
- No-placeholder scan: every task names files, commands, expected outcomes, and implemented behavior. Source claims from new PPTs remain intentionally approval-gated rather than invented.
- Interface consistency: every page uses `siteContent.js`; the navigation routes are `/`, `/research`, `/practice`, `/portfolio`, `/about`; legacy `/contact` redirects to `/about`.
