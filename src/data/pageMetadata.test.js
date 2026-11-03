import { describe, expect, it } from 'vitest';
import { pageMetadata } from './pageMetadata';
import { renderPageMetadata } from '../../scripts/staticMetadata';

describe('static route metadata', () => {
  it('replaces homepage metadata without duplicating tags on another route', () => {
    const source = '<html lang="zh-CN"><head><title>Old</title><meta name="description" content="Old" /></head><body></body></html>';
    const home = renderPageMetadata(source, pageMetadata['/'], 'https://example.com/base/', 'https://example.com/base/images/photo.jpg');
    const page = renderPageMetadata(home, pageMetadata['/portfolio'], 'https://example.com/base/portfolio/', 'https://example.com/base/images/photo.jpg');
    expect(page).toContain('<title>摄影作品｜黄新宏</title>');
    expect(page).toContain('href="https://example.com/base/portfolio/"');
    expect(page.match(/property="og:title"/g)).toHaveLength(1);
    expect(page.match(/name="description"/g)).toHaveLength(1);
    expect(page).toContain('珠港澳大学生摄影展特别推荐');
  });
});
