import { lazy, Suspense } from 'react';
import { Routes, Route, Navigate, Link } from 'react-router-dom';
import { MotionConfig } from 'framer-motion';
import Nav from './components/Nav';
import Footer from './components/Footer';
import Home from './pages/Home';
import RouteExperience from './components/RouteExperience';

const Research = lazy(() => import('./pages/Research'));
const Practice = lazy(() => import('./pages/Practice'));
const Portfolio = lazy(() => import('./pages/Portfolio'));
const About = lazy(() => import('./pages/About'));

function NotFound() {
  return <div className="not-found container"><span>404 / PAGE NOT FOUND</span><h1>这条路还没有留下足迹。</h1><p>这个地址暂时没有内容，可以回到主页，继续看看研究、项目与沿途的影像。</p><Link to="/">返回主页 →</Link></div>;
}

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <div className="grain-overlay" />
      <a className="skip-link" href="#main-content">跳到主要内容</a>
      <Nav />
      <main id="main-content" tabIndex={-1}>
        <Suspense fallback={<div className="route-loading" role="status">正在打开页面…</div>}>
          <RouteExperience><Routes>
            <Route path="/" element={<Home />} />
            <Route path="/research" element={<Research />} />
            <Route path="/practice" element={<Practice />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Navigate to="/about" replace />} />
            <Route path="*" element={<NotFound />} />
          </Routes></RouteExperience>
        </Suspense>
      </main>
      <Footer />
    </MotionConfig>
  );
}
