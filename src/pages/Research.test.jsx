import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Research from './Research';

it('renders approved research projects', () => {
  render(<MemoryRouter><Research /></MemoryRouter>);
  expect(screen.getByRole('heading', { name: '研究学习' })).toBeInTheDocument();
  expect(screen.getByText('光纤温盐同步传感')).toBeInTheDocument();
  expect(screen.getByText('化学奇异星的证认与探讨')).toBeInTheDocument();
  expect(screen.getByText('LHC 顶夸克标记')).toBeInTheDocument();
  expect(screen.getByText('共同第一作者')).toBeInTheDocument();
  expect(screen.getByText(/第十三届全国高等学校实验物理教学研讨会/)).toBeInTheDocument();
  expect(screen.getByRole('img', { name: /研讨会.*一等奖证书/ })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: '研究计算' })).toBeInTheDocument();
  expect(screen.getByText('SolidWorks')).toBeInTheDocument();
});
