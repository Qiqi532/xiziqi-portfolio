import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Home from './Home';

it('renders the long-form personal homepage entry points', () => {
  render(<MemoryRouter><Home /></MemoryRouter>);
  expect(screen.getByRole('heading', { name: '我拍下光，也想知道它从哪里来。' })).toBeInTheDocument();
  expect(screen.getByText(/2027 年将赴南京大学继续深造/)).toBeInTheDocument();
  expect(screen.getByText('SYSU → NJU · PHYSICS · LIGHT · CODE')).toBeInTheDocument();
  expect(screen.getByRole('img', { name: /上海/ })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: '在两座百年学府里读书' })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: /中山大学/ })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: /南京大学/ })).toBeInTheDocument();
  expect(screen.getByText('物理与天文学院 · 物理学专业')).toBeInTheDocument();
  expect(screen.getByText('物理学院 · 物理学专业')).toBeInTheDocument();
  expect(screen.getByText('博学 · 审问 · 慎思 · 明辨 · 笃行')).toBeInTheDocument();
  expect(screen.getByText('诚朴雄伟 · 励学敦行')).toBeInTheDocument();
  expect(screen.getAllByText('教育部第五轮学科评估 · 物理学')).toHaveLength(2);
  expect(screen.getByText('A-')).toBeInTheDocument();
  expect(screen.getByText('A+')).toBeInTheDocument();
  expect(screen.getByRole('img', { name: /中山大学康乐园近代建筑群/ })).toBeInTheDocument();
  expect(screen.getByRole('img', { name: /南京大学校门/ })).toBeInTheDocument();
  expect(screen.queryByText('01 / PORTRAIT')).not.toBeInTheDocument();
  expect(screen.queryByRole('heading', { name: '研究之外的个人切面' })).not.toBeInTheDocument();
  expect(screen.getByRole('link', { name: /进入研究学习页/ })).toHaveAttribute('href', '/research');
  expect(screen.getByRole('link', { name: /浏览全部摄影作品/ })).toHaveAttribute('href', '/portfolio');
  expect(screen.getByRole('link', { name: /小红书主页/ })).toHaveAttribute(
    'href',
    'https://www.xiaohongshu.com/user/profile/64afebdd000000001f004818',
  );
  expect(screen.getByText('9776387705')).toBeInTheDocument();
  expect(screen.getByRole('button', { name: '复制微信号' })).toBeInTheDocument();
});
