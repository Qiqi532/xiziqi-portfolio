import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { pageMetadata, notFoundMetadata } from './src/data/pageMetadata.js';
import { renderPageMetadata } from './scripts/staticMetadata.js';

// 站点路由（与 src/App.jsx 保持一致）
const ROUTES = ['research', 'practice', 'portfolio', 'about'];

/**
 * 为纯静态托管生成兜底页：
 * 1. 404.html —— 兼容 GitHub Pages / Cloudflare Pages 等把 404 交给静态文件的平台
 * 2. <route>/index.html —— 让只做目录索引的极简静态服务器也能直接命中深层链接，
 *    不依赖平台是否支持 SPA 重写规则
 */
const spaFallback = () => ({
  name: 'spa-static-fallback',
  transformIndexHtml(html) {
    return renderPageMetadata(html, pageMetadata['/'], siteUrl, shareImage);
  },
  closeBundle() {
    const html = readFileSync('dist/index.html', 'utf8');
    writeFileSync('dist/404.html', renderPageMetadata(html, notFoundMetadata, new URL('404.html', siteUrl).href, shareImage));
    for (const route of ROUTES) {
      const dir = `dist/${route}`;
      if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
      writeFileSync(`${dir}/index.html`, renderPageMetadata(html, pageMetadata[`/${route}`], new URL(`${route}/`, siteUrl).href, shareImage));
    }
  },
});

// 部署基路径：默认根路径（Netlify / Vercel / Cloudflare Pages 均可直接用）。
// 若部署到「项目型子路径」（如 GitHub Pages 的 /repo-name/），构建时传入 VITE_BASE：
//   VITE_BASE=/xiziqi-portfolio/ npm run build
const base = process.env.VITE_BASE || '/';
const siteUrl = process.env.VITE_SITE_URL || (base === '/' ? 'https://xiziqi-portfolio.pages.dev/' : `https://qiqi532.github.io${base}`);
const shareImage = new URL('images/profile/gallery/17-photography-talk.jpg', siteUrl).href;

export default defineConfig({
  plugins: [react(), spaFallback()],
  base,
  test: {
    environment: 'jsdom',
    setupFiles: './src/test/setup.js',
    globals: true,
  },
});
