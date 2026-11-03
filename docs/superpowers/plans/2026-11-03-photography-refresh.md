# 摄影作品与个人照更新计划

**目标：** 更新珠港澳大学生摄影展作品与特别推荐介绍、个人照和小红书数据，并同步 GitHub Pages 与 Cloudflare Pages。

**实现方式：** 沿用 React/Vite、现有冷灰蓝视觉与摄影分类。照片保留原构图，网站导出文件不保留源文件名中的私人信息和 EXIF。小红书卡片供首页与摄影页复用。

**补充需求：** 摄影页顶部将摄影展与签约摄影师并列展示；签约平台采用用户原有资料中的视觉中国、海丝泉州，窄屏依次排列。

- [x] 用联系表、尺寸和感知相似度核对新旧照片；在 `scripts/prepare_exhibition_assets.py` 记录可重复的压缩导入方式，仅删除网站内已确认重复的旧资源。
- [x] 更新 `src/data/images.js` 的作品标题、尺寸、缩略图和个人照；更新 `src/data/siteContent.js` 的首屏、个人相册、摄影介绍、展览及小红书数据。
- [x] 在 `src/components/PhotographyCreator.*` 实现独立小红书卡片，展示 1.9 万点赞、近 500 粉丝、内容主题及现有主页链接。
- [x] 更新 `Home.*`、`Portfolio.*`、`About.*`、`HeroCarousel.*` 与 `Gallery.*`，保持原图比例，让首屏和摄影作品完整显示；作品仍可筛选、点击放大。
- [x] 更新数据、画廊和页面测试。相关测试及全站 12 文件 / 28 用例通过；`npm run build` 和 `git diff --check` 通过。浏览器核对桌面、375px 窄屏、筛选与竖幅作品放大，窄屏无横向溢出。
发布步骤：经验证后提交并推送 `origin master`，确认 GitHub Pages 工作流；以根路径构建产物部署 Cloudflare 生产分支 `main`，确认两个线上站点及资源。
