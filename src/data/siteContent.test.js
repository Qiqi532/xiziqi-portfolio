import { describe, expect, it } from 'vitest';
import {
  competitions,
  contactChannels,
  education,
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

  it('leads the opening introduction with the two-school path', () => {
    expect(profile.role).toBe('中山大学物理与天文学院本科生');
    expect(profile.statement).toBe('在两座校园之间，追问公式与光影。');
    expect(profile.introduction).toContain('2027 年将赴南京大学物理学院继续深造');
    expect(profile.introduction).toContain('两所学校都肇始于二十世纪初');
    expect(`${profile.role}${profile.introduction}`).toContain('中山大学');
    expect(profile.introduction).not.toMatch(/光纤|传感|机器学习|平台/);
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

  it('records the two-stage education background with school facts rather than research', () => {
    expect(education.map(({ id }) => id)).toEqual(['sysu', 'nju']);
    expect(education[0]).toMatchObject({
      school: '中山大学',
      schoolEn: 'Sun Yat-sen University',
      stage: '本科阶段',
      college: '物理与天文学院',
      major: '物理学专业',
      period: '2023.09 — 2027.06',
      motto: '博学 · 审问 · 慎思 · 明辨 · 笃行',
      discipline: { label: '教育部第五轮学科评估', subject: '物理学', grade: 'A-' },
    });
    expect(education[1]).toMatchObject({
      school: '南京大学',
      schoolEn: 'Nanjing University',
      stage: '硕士阶段',
      college: '物理学院',
      major: '物理学专业',
      period: '2027.09 — 2030.06',
      motto: '诚朴雄伟 · 励学敦行',
      discipline: { label: '教育部第五轮学科评估', subject: '物理学', grade: 'A+' },
    });

    education.forEach(({ media, tags, mottoNote, note, rankings, discipline }) => {
      expect(discipline.subject).toBe('物理学');
      expect(discipline.grade).toMatch(/^A\+?$|^A-$/);
      expect(media.src.includes('/images/education/')).toBe(true);
      expect(Boolean(media.alt)).toBe(true);
      expect(tags.length).toBeGreaterThan(0);
      expect(Boolean(mottoNote)).toBe(true);
      expect(note.length).toBeGreaterThan(20);
      expect(rankings).toHaveLength(3);
      rankings.forEach(({ label, year, value }) => {
        expect(Boolean(label)).toBe(true);
        expect(year).toMatch(/^\d{4}$/);
        expect(value).toMatch(/(全球第|^)\s*\d+/);
      });
    });

    // 板块只讲学校本身，不夹带本人的科研方向、项目与「研究」类叙述
    expect(JSON.stringify(education)).not.toMatch(/光纤|传感|光谱|机器学习|LAMOST|论文|大创|科研|研究/);
  });

  it('keeps the school rankings public while still hiding personal metrics', () => {
    const serialized = JSON.stringify(education);

    // 允许：学校层面的公开排名
    expect(serialized).toContain('全球第 62');
    expect(serialized).toContain('全球第 70');

    // 仍不公开：个人绩点、名次、手机号与英语等级
    expect(serialized).not.toMatch(/150-598|CET|GPA|绩点|32\/131|前 ?25%/);
  });

  it('contains the approved research, practice, skills, and contact records', () => {
    expect(publications).toHaveLength(2);
    expect(competitions).toHaveLength(3);
    expect(competitions.some(({ title }) => title.includes('实验物理教学研讨会'))).toBe(true);
    expect(researchProjects).toHaveLength(5);
    expect(researchProjects.some(({ id }) => id === 'lhc-top-tagging')).toBe(false);
    expect(researchProjects.map(({ label }) => label)).toEqual(['R-01', 'R-02', 'R-03', 'R-04', 'R-05']);

    const lumina = researchProjects.find(({ id }) => id === 'lumina-select');
    expect(lumina).toBeDefined();
    expect(lumina.href).toBe('https://github.com/Qiqi532/lumina-select');
    expect(lumina.external).toBe(true);

    const tesla = researchProjects.find(({ id }) => id === 'tesla-scene-studio');
    expect(tesla).toBeDefined();
    expect(tesla.label).toBe('R-05');
    expect(tesla.href).toBe('https://tesla-window-studio-demo.pages.dev/');
    expect(tesla.external).toBe(true);
    expect(tesla.linkLabel).toBe('打开在线演示 ↗');
    expect(tesla.media.src).toContain('images/research/tesla-scene-studio.jpg');
    expect(tesla.details.some((detail) => detail.includes('CC BY 4.0'))).toBe(true);

    expect(researchProjects.filter(({ external }) => external).every(({ linkLabel }) => Boolean(linkLabel))).toBe(true);

    expect(skillGroups.flatMap(({ items }) => items)).toEqual(
      expect.arrayContaining(['Python', 'PyTorch', 'COMSOL', 'Origin', 'SolidWorks', 'AutoCAD', 'LaTeX', 'Photoshop', 'Lightroom', 'Camera Raw', 'Premiere Pro', '无人机航拍']),
    );
    expect(practiceChapters).toHaveLength(3);
    expect(contactChannels.xiaohongshu.href).toBe(
      'https://www.xiaohongshu.com/user/profile/64afebdd000000001f004818',
    );
    expect(contactChannels.xiaohongshu.handle).toBe('9776387705');
  });
});
