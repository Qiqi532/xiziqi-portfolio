import { describe, expect, it } from 'vitest';
import { categories, images } from './images';

describe('photography portfolio data', () => {
  it('offers a personal-photo category without an ID photo', () => {
    expect(categories).toContainEqual({ key: 'personal', label: '个人照' });

    const personalPhotos = images.filter(({ category }) => category === 'personal');
    expect(personalPhotos).toHaveLength(16);
    expect(personalPhotos.some(({ src }) => src.includes('15-hong-kong.jpg'))).toBe(true);
    expect(personalPhotos.some(({ src }) => src.includes('16-hong-kong-2.jpg'))).toBe(true);
    expect(personalPhotos.every(({ src }) => !src.includes('id-photo'))).toBe(true);
  });

  it('preserves portrait and landscape aspect metadata', () => {
    const personalPhotos = images.filter(({ category }) => category === 'personal');
    expect(personalPhotos.some(({ aspect }) => aspect === 'portrait')).toBe(true);
    expect(personalPhotos.some(({ aspect }) => aspect === 'landscape')).toBe(true);
  });
});
