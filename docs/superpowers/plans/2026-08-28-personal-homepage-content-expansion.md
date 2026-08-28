# Personal Homepage Content Expansion Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the monochrome ID-photo presentation with a color lifestyle carousel, expand the research and practice evidence, build a mixed-ratio personal gallery, add verified Xiaohongshu contact details, and deploy the verified site to GitHub Pages.

**Architecture:** Keep all public copy and asset metadata in `src/data/siteContent.js`; add one focused `HeroCarousel` component for carousel state and accessibility; keep `Home`, `Research`, `Practice`, and `About` responsible only for page composition. Prepare optimized static assets under `public/images/` so runtime pages have no dependency on the private `intro/` source directory or third-party content APIs.

**Tech Stack:** Vite 5, React 18, React Router 6, Framer Motion 11, CSS Modules, Vitest 4, Testing Library, Pillow 11, Poppler `pdftoppm`, GitHub Pages.

---

## File map

| Path | Responsibility |
|------|----------------|
| `scripts/prepare_personal_site_assets.py` | Copy, render, resize, and optimize approved local assets into public web directories. |
| `public/images/profile/` | Four hero slides and fourteen full personal-gallery images. |
| `public/images/research/` | Project figures, paper pages, and three competition certificates. |
| `public/images/practice/` | Guangming Daily page, China National Travel image, National Games photos, and fieldwork photo. |
| `src/data/siteContent.js` | Typed-by-shape static records for all new content and focal-point metadata. |
| `src/components/HeroCarousel.jsx` | Autoplay, pause, reduced-motion, image fallback, and manual carousel controls. |
| `src/components/HeroCarousel.module.css` | Stable color image frame and responsive carousel controls. |
| `src/components/ContactLinks.jsx` | Shared email, Xiaohongshu, handle-copy action, and non-blocking feedback. |
| `src/pages/Home.jsx` / `Home.module.css` | Integrate the carousel, remove duplicate moments, and add email/Xiaohongshu contact actions. |
| `src/pages/Research.jsx` / `Research.module.css` | Project narratives, evidence images, publications, certificate gallery, and grouped tools. |
| `src/pages/Practice.jsx` / `Practice.module.css` | Three editorial practice chapters and verified media links. |
| `src/pages/About.jsx` / `About.module.css` | Biography plus all-photo adaptive editorial grid. |
| `src/**/*.test.{js,jsx}` | Data, behavior, content, public-link, and regression coverage. |

### Task 1: Prepare approved public assets

**Files:**
- Create: `scripts/prepare_personal_site_assets.py`
- Create: `public/images/profile/gallery/*`
- Create: `public/images/research/*`
- Create: `public/images/practice/*`

- [ ] **Step 1: Create the deterministic asset preparation script**

Use `apply_patch` to create the script below. It preserves original aspect ratios, applies EXIF orientation, limits the long edge to 2200 px, converts raster photographs to optimized JPEG, renders the first page of approved PDFs, and extracts only the listed PPT media.

