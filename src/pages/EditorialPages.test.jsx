import { fireEvent, render, screen, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Research from './Research';
import Practice from './Practice';
import About from './About';
import { personalGallery, practiceChapters, researchProjects } from '../data/siteContent';

it('separates physics research and development with valid section links', () => {
  render(<MemoryRouter><Research /></MemoryRouter>);
  expect(within(screen.getByRole('region', { name: '物理研究' })).getAllByRole('article')).toHaveLength(2);
  expect(within(screen.getByRole('region', { name: '独立开发' })).getAllByRole('article')).toHaveLength(3);
  const links = within(screen.getByRole('navigation', { name: '研究学习页内导航' })).getAllByRole('link');
  expect(screen.getAllByRole('heading', { level: 2 }).map((heading) => heading.textContent)).toEqual([
    '物理研究', '代表论文', '竞赛与奖项', '独立开发', '实习经历', '工具与方法',
  ]);
  expect(links.map((link) => link.textContent)).toEqual(['物理研究', '论文', '奖项', '独立开发', '实习经历', '工具']);
  expect(links.map((link) => link.getAttribute('href'))).toEqual([
    '#physics-projects', '#publications', '#competitions', '#development-projects', '#internships', '#skills',
  ]);
  links.forEach((link) => expect(document.getElementById(link.getAttribute('href').slice(1))).toBeInTheDocument());
  researchProjects.forEach((project) => {
    const article = document.getElementById(project.id);
    expect(within(article).getByText(project.contribution)).toBeInTheDocument();
    const summary = within(article).getByText('展开方法与实现');
    expect(summary.closest('details')).not.toHaveAttribute('open');
    project.details.forEach((detail) => expect(within(summary.closest('details')).getByText(detail)).toBeInTheDocument());
    fireEvent.click(summary);
    expect(summary.closest('details')).toHaveAttribute('open');
  });
});

it('shows practice roles and results and retains equipment details on request', () => {
  render(<MemoryRouter><Practice /></MemoryRouter>);
  practiceChapters.forEach((chapter) => {
    const article = screen.getByRole('article', { name: chapter.title });
    expect(within(article).getByText('我的角色')).toBeInTheDocument();
    expect(within(article).getByText('实践成果')).toBeInTheDocument();
    chapter.body.forEach((paragraph) => expect(within(article).getByText(paragraph)).toBeInTheDocument());
  });
  const summary = screen.getByText('展开设备与拍摄方式');
  expect(summary.closest('details')).not.toHaveAttribute('open');
  fireEvent.click(summary);
  expect(summary.closest('details')).toHaveAttribute('open');
});

it('gives each complete personal photograph a readable caption', () => {
  render(<MemoryRouter><About /></MemoryRouter>);
  const figures = screen.getAllByTestId('personal-photo');
  expect(figures).toHaveLength(personalGallery.length);
  figures.forEach((figure) => {
    const image = within(figure).getByRole('img');
    expect(within(figure).getByText(image.alt)).toBeInTheDocument();
    expect(image).toHaveAttribute('width');
    expect(image).toHaveAttribute('height');
  });
});
