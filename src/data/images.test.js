import { describe, expect, it } from 'vitest';
import { existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { categories, images } from './images';

describe('photography portfolio data', () => {
  it('offers a personal-photo category without an ID photo', () => {
    expect(categories).toContainEqual({ key: 'personal', label: '个人照' });

    const personalPhotos = images.filter(({ category }) => category === 'personal');
    expect(personalPhotos).toHaveLength(17);
    expect(personalPhotos[0]).toMatchObject({ title: '摄影分享现场', width: 1536, height: 1024 });
    expect(personalPhotos.some(({ src }) => src.includes('15-hong-kong.jpg'))).toBe(true);
    expect(personalPhotos.some(({ src }) => src.includes('16-hong-kong-2.jpg'))).toBe(true);
    expect(personalPhotos.every(({ src }) => !src.includes('id-photo'))).toBe(true);
  });

  it('preserves portrait and landscape aspect metadata', () => {
    const personalPhotos = images.filter(({ category }) => category === 'personal');
    expect(personalPhotos.some(({ aspect }) => aspect === 'portrait')).toBe(true);
    expect(personalPhotos.some(({ aspect }) => aspect === 'landscape')).toBe(true);
    images.forEach(({ width, height, aspect }) => {
      expect(width).toBeGreaterThan(0);
      expect(height).toBeGreaterThan(0);
      expect(aspect).toBe(width < height ? 'portrait' : 'landscape');
    });
  });

  it('publishes seven named exhibition works with working full images and thumbnails', () => {
    const exhibition = images.filter((image) => image.exhibition);
    expect(exhibition).toHaveLength(7);
    expect(exhibition.map(({ title }) => title)).toEqual(expect.arrayContaining([
      '晨曦中的校园', '繁花中的中珠音乐厅', '康园岁影', '海蚀巨壁',
      '坚尼地城的城市切片', '马会站', '烟花节中的澳门塔',
    ]));
    expect(new Set(images.map(({ id }) => id)).size).toBe(images.length);
    expect(new Set(images.map(({ src }) => src)).size).toBe(images.length);
    images.forEach(({ src, thumb }) => {
      [src, thumb].forEach((url) => {
        const asset = decodeURIComponent(url.slice(import.meta.env.BASE_URL.length));
        expect(existsSync(resolve('public', asset)), asset).toBe(true);
      });
    });
    const sources = images.map(({ src }) => decodeURIComponent(src)).join(' ');
    expect(sources).not.toMatch(/20241006-DSC_4473|DSC_0456|20260307-DSC_1064/);
  });
});