```python
from pathlib import Path
import shutil
import subprocess
import tempfile
import zipfile

from PIL import Image, ImageOps

ROOT = Path(__file__).resolve().parents[1]
INTRO = ROOT / "intro"
PUBLIC = ROOT / "public" / "images"


def save_web_image(source: Path, destination: Path, max_edge: int = 2200) -> None:
    destination.parent.mkdir(parents=True, exist_ok=True)
    with Image.open(source) as raw:
        image = ImageOps.exif_transpose(raw).convert("RGB")
        image.thumbnail((max_edge, max_edge), Image.Resampling.LANCZOS)
        image.save(destination, "JPEG", quality=86, optimize=True, progressive=True)


def render_pdf_first_page(source: Path, destination: Path) -> None:
    with tempfile.TemporaryDirectory() as temporary:
        prefix = Path(temporary) / "page"
        subprocess.run(
            ["pdftoppm", "-f", "1", "-singlefile", "-png", "-r", "180", str(source), str(prefix)],
            check=True,
        )
        save_web_image(prefix.with_suffix(".png"), destination)


def extract_ppt_media(source: Path, media_name: str, destination: Path) -> None:
    destination.parent.mkdir(parents=True, exist_ok=True)
    with zipfile.ZipFile(source) as archive, tempfile.TemporaryDirectory() as temporary:
        extracted = Path(temporary) / media_name
        extracted.write_bytes(archive.read(f"ppt/media/{media_name}"))
        save_web_image(extracted, destination)


HERO_IMAGES = {
    "泉州.jpg": "hero-quanzhou.jpg",
    "香港.jpg": "hero-hong-kong.jpg",
    "长城.jpg": "hero-great-wall.jpg",
    "杭州.jpg": "hero-hangzhou.jpg",
}

GALLERY_IMAGES = {
    "20251003-DSC_1575.jpg": "gallery/01-coast.jpg",
    "北京.jpg": "gallery/02-beijing.jpg",
    "光电会议.jpg": "gallery/03-photonics-conference.jpg",
    "全运会 (2).jpg": "gallery/04-national-games.jpg",
    "全运会 (3).jpg": "gallery/05-national-games.jpg",
    "全运会 (4).jpg": "gallery/06-national-games.jpg",
    "杭州.jpg": "gallery/07-hangzhou.jpg",
    "南京.png": "gallery/08-nanjing.jpg",
    "泉州.jpg": "gallery/09-quanzhou.jpg",
    "三下乡.JPG": "gallery/10-fieldwork.jpg",
    "篮球赛 (1).jpg": "gallery/11-basketball.jpg",
    "证件照.jpg": "gallery/12-id-photo.jpg",
    "长城.jpg": "gallery/13-great-wall.jpg",
    "香港.jpg": "gallery/14-hong-kong.jpg",
}

for source_name, destination_name in HERO_IMAGES.items():
    save_web_image(INTRO / "pic" / source_name, PUBLIC / "profile" / destination_name)
for source_name, destination_name in GALLERY_IMAGES.items():
    save_web_image(INTRO / "pic" / source_name, PUBLIC / "profile" / destination_name)

save_web_image(INTRO / "国际旅游地理.jpg", PUBLIC / "practice" / "china-national-travel.jpg")
save_web_image(
    INTRO / "reward" / "千年古树的现代生存密码-光明日报-光明网_files" / "2025050607_big.jpg",
    PUBLIC / "practice" / "guangming-daily-page.jpg",
)
for index, source_name in enumerate(("全运会 (2).jpg", "全运会 (3).jpg", "全运会 (4).jpg"), start=1):
    save_web_image(INTRO / "pic" / source_name, PUBLIC / "practice" / f"national-games-{index}.jpg")
save_web_image(INTRO / "pic" / "三下乡.JPG", PUBLIC / "practice" / "fieldwork.jpg")

render_pdf_first_page(INTRO / "reward" / "Measurement.pdf", PUBLIC / "research" / "paper-measurement.jpg")
render_pdf_first_page(INTRO / "reward" / "optical fiber Technology .pdf", PUBLIC / "research" / "paper-optical-fiber-technology.jpg")
render_pdf_first_page(INTRO / "reward" / "数模广东省一等奖.pdf", PUBLIC / "research" / "award-modeling.jpg")
render_pdf_first_page(INTRO / "reward" / "华南大学生物理实验竞赛二等奖.pdf", PUBLIC / "research" / "award-physics-experiment.jpg")
save_web_image(
    INTRO / "reward" / "全国物理实验研讨会科研论文一等奖.jpg",
    PUBLIC / "research" / "award-seminar.jpg",
)

PPT = INTRO / "中山大学-黄新宏 - 线下交流.pptx"
PPT_MEDIA = {
    "image15.png": "project-fiber-structure.jpg",
    "image22.png": "measurement-figure.jpg",
    "image27.png": "lhc-top-tagging.jpg",
    "image31.png": "peculiar-stars-figure.jpg",
}
for media_name, destination_name in PPT_MEDIA.items():
    extract_ppt_media(PPT, media_name, PUBLIC / "research" / destination_name)

print("Prepared personal homepage assets")
```

- [ ] **Step 2: Run the asset script**

Run: `python scripts/prepare_personal_site_assets.py`

Expected: output contains `Prepared personal homepage assets`; `public/images/profile/gallery` contains 14 JPEG files; `public/images/research` contains 9 JPEG files; `public/images/practice` contains 6 JPEG files.

- [ ] **Step 3: Inspect the prepared media**

Run: `Get-ChildItem public/images/profile/gallery,public/images/research,public/images/practice -File | Select-Object Directory,Name,Length`

Expected: every file has non-zero length; no source PDF, PPTX, private contact data, or `intro/` path is copied into `public`.

- [ ] **Step 4: Commit the asset pipeline and public assets**

```powershell
git add scripts/prepare_personal_site_assets.py public/images/profile public/images/research public/images/practice
git commit -m "feat(content): prepare homepage media assets"
```

### Task 2: Define complete public content records

**Files:**
- Modify: `src/data/siteContent.js`
- Modify: `src/data/siteContent.test.js`

- [ ] **Step 1: Write failing data-contract tests**

Replace the imports and add assertions equivalent to:

```js
import {
  competitions,
  contactChannels,
  heroSlides,
  personalGallery,
  practiceChapters,
  publications,
  researchProjects,
  skillGroups,
} from './siteContent';

it('contains the approved public content records', () => {
  expect(heroSlides.map(({ location }) => location)).toEqual(['泉州', '香港', '长城', '杭州']);
  expect(heroSlides.every(({ src }) => !src.includes('id-photo'))).toBe(true);
  expect(personalGallery).toHaveLength(14);
  expect(publications).toHaveLength(2);
  expect(competitions).toHaveLength(3);
  expect(competitions.some(({ title }) => title.includes('实验物理教学研讨会'))).toBe(true);
  expect(researchProjects.some(({ id }) => id === 'lhc-top-tagging')).toBe(true);
  expect(skillGroups.flatMap(({ items }) => items)).toEqual(expect.arrayContaining(['Python', 'PyTorch', 'COMSOL', 'Origin', 'SolidWorks', 'AutoCAD', 'LaTeX', 'Adobe 系列']));
  expect(practiceChapters).toHaveLength(3);
  expect(contactChannels.xiaohongshu.href).toBe('https://www.xiaohongshu.com/user/profile/64afebdd000000001f004818');
  expect(contactChannels.xiaohongshu.handle).toBe('9776387705');
});
```

