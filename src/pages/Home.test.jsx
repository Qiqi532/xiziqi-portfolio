import { fireEvent, render, screen, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Home from './Home';

it('renders an editorial homepage while preserving the detailed school records', () => {
  render(<MemoryRouter><Home /></MemoryRouter>);
  const introduction = screen.getByRole('heading', { level: 1, name: /中山大学.*南京大学/ }).closest('section');
  expect(within(introduction).getByRole('heading', { level: 1 })).toBeInTheDocument();
  expect(within(introduction).getByText(/2027 年将赴南京大学继续深造/)).toBeInTheDocument();
  expect(within(introduction).queryByRole('link', { name: /了解教育背景|了解研究方向/ })).not.toBeInTheDocument();
  expect(screen.getByRole('region', { name: '教育背景' })).toHaveAttribute('id', 'education');
  expect(screen.getByText('SYSU → NJU · PHYSICS · LIGHT · CODE')).toBeInTheDocument();
  expect(screen.getByRole('img', { name: '黄新宏在摄影分享现场' })).toBeInTheDocument();
  expect(screen.getByRole('region', { name: '小红书创作' })).toHaveTextContent('1.9 万');
  expect(screen.getByRole('region', { name: '小红书创作' })).toHaveTextContent('近 500');
  expect(screen.getByRole('link', { name: /入展作品 · 特别推荐/ })).toHaveAttribute('href', '/portfolio?category=exhibition');
  const schoolSummaries = screen.getAllByText('校史、校训与公开资料');
  expect(schoolSummaries).toHaveLength(2);
  schoolSummaries.forEach((summary) => {
    expect(summary.closest('details')).not.toHaveAttribute('open');
    fireEvent.click(summary);
    expect(summary.closest('details')).toHaveAttribute('open');
  });
  expect(screen.getByRole('heading', { name: '教育背景' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { level: 3, name: /中山大学/ })).toBeInTheDocument();
  expect(screen.getByRole('heading', { level: 3, name: /南京大学/ })).toBeInTheDocument();
  expect(screen.getByText('物理与天文学院 · 物理学专业')).toBeInTheDocument();
  expect(screen.getByText('物理学院 · 物理学专业')).toBeInTheDocument();
  expect(screen.getByText('博学 · 审问 · 慎思 · 明辨 · 笃行')).toBeInTheDocument();
  expect(screen.getByText('诚朴雄伟 · 励学敦行')).toBeInTheDocument();
  expect(screen.getAllByText('教育部第五轮学科评估 · 物理学')).toHaveLength(2);
  expect(screen.getByText('A-')).toBeInTheDocument();
  expect(screen.getByText('A+')).toBeInTheDocument();
  for (const label of ['985', '211', '双一流']) {
    expect(screen.getAllByText(label)).toHaveLength(2);
    screen.getAllByText(label).forEach((tag) => expect(tag.closest('details')).toBeNull());
  }
  expect(screen.getByText('A-').closest('details')).toBeNull();
  expect(screen.getByText('A+').closest('details')).toBeNull();
  expect(screen.getByRole('img', { name: /中山大学康乐园近代建筑群/ })).toBeInTheDocument();
  expect(screen.getByRole('img', { name: /南京大学校门/ })).toBeInTheDocument();
  expect(screen.queryByText('01 / PORTRAIT')).not.toBeInTheDocument();
  expect(screen.queryByRole('heading', { name: '研究之外的个人切面' })).not.toBeInTheDocument();
  // 实践卡片标题按语义断成两行，避免末字掉到第二行
  const practiceCards = ['校园传播与媒体采用', '十五运会志愿服务', '社会实践与影像记录', '影石校园影像创作者'];
  practiceCards.forEach((title) => {
    const heading = screen.getByText(title);
    expect(heading.tagName).toBe('H3');
    expect(heading.querySelectorAll('br')).toHaveLength(1);
  });

  expect(screen.getByRole('link', { name: /进入研究学习页/ })).toHaveAttribute('href', '/research');
  expect(screen.getByRole('link', { name: /浏览全部摄影作品/ })).toHaveAttribute('href', '/portfolio');
  expect(screen.getByRole('link', { name: /小红书主页/ })).toHaveAttribute(
    'href',
    'https://www.xiaohongshu.com/user/profile/64afebdd000000001f004818',
  );
  expect(screen.getByText('9776387705')).toBeInTheDocument();
  expect(screen.getByRole('button', { name: '复制微信号' })).toBeInTheDocument();
});

it('puts education immediately after the introduction and before selected work, photography and practice', () => {
  render(<MemoryRouter><Home /></MemoryRouter>);
  const sections = screen.getAllByRole('region').map((section) => section.getAttribute('aria-labelledby'));
  expect(sections.slice(0, 3)).toEqual(['home-title', 'education-title', 'work-title']);
  expect(sections.indexOf('work-title')).toBeLessThan(sections.indexOf('photography-title'));
  expect(sections.indexOf('photography-title')).toBeLessThan(sections.indexOf('practice-title'));
  expect(within(screen.getByRole('region', { name: '最近，在做这些事' })).getAllByRole('link')).toHaveLength(3);
  expect(within(screen.getByRole('region', { name: '把看见的光留下来' })).getAllByRole('img')).toHaveLength(6);
});
