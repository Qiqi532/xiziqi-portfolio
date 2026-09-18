import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { copyFileSync, mkdirSync, existsSync } from 'node:fs';

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
  closeBundle() {
    copyFileSync('dist/index.html', 'dist/404.html');
    for (const route of ROUTES) {
      const dir = `dist/${route}`;
      if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
      copyFileSync('dist/index.html', `${dir}/index.html`);
    }
  },
});

// 部署基路径：默认根路径（Netlify / Vercel / Cloudflare Pages 均可直接用）。
// 若部署到「项目型子路径」（如 GitHub Pages 的 /repo-name/），构建时传入 VITE_BASE：
//   VITE_BASE=/xiziqi-portfolio/ npm run build
const base = process.env.VITE_BASE || '/';

export default defineConfig({
  plugins: [react(), spaFallback()],
  base,
  test: {
    environment: 'jsdom',
    setupFiles: './src/test/setup.js',
    globals: true,
  },
});