- [ ] **Step 2: Run the data test and verify failure**

Run: `npm test -- src/data/siteContent.test.js`

Expected: FAIL because `heroSlides`, `personalGallery`, `skillGroups`, `practiceChapters`, and `contactChannels` are not exported and competitions contain only two items.

- [ ] **Step 3: Replace the content module with explicit records**

Keep `profile`, `selectedPhotography`, and the two published DOI links. Add these exact shapes:

```js
const image = (folder, file) => `${import.meta.env.BASE_URL}images/${folder}/${file}`;

export const heroSlides = [
  { src: image('profile', 'hero-quanzhou.jpg'), alt: '黄新宏在泉州湖边', location: '泉州', position: '50% 42%' },
  { src: image('profile', 'hero-hong-kong.jpg'), alt: '黄新宏在香港街头', location: '香港', position: '50% 38%' },
  { src: image('profile', 'hero-great-wall.jpg'), alt: '黄新宏在长城旅行', location: '长城', position: '50% 35%' },
  { src: image('profile', 'hero-hangzhou.jpg'), alt: '黄新宏在杭州旅行', location: '杭州', position: '50% 42%' },
];

export const personalGallery = [
  { src: image('profile/gallery', '01-coast.jpg'), alt: '黄新宏在海边观看日落', ratio: 'landscape', span: 'wide' },
  { src: image('profile/gallery', '02-beijing.jpg'), alt: '黄新宏在北京篮球场', ratio: 'portrait', span: 'tall' },
  { src: image('profile/gallery', '03-photonics-conference.jpg'), alt: '黄新宏参加光电会议', ratio: 'landscape', span: 'standard' },
  { src: image('profile/gallery', '04-national-games.jpg'), alt: '黄新宏参加十五运会志愿服务', ratio: 'landscape', span: 'wide' },
  { src: image('profile/gallery', '05-national-games.jpg'), alt: '十五运会志愿服务现场', ratio: 'landscape', span: 'standard' },
  { src: image('profile/gallery', '06-national-games.jpg'), alt: '十五运会志愿者合影', ratio: 'landscape', span: 'standard' },
  { src: image('profile/gallery', '07-hangzhou.jpg'), alt: '黄新宏在杭州旅行', ratio: 'portrait', span: 'tall' },
  { src: image('profile/gallery', '08-nanjing.jpg'), alt: '黄新宏在南京夜景中', ratio: 'portrait', span: 'standard' },
  { src: image('profile/gallery', '09-quanzhou.jpg'), alt: '黄新宏在泉州湖边', ratio: 'portrait', span: 'tall' },
  { src: image('profile/gallery', '10-fieldwork.jpg'), alt: '黄新宏参加三下乡影像记录', ratio: 'landscape', span: 'wide' },
  { src: image('profile/gallery', '11-basketball.jpg'), alt: '黄新宏参加校园篮球赛', ratio: 'portrait', span: 'standard' },
  { src: image('profile/gallery', '12-id-photo.jpg'), alt: '黄新宏证件照', ratio: 'portrait', span: 'standard' },
  { src: image('profile/gallery', '13-great-wall.jpg'), alt: '黄新宏在长城旅行', ratio: 'landscape', span: 'wide' },
  { src: image('profile/gallery', '14-hong-kong.jpg'), alt: '黄新宏在香港街头', ratio: 'portrait', span: 'tall' },
];

export const skillGroups = [
  { label: '研究计算', items: ['Python', 'PyTorch'] },
  { label: '仿真与分析', items: ['COMSOL', 'Origin', '光谱数据处理'] },
  { label: '工程表达', items: ['SolidWorks', 'AutoCAD'] },
  { label: '学术写作', items: ['LaTeX', 'Microsoft Office'] },
  { label: '视觉创作', items: ['Adobe 系列'] },
];

export const contactChannels = {
  xiaohongshu: {
    label: '小红书',
    handle: '9776387705',
    href: 'https://www.xiaohongshu.com/user/profile/64afebdd000000001f004818',
  },
};
```

Use these concrete records for the remaining collections:

