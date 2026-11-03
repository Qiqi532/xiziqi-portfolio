import { render, screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import PhotographyCreator from './PhotographyCreator';

const creator = {
  name: '曦熙子柒',
  href: 'https://www.xiaohongshu.com/user/profile/64afebdd000000001f004818',
  description: '分享摄影作品、校园日常与旅途见闻。',
  stats: [{ value: '1.9 万', label: '点赞' }, { value: '近 500', label: '粉丝' }],
  topics: ['摄影作品', '校园日常', '旅行记录', '摄影攻略'],
};

describe('PhotographyCreator', () => {
  it('presents the account, reported statistics, and sharing topics in a named section', () => {
    render(<PhotographyCreator creator={creator} />);

    const card = screen.getByRole('region', { name: '小红书创作' });
    expect(within(card).getByRole('heading', { name: '在小红书，分享镜头内外' })).toBeInTheDocument();
    expect(within(card).getByText('@曦熙子柒')).toBeInTheDocument();
    expect(within(card).getByText(creator.description)).toBeInTheDocument();
    creator.stats.forEach(({ value, label }) => {
      const term = within(card).getByText(label, { selector: 'dt' });
      expect(term.parentElement.querySelector('dd')).toHaveTextContent(value);
    });
    expect(within(card).getByRole('list', { name: '分享主题' }).children).toHaveLength(4);
    creator.topics.forEach((topic) => expect(within(card).getByText(topic)).toBeInTheDocument());
  });

  it('links to the existing profile in a separate tab', () => {
    render(<PhotographyCreator creator={creator} />);

    const link = screen.getByRole('link', { name: '去小红书看看' });
    expect(link).toHaveAttribute('href', creator.href);
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });
});
