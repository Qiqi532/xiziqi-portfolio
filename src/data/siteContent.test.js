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
    expect(personalGallery).toHaveLength(16);

    const galleryLayout = personalGallery.map(({ src, ratio, span }) => ({
      file: src.split('/').at(-1),
      ratio,
      span,
    }));

    expect(galleryLayout).toEqual([
      { file: '15-hong-kong.jpg', ratio: 'portrait', span: 'tall' },
      { file: '01-fieldwork.jpg', ratio: 'landscape', span: 'wide' },
      { file: '11-meizhou-island.jpg', ratio: 'portrait', span: 'tall' },
      { file: '02-shanghai.jpg', ratio: 'landscape', span: 'wide' },
      { file: '03-photonics-conference.jpg', ratio: 'landscape', span: 'standard' },
      { file: '04-national-games.jpg', ratio: 'landscape', span: 'wide' },
      { file: '12-basketball.jpg', ratio: 'portrait', span: 'tall' },
      { file: '05-national-games-2.jpg', ratio: 'landscape', span: 'standard' },
      { file: '06-beijing.jpg', ratio: 'landscape', span: 'wide' },
      { file: '07-nanjing.png', ratio: 'landscape', span: 'standard' },
      { file: '08-national-guard.jpg', ratio: 'landscape', span: 'wide' },
      { file: '09-hangzhou.jpg', ratio: 'landscape', span: 'wide' },
      { file: '10-quanzhou.jpg', ratio: 'landscape', span: 'standard' },
      { file: '13-disney.jpg', ratio: 'landscape', span: 'standard' },
      { file: '14-great-wall.jpg', ratio: 'landscape', span: 'wide' },
      { file: '16-hong-kong-2.jpg', ratio: 'landscape', span: 'standard' },
    ]);

    expect(personalGallery.every(({ featured }) => featured !== true)).toBe(true);
  });

  it('contains the approved research, practice, skills, and contact records', () => {
    expect(publications).toHaveLength(2);
    expect(competitions).toHaveLength(3);
    expect(competitions.some(({ title }) => title.includes('实验物理教学研讨会'))).toBe(true);
    expect(researchProjects).toHaveLength(5);
    expect(researchProjects.some(({ id }) => id === 'lhc-top-tagging')).toBe(true);

    const lumina = researchProjects.find(({ id }) => id === 'lumina-select');
    expect(lumina).toBeDefined();
    expect(lumina.href).toBe('https://github.com/Qiqi532/lumina-select');
    expect(lumina.external).toBe(true);

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
