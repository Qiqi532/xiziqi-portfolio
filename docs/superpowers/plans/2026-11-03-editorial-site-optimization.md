# 编辑式个人网站优化实施计划

**Goal:** 按用户已确认的 A 方案，兼顾物理研究、独立开发与摄影，改善首页层级、完整构图、加载与键盘体验，并发布到现有两个平台。

**Architecture:** 沿用 React/Vite 和现有数据源，保留既有个人事实与学校资料。首页展示精选内容，详情页承载完整说明；共享响应式图片组件、路由体验和交互组件，避免引入新框架或外部图片服务。

**Tech Stack:** React 18、React Router 6、CSS Modules、Framer Motion、Pillow、Vitest。

## 实施顺序与文件边界

- [x] `Home.jsx`、`Home.module.css`、`global.css`、`siteContent.js`：首屏学校背景双栏、教育背景优先、三类成果入口、可展开教育卡、六张摄影精选、紧凑实践入口与联系区；首页标题与事实保持一致。
- [x] `Research.*`、`Practice.*`、`About.*`：研究/开发分组、锚点目录、完整技术详情可展开、实践角色成果、原比例照片及图注。
- [x] `Gallery.*`、`Lightbox.*`、`Nav.*`、`LazyImage.*`、`HeroCarousel.*`：精选/分类集合一致，非法分类恢复，灯箱与菜单焦点管理，图片失败/重试，轮播悬停/聚焦暂停、移除可见暂停按钮与减弱动画。
- [x] `scripts/prepare_responsive_images.py`、`imageAssets.json`、`ResponsiveImage.*`、`public/images/responsive/`：去重生成不裁切的 480/960/1600px WebP 和 JPEG，保留原图；所有资源遵守 BASE_URL。
- [x] `App.jsx`、`RouteExperience.*`、`pageMetadata.js`、`index.html`、`vite.config.js`：页面按需加载，顶部/锚点/返回滚动行为、404、中文语言、标题与静态分享元数据。
- [x] 对应行为测试：分类内灯箱导航、键盘焦点、菜单跨断点、图片回退、首页结构与展开资料、路由/子路径。先运行相关测试，再 `npm test`、`npm run build`、`git diff --check`。
- [x] 浏览器核对 375/768/1280/1440px，记录首页篇幅与图片传输体积变化；确认无横向溢出、照片完整、深层链接可用。
- [ ] 提交并推送 master，确认 GitHub Pages 工作流成功；根路径产物部署 Cloudflare 项目 xiziqi-portfolio 生产分支 main，验证新提交与线上资源。

## 验收依据

学校详细资料、全部项目/论文/奖项、全部摄影与个人照片仍可访问。主入口前移，文字对比清楚，手机菜单可关闭，灯箱始终遍历当前集合，失败状态可以恢复。性能报告只陈述实测文件体积与页面布局，不虚构 Lighthouse 分数或 LCP。
