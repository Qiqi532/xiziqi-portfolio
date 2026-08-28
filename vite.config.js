import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { copyFileSync } from 'node:fs';

const githubPagesFallback = () => ({
  name: 'github-pages-spa-fallback',
  closeBundle() {
    copyFileSync('dist/index.html', 'dist/404.html');
  },
});

export default defineConfig({
  plugins: [react(), githubPagesFallback()],
  base: '/xiziqi-portfolio/',
  test: {
    environment: 'jsdom',
    setupFiles: './src/test/setup.js',
    globals: true,
  },
});