```js
export const researchProjects = [
  {
    id: 'optical-sensing', label: 'R-01', title: '光纤温盐同步传感', period: '2024.12 — 2025.12', status: '优秀结题',
    summary: '面向海水温度与盐度同步测量，设计并实现基于 SMF–HCF–CF 微球腔的光纤 Fabry–Perot 传感结构。',
    details: ['调研光纤传感理论并参与结构设计与光场仿真。', '通过理论推导和函数反演验证温盐传感原理。', '搭建光谱解调仪控制程序，完成光谱数据获取与信号解读。'],
    contribution: '项目负责人 · 校级立项并优秀结题',
    media: image('research', 'project-fiber-structure.jpg'),
    href: '/research#optical-sensing',
  },
  {
    id: 'peculiar-stars', label: 'R-02', title: '化学奇异星的证认与探讨', period: '2025.12 — 至今', status: '进行中',
    summary: '基于 LAMOST DR13 光谱，结合物理特征与机器学习方法筛选化学丰度异常恒星。',
    details: ['研读氮增丰场星研究文献并建立光谱标准预处理流程。', '结合物理特征与机器学习进行分类筛选。', '后续使用深度学习分类方法推进异常恒星识别与物理分析。'],
    contribution: '项目负责人 · 校级立项',
    media: image('research', 'peculiar-stars-figure.jpg'),
    href: '/research#peculiar-stars',
  },
  {
    id: 'lhc-top-tagging', label: 'R-03', title: 'LHC 顶夸克标记', period: '2025.12', status: '课程与方法实践',
    summary: '使用 PyTorch 与 CNN 区分 top 夸克衰变喷注和 QCD 背景喷注。',
    details: ['围绕喷注子结构完成数据表示与分类实验。', '将 CNN 结果与 Mass Drop、HEPTopTagger 等传统物理方法比较。'],
    contribution: '高能物理课程项目',
    media: image('research', 'lhc-top-tagging.jpg'),
    href: '/research#lhc-top-tagging',
  },
];

export const publications = [
  {
    title: 'Enhanced temperature sensing performance of pure silica MZI and FPI sensors using the harmonic Vernier effect',
    journal: 'Measurement 271 (2026) 120953', authorship: '共同第一作者',
    href: 'https://doi.org/10.1016/j.measurement.2026.120953',
    image: image('research', 'paper-measurement.jpg'), figure: image('research', 'measurement-figure.jpg'),
  },
  {
    title: 'Low-crosstalk compact fiber-optic temperature-salt sensor based on dual-cavity functional partitioning design in a single tube',
    journal: 'Optical Fiber Technology 98 (2026) 104548', authorship: '第三作者',
    href: 'https://doi.org/10.1016/j.yofte.2025.104548',
    image: image('research', 'paper-optical-fiber-technology.jpg'), figure: image('research', 'project-fiber-structure.jpg'),
  },
];

export const competitions = [
  { year: '2025', title: '全国大学生数学建模竞赛', result: '本科组广东省一等奖 · B 题“碳化硅外延层厚度的确定”', certificate: image('research', 'award-modeling.jpg') },
  { year: '2025', title: '第二十六届华南大学生物理实验设计大赛', result: '省级二等奖 · 温度自补偿型光纤弱压力传感装置', certificate: image('research', 'award-physics-experiment.jpg') },
  { year: '2026', title: '第十三届全国高等学校实验物理教学研讨会论文评比', result: '科研类一等奖 · Measurement 论文', certificate: image('research', 'award-seminar.jpg') },
];

export const practiceChapters = [
  {
    label: 'P-01', title: '校园传播与媒体采用',
    body: ['参与校党委宣传部、校团委宣传部工作，并负责物理与天文学院新媒体中心，累计为校级新媒体供稿图片上百张。', '摄影作品见于《光明日报》与“中国国家旅游”公众号，并成为视觉中国、海丝泉州签约摄影师。'],
    media: [
      { src: image('practice', 'guangming-daily-page.jpg'), alt: '光明日报千年古树的现代生存密码版面', caption: '《光明日报》2025 年 5 月 6 日第 07 版 · 黄新宏摄/光明图片' },
      { src: image('practice', 'china-national-travel.jpg'), alt: '中国国家旅游公众号采用的校园春日照片', caption: '“中国国家旅游”春日赏花图鉴' },
    ],
    links: [{ label: '阅读中国国家旅游原文', href: 'https://mp.weixin.qq.com/s/Z0PCQqgu3jJmgwXXOfa8ng' }],
  },
  {
    label: 'P-02', title: '十五运会志愿服务',
    body: ['参与第十五届全国运动会赛事服务，获中山大学十五运会先进个人及优秀志愿者。', '持续参与公益服务，获评中山大学二星志愿者。'],
    media: [1, 2, 3].map((number) => ({ src: image('practice', `national-games-${number}.jpg`), alt: `十五运会志愿服务现场照片 ${number}` })),
    links: [],
  },
  {
    label: 'P-03', title: '社会实践与影像记录',
    body: ['参与 2025 年三下乡项目《锦绣连山，针线间的壮乡记忆》，项目获评省级“优秀”。'],
    media: [{ src: image('practice', 'fieldwork.jpg'), alt: '三下乡社会实践影像记录现场' }],
    links: [],
  },
];
```

