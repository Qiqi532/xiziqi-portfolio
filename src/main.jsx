import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './styles/global.css';

// 路由基路径跟随构建期 base，避免与部署平台耦合。
// BASE_URL 形如 '/' 或 '/xiziqi-portfolio/'，这里去掉尾部斜杠交给 BrowserRouter。
const basename = import.meta.env.BASE_URL.replace(/\/$/, '') || '/';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter basename={basename}>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
