import { describe, expect, it } from 'vitest';
import {
  competitions,
  contactChannels,
  heroSlides,
  personalGallery,
  practiceChapters,
  profile,
  publications,
  researchProjects,
  selectedPhotography,
  skillGroups,
} from './siteContent';

describe('public homepage content', () => {
  it('keeps public-safe profile fields and the photography navigation', () => {
    expect(profile).not.toHaveProperty('phone');
    expect(profile).not.toHaveProperty('wechat');
    expect(profile).not.toHaveProperty('heroImage');
    expect(JSON.stringify(profile)).not.toMatch(/38\/131|3\.7[35]/);
    expect(selectedPhotography).toHaveLength(3);
  });

  it('contains the approved homepage and personal gallery images', () => {
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
    expect(personalGallery).toHaveLength(14);

    const galleryLayout = personalGallery.map(({ src, ratio, span }) => ({
      file: src.split('/').at(-1),
      ratio,
      span,
    }));

    expect(galleryLayout).toEqual([
      { file: '01-coast.jpg', ratio: 'portrait', span: 'tall' },
      { file: '02-beijing.jpg', ratio: 'landscape', span: 'wide' },
      { file: '03-photonics-conference.jpg', ratio: 'landscape', span: 'standard' },
      { file: '04-national-games.jpg', ratio: 'portrait', span: 'tall' },
      { file: '05-national-games.jpg', ratio: 'landscape', span: 'standard' },
      { file: '06-national-games.jpg', ratio: 'landscape', span: 'standard' },
      { file: '07-hangzhou.jpg', ratio: 'landscape', span: 'wide' },
      { file: '08-nanjing.jpg', ratio: 'landscape', span: 'standard' },
      { file: '09-quanzhou.jpg', ratio: 'landscape', span: 'wide' },
      { file: '10-fieldwork.jpg', ratio: 'landscape', span: 'wide' },
      { file: '11-basketball.jpg', ratio: 'portrait', span: 'tall' },
      { file: '12-id-photo.jpg', ratio: 'portrait', span: 'standard' },
      { file: '13-great-wall.jpg', ratio: 'landscape', span: 'wide' },
      { file: '14-hong-kong.jpg', ratio: 'portrait', span: 'tall' },
    ]);

    const idPhoto = personalGallery.find(({ src }) => src.endsWith('/12-id-photo.jpg'));
    expect(idPhoto.featured).not.toBe(true);
  });

  it('contains the approved research, practice, skills, and contact records', () => {
    expect(publications).toHaveLength(2);
    expect(competitions).toHaveLength(3);
    expect(competitions.some(({ title }) => title.includes('实验物理教学研讨会'))).toBe(true);
    expect(researchProjects).toHaveLength(3);
    expect(researchProjects.some(({ id }) => id === 'lhc-top-tagging')).toBe(true);
    expect(skillGroups.flatMap(({ items }) => items)).toEqual(
      expect.arrayContaining(['Python', 'PyTorch', 'COMSOL', 'Origin', 'SolidWorks', 'AutoCAD', 'LaTeX', 'Adobe 系列']),
    );
    expect(practiceChapters).toHaveLength(3);
    expect(contactChannels.xiaohongshu.href).toBe(
      'https://www.xiaohongshu.com/user/profile/64afebdd000000001f004818',
    );
    expect(contactChannels.xiaohongshu.handle).toBe('9776387705');
  });
});