- [ ] **Step 4: Run the data tests**

Run: `npm test -- src/data/siteContent.test.js`

Expected: PASS with 2 publications, 3 competitions, 3 research projects, 3 practice chapters, 4 hero slides, and 14 gallery images.

- [ ] **Step 5: Commit the content model**

```powershell
git add src/data/siteContent.js src/data/siteContent.test.js
git commit -m "feat(content): expand verified profile records"
```

### Task 3: Build the accessible hero carousel

**Files:**
- Create: `src/components/HeroCarousel.jsx`
- Create: `src/components/HeroCarousel.module.css`
- Create: `src/components/HeroCarousel.test.jsx`
- Modify: `src/test/setup.js`

- [ ] **Step 1: Add browser API mocks and failing carousel tests**

Add this `matchMedia` mock in `src/test/setup.js`, then test that the first image renders and next/previous controls update the image:

```js
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: (query) => ({
    matches: false,
    media: query,
    onchange: null,
    addEventListener: () => {},
    removeEventListener: () => {},
    addListener: () => {},
    removeListener: () => {},
    dispatchEvent: () => false,
  }),
});
```

```jsx
import { act, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import HeroCarousel from './HeroCarousel';

const slides = [
  { src: '/one.jpg', alt: '泉州生活照', location: '泉州', position: 'center' },
  { src: '/two.jpg', alt: '香港生活照', location: '香港', position: 'top' },
];

afterEach(() => vi.useRealTimers());

describe('HeroCarousel', () => {
  it('supports manual next and previous navigation', () => {
    render(<HeroCarousel slides={slides} />);
    fireEvent.click(screen.getByRole('button', { name: '下一张照片' }));
    expect(screen.getByRole('img', { name: '香港生活照' })).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: '上一张照片' }));
    expect(screen.getByRole('img', { name: '泉州生活照' })).toBeInTheDocument();
  });

  it('advances every five seconds when motion is allowed', () => {
    vi.useFakeTimers();
    render(<HeroCarousel slides={slides} />);
    act(() => vi.advanceTimersByTime(5000));
    expect(screen.getByRole('img', { name: '香港生活照' })).toBeInTheDocument();
  });

  it('does not autoplay when reduced motion is requested', () => {
    vi.useFakeTimers();
    window.matchMedia = vi.fn(() => ({ matches: true, addEventListener: vi.fn(), removeEventListener: vi.fn() }));
    render(<HeroCarousel slides={slides} />);
    act(() => vi.advanceTimersByTime(5000));
    expect(screen.getByRole('img', { name: '泉州生活照' })).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Verify the tests fail**

Run: `npm test -- src/components/HeroCarousel.test.jsx`

Expected: FAIL because `HeroCarousel.jsx` does not exist.

- [ ] **Step 3: Implement the focused carousel component**

Implement the component with the exact public interface below. The interval runs only when motion is allowed and the frame is not paused; focus, hover, and page visibility update the paused state. An image error hides only that slide image and preserves controls.

```jsx
import { useEffect, useState } from 'react';
import styles from './HeroCarousel.module.css';

export default function HeroCarousel({ slides }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [failed, setFailed] = useState(() => new Set());
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const current = slides[index];
  const select = (next) => setIndex((next + slides.length) % slides.length);

  useEffect(() => {
    const onVisibility = () => setPaused(document.hidden);
    document.addEventListener('visibilitychange', onVisibility);
    return () => document.removeEventListener('visibilitychange', onVisibility);
  }, []);

  useEffect(() => {
    if (paused || reduceMotion || slides.length < 2) return undefined;
    const timer = window.setInterval(() => setIndex((value) => (value + 1) % slides.length), 5000);
    return () => window.clearInterval(timer);
  }, [paused, reduceMotion, slides.length]);

  return (
    <section
      className={styles.frame}
      aria-label="个人生活照片轮播"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setPaused(false);
      }}
    >
      {!failed.has(current.src) && (
        <img
          src={current.src}
          alt={current.alt}
          style={{ objectPosition: current.position }}
          onError={() => setFailed((value) => new Set(value).add(current.src))}
        />
      )}
      <div className={styles.controls}>
        <button type="button" aria-label="上一张照片" onClick={() => select(index - 1)}>←</button>
        <span>{String(index + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')} · {current.location}</span>
        <button type="button" aria-label="下一张照片" onClick={() => select(index + 1)}>→</button>
      </div>
      <div className={styles.dots} aria-label="选择照片">
        {slides.map((slide, slideIndex) => (
          <button
            type="button"
            key={slide.src}
            aria-label={`查看${slide.location}照片`}
            aria-current={slideIndex === index ? 'true' : undefined}
            onClick={() => select(slideIndex)}
          />
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 4: Add stable responsive carousel styles**

Use the following CSS Module. It has a stable frame, uses inline `objectPosition`, and deliberately contains no grayscale filter.

```css
.frame{position:relative;aspect-ratio:4/5;overflow:hidden;background:var(--color-fog)}
.frame>img{width:100%;height:100%;object-fit:cover}
.controls{position:absolute;inset:auto 0 0;display:grid;grid-template-columns:auto 1fr auto;align-items:center;gap:12px;padding:12px;background:rgba(248,250,251,.88);color:var(--color-ink)}
.controls span{text-align:center;font-size:.68rem;letter-spacing:.12em}
.controls button{width:34px;height:34px;border:1px solid var(--color-line)}
.dots{position:absolute;top:14px;right:14px;display:flex;gap:7px}
.dots button{width:8px;height:8px;border-radius:50%;background:rgba(248,250,251,.6);border:1px solid var(--color-paper)}
.dots button[aria-current="true"]{background:var(--color-paper)}
@media(max-width:840px){.frame{width:min(100%,640px);aspect-ratio:4/3}}
```

- [ ] **Step 5: Run carousel tests**

Run: `npm test -- src/components/HeroCarousel.test.jsx`

Expected: PASS; manual buttons and the 5000 ms timer both select the second slide.

- [ ] **Step 6: Commit the carousel**

```powershell
git add src/components/HeroCarousel.jsx src/components/HeroCarousel.module.css src/components/HeroCarousel.test.jsx src/test/setup.js
git commit -m "feat(home): add lifestyle photo carousel"
```

### Task 4: Integrate the carousel and richer contact block on Home

**Files:**
- Create: `src/components/ContactLinks.jsx`
- Create: `src/components/ContactLinks.module.css`
- Create: `src/components/ContactLinks.test.jsx`
- Modify: `src/pages/Home.jsx`
- Modify: `src/pages/Home.module.css`
- Modify: `src/pages/Home.test.jsx`

- [ ] **Step 1: Extend the Home test first**

Add assertions for the carousel image, absence of the old portrait label and moments section, email link, Xiaohongshu link, and visible handle:

```jsx
expect(screen.getByRole('img', { name: /泉州/ })).toBeInTheDocument();
expect(screen.queryByText('01 / PORTRAIT')).not.toBeInTheDocument();
expect(screen.queryByRole('heading', { name: '研究之外的个人切面' })).not.toBeInTheDocument();
expect(screen.getByRole('link', { name: /小红书主页/ })).toHaveAttribute(
  'href',
  'https://www.xiaohongshu.com/user/profile/64afebdd000000001f004818',
);
expect(screen.getByText('9776387705')).toBeInTheDocument();
expect(screen.getByRole('button', { name: '复制小红书号' })).toBeInTheDocument();
```

- [ ] **Step 2: Run the Home test and verify failure**

Run: `npm test -- src/pages/Home.test.jsx`

Expected: FAIL because the old ID portrait and moments section still render and Xiaohongshu is absent.

- [ ] **Step 3: Implement the shared contact controls**

Create this component and a CSS Module that lays out `.links` as a wrapping flex row and `.feedback` as a selectable inline status message:

```jsx
import { useState } from 'react';
import { contactChannels } from '../data/siteContent';
import styles from './ContactLinks.module.css';

export default function ContactLinks({ email, light = false }) {
  const [feedback, setFeedback] = useState('');
  const { xiaohongshu } = contactChannels;

  const copyHandle = async () => {
    try {
      if (!navigator.clipboard?.writeText) throw new Error('Clipboard unavailable');
      await navigator.clipboard.writeText(xiaohongshu.handle);
      setFeedback('已复制');
    } catch {
      setFeedback(`请手动复制：${xiaohongshu.handle}`);
    }
  };

  return (
    <div className={`${styles.contact} ${light ? styles.light : ''}`}>
      <div className={styles.links}>
        <a href={`mailto:${email}`}>通过邮箱联系</a>
        <a href={xiaohongshu.href} target="_blank" rel="noreferrer">访问小红书主页 ↗</a>
        <button type="button" onClick={copyHandle} aria-label="复制小红书号">复制账号</button>
      </div>
      <p>小红书号：<span>{xiaohongshu.handle}</span> <span className={styles.feedback} aria-live="polite">{feedback}</span></p>
    </div>
  );
}
```

Test success and fallback with `fireEvent.click` and `await screen.findByText(...)`: mock `navigator.clipboard.writeText` once with `vi.fn().mockResolvedValue()` and once with `vi.fn().mockRejectedValue(new Error('denied'))`; expect `已复制` and `请手动复制：9776387705` respectively.

- [ ] **Step 4: Integrate approved Home content**

Import `HeroCarousel`, `ContactLinks`, `heroSlides`, and `practiceChapters`. Replace the old `<figure className={styles.heroImage}>` with `<HeroCarousel slides={heroSlides} />`; remove the `MOMENTS` section and `personalMoments` import. Render `practiceChapters` in the existing three-item Home summary. Replace the single mail link with `<ContactLinks email={profile.email} light />`.

- [ ] **Step 5: Update Home CSS**

Remove `.heroImage` and `.moments` rules, change the hero grid to `minmax(0, 1.1fr) minmax(320px, .9fr)`, preserve the two-column desktop layout, and stack at 840 px. Keep photography cards in color by deleting their grayscale filter.

- [ ] **Step 6: Run the contact and Home tests**

Run: `npm test -- src/components/ContactLinks.test.jsx src/pages/Home.test.jsx`

Expected: PASS with copy success/fallback feedback, the color carousel, and both contact channels.

- [ ] **Step 7: Commit Home integration**

```powershell
git add src/components/ContactLinks.jsx src/components/ContactLinks.module.css src/components/ContactLinks.test.jsx src/pages/Home.jsx src/pages/Home.module.css src/pages/Home.test.jsx
git commit -m "feat(home): integrate carousel and social contact"
```

### Task 5: Expand the Research page with evidence

**Files:**
- Modify: `src/pages/Research.jsx`
- Modify: `src/pages/Research.module.css`
- Modify: `src/pages/Research.test.jsx`

- [ ] **Step 1: Write failing content and evidence assertions**

```jsx
expect(screen.getByText('LHC 顶夸克标记')).toBeInTheDocument();
expect(screen.getByText(/共同第一作者/)).toBeInTheDocument();
expect(screen.getByText(/第十三届全国高等学校实验物理教学研讨会/)).toBeInTheDocument();
expect(screen.getByRole('img', { name: /研讨会.*一等奖证书/ })).toBeInTheDocument();
expect(screen.getByRole('heading', { name: '研究计算' })).toBeInTheDocument();
expect(screen.getByText('SolidWorks')).toBeInTheDocument();
```

- [ ] **Step 2: Verify Research fails**

Run: `npm test -- src/pages/Research.test.jsx`

Expected: FAIL because the course project, third award, certificate images, and grouped tool headings are absent.

- [ ] **Step 3: Implement project narrative sections**

For each `researchProjects` record render a two-column article: metadata and narrative copy on the left, approved local project image on the right. Render `details` as short paragraphs or bullets. The LHC record must be labelled `课程与方法实践`, not a publication.

- [ ] **Step 4: Implement publication and certificate evidence**

Render each publication as a media row with the local paper-page image, authorship, journal, DOI link, and one representative figure. Render each competition as a certificate card with year, exact title/result, certificate image, and a link to the image in a new tab. Use `target="_blank" rel="noreferrer"` for DOI and certificate links.

- [ ] **Step 5: Render grouped tools and responsive styles**

Map `skillGroups` into labelled `<section>` elements. Use a multi-column evidence layout above 900 px and a single column below 760 px. Certificate images use `object-fit: contain`; project images use `object-fit: cover` with explicit aspect ratios. No research image receives a grayscale filter.

- [ ] **Step 6: Run Research tests**

Run: `npm test -- src/pages/Research.test.jsx`

Expected: PASS with three projects, two papers, three competition certificates, and five tool groups.

- [ ] **Step 7: Commit Research expansion**

```powershell
git add src/pages/Research.jsx src/pages/Research.module.css src/pages/Research.test.jsx
git commit -m "feat(research): add projects papers and award evidence"
```

### Task 6: Build the three-chapter Practice page

**Files:**
- Modify: `src/pages/Practice.jsx`
- Modify: `src/pages/Practice.module.css`
- Modify: `src/pages/Practice.test.jsx`

- [ ] **Step 1: Write failing Practice assertions**

```jsx
expect(screen.getByText(/千年古树的现代生存密码/)).toBeInTheDocument();
expect(screen.getByText(/黄新宏摄\/光明图片/)).toBeInTheDocument();
expect(screen.getByRole('link', { name: /中国国家旅游原文/ })).toHaveAttribute(
  'href',
  'https://mp.weixin.qq.com/s/Z0PCQqgu3jJmgwXXOfa8ng',
);
expect(screen.getAllByRole('img', { name: /十五运会/ })).toHaveLength(3);
expect(screen.getByText(/锦绣连山，针线间的壮乡记忆/)).toBeInTheDocument();
```

- [ ] **Step 2: Verify Practice fails**

Run: `npm test -- src/pages/Practice.test.jsx`

Expected: FAIL because the current page has text summaries only.

- [ ] **Step 3: Render three editorial chapters**

Map `practiceChapters` to numbered `<article>` elements. For campus media, render the Guangming Daily page and China National Travel image with accurate captions and the verified WeChat source link. For National Games, render the three现场 photos in a mixed two-column group. For fieldwork, render the `三下乡` image and the province-level result without inventing additional duties.

- [ ] **Step 4: Add mixed media chapter styles**

Alternate copy/media order on desktop, keep publication scans `object-fit: contain`, keep event photos `object-fit: cover`, and collapse every chapter to a single column below 760 px. Remove the old generic working-principle aside so evidence remains the final focus.

- [ ] **Step 5: Run Practice tests**

Run: `npm test -- src/pages/Practice.test.jsx`

Expected: PASS with both media publications, three National Games photos, and the fieldwork chapter.

- [ ] **Step 6: Commit Practice expansion**

```powershell
git add src/pages/Practice.jsx src/pages/Practice.module.css src/pages/Practice.test.jsx
git commit -m "feat(practice): add media and volunteer chapters"
```

### Task 7: Build the adaptive About gallery and copy control

**Files:**
- Modify: `src/pages/About.jsx`
- Modify: `src/pages/About.module.css`
- Modify: `src/pages/About.test.jsx`

- [ ] **Step 1: Write failing About assertions**

```jsx
expect(screen.getAllByTestId('personal-photo')).toHaveLength(14);
expect(screen.getByRole('img', { name: '黄新宏证件照' })).not.toHaveAttribute('data-featured', 'true');
expect(screen.getByRole('link', { name: /小红书主页/ })).toHaveAttribute('href', expect.stringContaining('xiaohongshu.com/user/profile/'));
expect(screen.getByRole('button', { name: '复制小红书号' })).toBeInTheDocument();
```

- [ ] **Step 2: Verify About fails**

Run: `npm test -- src/pages/About.test.jsx`

Expected: FAIL because only three moments and the old ID portrait layout exist.

- [ ] **Step 3: Replace the portrait intro with color editorial content**

Use the first non-ID gallery image as the biography lead. Map all `personalGallery` records to `<figure data-testid="personal-photo" className={styles[item.span]}>`; set `loading="lazy"`, keep the supplied `alt`, and omit forced captions unless a location label exists.

- [ ] **Step 4: Reuse the verified contact controls**

Import `ContactLinks` and render `<ContactLinks email={profile.email} />` below the biography. Keep the existing About test assertions for the profile link and `复制小红书号` button; the component-level test from Task 4 covers success and fallback feedback.

- [ ] **Step 5: Implement mixed-ratio grid CSS**

Use a 12-column grid above 900 px: `.wide` spans 8 columns, `.tall` spans 4 columns and two implicit rows, `.standard` spans 4 columns. Use `object-fit: cover` only on desktop, with per-record focal positions. At 760 px and below, set every figure to one column and each image to `width: 100%; height: auto; aspect-ratio: auto; object-fit: contain`.

- [ ] **Step 6: Run About tests**

Run: `npm test -- src/pages/About.test.jsx`

Expected: PASS with 14 photos, a non-ID lead image, Xiaohongshu link, and copy control.

- [ ] **Step 7: Commit About expansion**

```powershell
git add src/pages/About.jsx src/pages/About.module.css src/pages/About.test.jsx
git commit -m "feat(about): add adaptive personal photo gallery"
```

### Task 8: Full verification, visual QA, and deployment

**Files:**
- Modify if verification exposes defects: only the files touched in Tasks 1–7
- Update: `progress.md`

- [ ] **Step 1: Run the complete test suite**

Run: `npm test`

Expected: all existing and new Vitest files pass; no test emits an unhandled timer, Clipboard API, or accessibility warning.

- [ ] **Step 2: Build the production bundle**

Run: `npm run build`

Expected: Vite exits with code 0 and emits `dist/index.html` plus the new profile, research, and practice assets under the configured `/xiziqi-portfolio/` base.

- [ ] **Step 3: Inspect local production output**

Run: `npm run preview -- --host 127.0.0.1`

Expected: the preview server starts. Check `/`, `/research`, `/practice`, `/portfolio`, and `/about` at 1440 px, 768 px, and 360 px. Confirm no ID photo on Home, no grayscale lifestyle photos, correct hero focal points, no mixed-gallery holes, readable certificates, three National Games photos, and no horizontal overflow.

- [ ] **Step 4: Check public-safe content and broken asset paths**

Run: `rg -n "证件照|38/131|3\.7[35]|supabase|Guestbook|intro/" dist src`

Expected: `证件照` may appear only as the About image alt; phone/GPA/Supabase/Guestbook and runtime `intro/` paths do not appear in `dist`.

- [ ] **Step 5: Record verification**

Append the test count, build result, inspected viewport sizes, carousel result, and deployment URL to `progress.md`. Commit only implementation files and the progress record that belong to this feature; do not add `intro/`, `tmp/`, `.superpowers/`, or unrelated user files.

```powershell
git add src public/images scripts/prepare_personal_site_assets.py progress.md
git commit -m "feat(home): complete content and image expansion"
```

- [ ] **Step 6: Deploy GitHub Pages**

Run: `npm run deploy`

Expected: `gh-pages` publishes `dist` successfully without rewriting source history.

- [ ] **Step 7: Verify the deployed site**

Open `https://qiqi532.github.io/xiziqi-portfolio/` and the four topic routes. Confirm HTTP success, carousel assets, certificates, media links, and Xiaohongshu link. If GitHub Pages is still propagating, poll at intervals shorter than 60 seconds until the deployed asset hash matches the current `dist/index.html`.
