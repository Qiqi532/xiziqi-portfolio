const image = (folder, file) => `${import.meta.env.BASE_URL}images/${folder}/${file}`;
const profileImage = (file) => image('profile', file);
const researchImage = (file) => image('research', file);
const practiceImage = (file) => image('practice', file);
const educationImage = (file) => image('education', file);

export const profile = {
  name: '黄新宏',
  englishName: 'Xinhong Huang',
  role: '中山大学物理与天文学院本科生',
  statement: '在两座校园之间，追问公式与光影。',
  introduction: '2023 年入学，2027 年将赴南京大学物理学院继续深造。两所学校都肇始于二十世纪初，也都以基础学科见长；我在两座校园里学习物理、参与校园媒体与志愿服务，也用相机记录沿途的光线。',
  email: 'huangxh89@mail2.sysu.edu.cn',
};

export const education = [
  {
    id: 'sysu',
    school: '中山大学',
    schoolEn: 'Sun Yat-sen University',
    stage: '本科阶段',
    degree: '本科 · 理学学士',
    college: '物理与天文学院',
    major: '物理学专业',
    period: '2023.09 — 2027.06',
    tags: ['教育部直属', '双一流', '985', '211', '强基计划'],
    motto: '博学 · 审问 · 慎思 · 明辨 · 笃行',
    mottoNote: '孙中山 1924 年为建校题写，语出《礼记·中庸》',
    discipline: { label: '教育部第五轮学科评估', subject: '物理学', grade: 'A-' },
    note: '1924 年由孙中山先生亲手创办，初名国立广东大学，1926 年改称国立中山大学。广州南校园「康乐园」以红砖绿瓦的近代建筑群著称，如今是广州、珠海、深圳三校区五校园的综合性大学，医科与人文社科同具深厚底蕴。',
    rankings: [
      { label: '软科世界大学学术排名', year: '2026', value: '全球第 62' },
      { label: 'QS 世界大学排名', year: '2027', value: '全球第 258' },
      { label: 'THE 世界大学排名', year: '2026', value: '201–250' },
    ],
    media: { src: educationImage('sysu.jpg'), alt: '中山大学康乐园近代建筑群', position: '50% 50%' },
  },
  {
    id: 'nju',
    school: '南京大学',
    schoolEn: 'Nanjing University',
    stage: '硕士阶段',
    degree: '硕士 · 理学硕士',
    college: '物理学院',
    major: '物理学专业',
    period: '2027.09 — 2030.06',
    tags: ['教育部直属', '双一流', '985', '211', '强基计划', 'C9 联盟'],
    motto: '诚朴雄伟 · 励学敦行',
    mottoNote: '「诚朴雄伟」由罗家伦 1932 年提出，2002 年百年校庆补入「励学敦行」',
    discipline: { label: '教育部第五轮学科评估', subject: '物理学', grade: 'A+' },
    note: '前身可追溯至 1902 年创办的三江师范学堂，1928 年定名国立中央大学，1950 年改称南京大学。鼓楼校区的北大楼是标志性建筑，学校以基础学科见长，理科与人文积淀都很深。',
    rankings: [
      { label: '软科世界大学学术排名', year: '2026', value: '全球第 70' },
      { label: 'QS 世界大学排名', year: '2027', value: '全球第 90' },
      { label: 'THE 世界大学排名', year: '2026', value: '全球第 62' },
    ],
    media: { src: educationImage('nju.jpg'), alt: '南京大学校门', position: '50% 45%' },
  },
];

export const heroSlides = [
  { src: profileImage('hero-shanghai.jpg'), alt: '黄新宏在上海旅行', location: '上海', position: '50% 48%', fit: 'cover' },
  { src: profileImage('hero-quanzhou.jpg'), alt: '黄新宏在泉州湖边', location: '泉州', position: '50% 42%', fit: 'cover' },
  { src: profileImage('hero-hangzhou.jpg'), alt: '黄新宏在杭州旅行', location: '杭州', position: '50% 46%', fit: 'cover' },
  { src: profileImage('hero-great-wall.jpg'), alt: '黄新宏在长城旅行', location: '长城', position: '50% 38%', fit: 'cover' },
  { src: profileImage('hero-beijing.jpg'), alt: '黄新宏在北京旅行', location: '北京', position: '50% 44%', fit: 'cover' },
];

export const researchProjects = [
  {
    id: 'optical-sensing', label: 'R-01', title: '光纤温盐同步传感', period: '2024.12 — 2025.12', status: '优秀结题',
    summary: '面向海水温度与盐度同步测量，设计并实现基于 SMF–HCF–CF 微球腔的光纤 Fabry–Perot 传感结构。',
    details: ['调研光纤传感理论，参与传感结构设计与光场仿真。', '通过理论推导和函数反演验证温度—盐度传感原理。', '搭建光谱解调仪控制程序，完成光谱数据获取与信号解读。'],
    contribution: '项目负责人 · 校级立项并优秀结题',
    media: { src: researchImage('project-fiber-structure.jpg'), alt: '光纤温盐传感器结构示意图' },
    href: '/research#optical-sensing',
  },
  {
    id: 'peculiar-stars', label: 'R-02', title: '化学奇异星的证认与探讨', period: '2025.12 — 至今', status: '进行中',
    summary: '基于 LAMOST DR13 光谱，结合物理特征与机器学习方法筛选化学丰度异常恒星。',
    details: ['研读氮增丰场星研究文献，建立光谱标准预处理流程。', '结合物理特征与机器学习方法进行分类筛选。', '后续使用深度学习方法推进异常恒星识别与物理分析。'],
    contribution: '项目负责人 · 校级立项',
    media: { src: researchImage('peculiar-stars-figure.jpg'), alt: 'LAMOST 化学奇异星候选光谱图' },
    href: '/research#peculiar-stars',
  },
  {
    id: 'physics-research-intelligence', label: 'R-03', title: 'Physics Research Intelligence', period: '2026.08 — 至今', status: '进行中',
    summary: '面向个人物理研究的可解释 AI 论文情报平台，聚合公开论文事实，使用可切换大模型完成保守分类与结构化解读，通过确定性、可解释的兴趣评分生成 Today Physics。',
    details: ['聚合 Crossref、OpenAlex、arXiv 公开论文元数据，建立事实层与 AI 解读层分离的数据架构，模型输出不能覆盖原始事实。', '支持 OpenAI、DeepSeek、Gemini、Qwen、Kimi、智谱 GLM 等多模型切换，完成物理方向分类与带证据等级的中文结构化解读。', '实现 Today Physics 可解释推荐、个人收藏库、阅读状态管理与 BullMQ 每日自动化采集流水线。'],
    contribution: '项目负责人 · 独立开发 · 单用户 MVP 已本地试运行',
    media: { src: researchImage('pri-today-physics.jpg'), alt: 'Physics Research Intelligence 平台 Today Physics 首页' },
    href: 'https://github.com/Qiqi532/Physics-Research-Intelligence',
    external: true,
    linkLabel: '访问 GitHub 仓库 ↗',
  },
  {
    id: 'lumina-select', label: 'R-04', title: 'Lumina Select · 光影选片助手', period: '2026.09 — 至今', status: '进行中',
    summary: '本地 AI 智能选片工具：废片剔除 → 相似分组 → 场景自适应评分 → 最佳帧推荐 → 不确定甄选，一键导出保留片；照片全程本地处理、不上传，PyQt6 桌面原生界面，算法核心纯 Python。',
    details: ['基于 PyTorch/OpenCLIP/MUSIQ/MediaPipe 构建多级质量与美学评估链：模糊、过曝/欠曝、闭眼、高度重复照片自动判废。', 'EXIF 连拍分组 + pHash 感知哈希聚类相似照片，场景自适应权重评分并推荐组内最佳帧；组内分差过小时进入 A/B/C/D 人工甄选。', 'SQLite(WAL) 索引 + 断点续跑 + 分块流式内存控制，1000 张全流程实测 61 秒（验收 ≤5 分钟）；pytest 单元测试 + 端到端冒烟，PyInstaller/Inno Setup 打包分发。'],
    contribution: '独立开发 · Apache-2.0 开源',
    media: { src: researchImage('lumina-select.jpg'), alt: 'Lumina Select 光影选片助手人工复核界面' },
    href: 'https://github.com/Qiqi532/lumina-select',
    external: true,
    linkLabel: '访问 GitHub 仓库 ↗',
  },
  {
    id: 'tesla-scene-studio', label: 'R-05', title: 'Tesla Model 3 · Scene Studio', period: '2026.09', status: '在线演示',
    summary: '语音交互方向的实习作业：用纯静态网页展示 Tesla 2018 Model 3，可在影棚与循环道路两套场景间切换，并在道路上叠加四季 × 五种天气的环境矩阵；车窗、车门、前后备箱、灯光、档位与外观既可直接点击车身，也可用中文语音或文字指令控制。',
    details: ['不引入框架与动画库，用 Vite + 原生 JavaScript + Three.js 搭出三层结构：中文指令先解析成标准命令对象，再经统一分发器进入车辆与环境控制器，按钮、车身点击、语音与文字四条入口共用同一套状态机。', '车辆控制覆盖四门与前后备箱铰链、灯光（刹车灯与倒车灯随档位和车速自动联动）、P/D/R 档位与视觉速度、五种车漆与三种轮毂；车门未关闭时拒绝挂档，行驶中锁定车门与备箱，D 与 R 换向须先停车。', '语音链路三级降级：浏览器本机中文语言包 → 浏览器语音服务 → 按需加载浏览器端 Whisper tiny；支持用“然后 / 再”串联多条指令，歧义指令不猜测执行，文字输入始终可用，且不保存录音与转写历史。', '工程侧包含 49 个单元测试与构建前的 GLB 校验（16 个必需节点 / 14 个必需材质），车模沿用 Ameer Studio 的 CC BY 4.0 授权并在页面常驻署名。'],
    contribution: '独立开发 · 源文件 5,140 行 · 纯前端静态部署',
    media: { src: researchImage('tesla-scene-studio.jpg'), alt: 'Tesla Model 3 · Scene Studio 三维交互演示界面' },
    href: 'https://tesla-window-studio-demo.pages.dev/',
    external: true,
    linkLabel: '打开在线演示 ↗',
  },
];

export const publications = [
  {
    title: 'Enhanced temperature sensing performance of pure silica MZI and FPI sensors using the harmonic Vernier effect',
    journal: 'Measurement 271 (2026) 120953', authorship: '共同第一作者',
    href: 'https://doi.org/10.1016/j.measurement.2026.120953',
    image: researchImage('paper-measurement.jpg'), imageAlt: 'Measurement 论文首页',
    figure: researchImage('measurement-figure.jpg'), figureAlt: '谐波游标效应温度光谱对比图',
  },
  {
    title: 'Low-crosstalk compact fiber-optic temperature-salt sensor based on dual-cavity functional partitioning design in a single tube',
    journal: 'Optical Fiber Technology 98 (2026) 104548', authorship: '第三作者',
    href: 'https://doi.org/10.1016/j.yofte.2025.104548',
    image: researchImage('paper-optical-fiber-technology.jpg'), imageAlt: 'Optical Fiber Technology 论文首页',
    figure: researchImage('project-fiber-structure.jpg'), figureAlt: '单管双腔光纤传感结构示意图',
  },
];

export const competitions = [
  {
    year: '2025', title: '全国大学生数学建模竞赛', result: '本科组广东省一等奖 · B 题“碳化硅外延层厚度的确定”',
    certificate: researchImage('award-modeling.jpg'), certificateAlt: '2025 年全国大学生数学建模竞赛广东省一等奖证书',
  },
  {
    year: '2025', title: '第二十六届华南大学生物理实验设计大赛', result: '省级二等奖 · 温度自补偿型光纤弱压力传感装置',
    certificate: researchImage('award-physics-experiment.jpg'), certificateAlt: '2025 年华南大学生物理实验设计大赛二等奖证书',
  },
  {
    year: '2026', title: '第十三届全国高等学校实验物理教学研讨会论文评比', result: '科研类一等奖 · Measurement 论文',
    certificate: researchImage('award-seminar.jpg'), certificateAlt: '第十三届全国高等学校实验物理教学研讨会科研类一等奖证书',
  },
];

export const skillGroups = [
  { label: '研究计算', items: ['Python', 'PyTorch'] },
  { label: '仿真与分析', items: ['COMSOL', 'Origin', '光谱数据处理'] },
  { label: '工程表达', items: ['SolidWorks', 'AutoCAD'] },
  { label: '学术写作', items: ['LaTeX', 'Microsoft Office'] },
  { label: 'AI 辅助开发', items: ['Codex', 'Claude', 'Vibe Coding'] },
  { label: '视觉创作', items: ['Photoshop', 'Lightroom', 'Camera Raw', 'Premiere Pro', 'Nikon Z5 微单摄影', '无人机航拍'] },
];

export const practiceChapters = [
  {
    label: 'P-01', title: '校园传播与媒体采用',
    summary: '以影像记录校园、学术现场与公共议题，让作品进入更广阔的传播空间。',
    body: ['参与校党委宣传部、校团委宣传部工作，并负责物理与天文学院新媒体中心，累计为校级新媒体供稿图片上百张。', '摄影作品见于《光明日报》与“中国国家旅游”公众号，并成为视觉中国、海丝泉州签约摄影师。'],
    media: [
      { src: practiceImage('guangming-daily-page.jpg'), alt: '光明日报《千年古树的现代生存密码》版面', caption: '《光明日报》2025 年 5 月 6 日第 07 版 · 黄新宏摄/光明图片', fit: 'contain' },
      { src: practiceImage('china-national-travel.jpg'), alt: '中国国家旅游公众号采用的校园春日照片', caption: '“中国国家旅游”《春日赏花图鉴·大学篇》', fit: 'cover' },
    ],
    links: [{ label: '阅读中国国家旅游原文', href: 'https://mp.weixin.qq.com/s/Z0PCQqgu3jJmgwXXOfa8ng' }],
  },
  {
    label: 'P-02', title: '十五运会志愿服务',
    summary: '在大型赛事现场承担志愿服务，以稳定、协作和责任感完成共同任务。',
    body: ['参与第十五届全国运动会赛事服务，获中山大学十五运会先进个人及优秀志愿者。', '持续参与公益服务，获评中山大学二星志愿者。'],
    media: [1, 2, 3].map((number) => ({ src: practiceImage(`national-games-${number}.jpg`), alt: `十五运会志愿服务现场照片 ${number}`, fit: 'cover' })),
    links: [],
  },
  {
    label: 'P-03', title: '社会实践与影像记录',
    summary: '在田野和社区中用影像参与真实项目，记录文化与人的联系。',
    body: ['参与 2025 年三下乡项目《锦绣连山，针线间的壮乡记忆》，项目获评省级“优秀”。'],
    media: [{ src: practiceImage('fieldwork.jpg'), alt: '三下乡社会实践影像记录现场', fit: 'cover' }],
    links: [],
  },
];

export const selectedPhotography = [
  { key: 'campus', category: '校园', title: '校园日常', href: '/portfolio?category=campus' },
  { key: 'landscape', category: '风光', title: '城市与远方', href: '/portfolio?category=landscape' },
  { key: 'portrait', category: '人像', title: '人与片刻', href: '/portfolio?category=portrait' },
];

export const photography = {
  lead: '在校园、城市与旅途之间持续按下快门，关注光线、空间与人的关系。长期拍摄校园日常、城市风光与人像三类题材，作品见于《光明日报》与「中国国家旅游」，现为视觉中国、海丝泉州签约摄影师。',
  social: '同时以「曦熙子柒」在小红书运营摄影与旅行内容，分享校园生活、摄影攻略与旅行见闻，累计收获 1.8 万+ 获赞与收藏。',
  highlights: [
    { value: '签约摄影师', note: '视觉中国 · 海丝泉州' },
    { value: '1.8 万+ 获赞与收藏', note: '小红书「曦熙子柒」' },
    { value: '三大长期题材', note: '校园日常 / 城市与远方 / 人与片刻' },
  ],
  equipment: ['Nikon Z5 微单相机', '奥林巴斯 OM-1 胶片相机', 'DJI Action 5 Pro', '无人机航拍'],
  postTools: ['Photoshop', 'Lightroom', 'Camera Raw', 'Premiere Pro'],
};

export const personalGallery = [
  { src: profileImage('gallery/15-hong-kong.jpg'), alt: '黄新宏在香港街头', ratio: 'portrait', span: 'tall', position: '50% 45%' },
  { src: profileImage('gallery/01-fieldwork.jpg'), alt: '黄新宏参加三下乡社会实践影像记录', ratio: 'landscape', span: 'wide', position: '50% 50%' },
  { src: profileImage('gallery/11-meizhou-island.jpg'), alt: '黄新宏在湄洲岛旅行', ratio: 'portrait', span: 'tall', position: '50% 50%' },
  { src: profileImage('gallery/02-shanghai.jpg'), alt: '黄新宏在上海旅行', ratio: 'landscape', span: 'wide', position: '50% 50%' },
  { src: profileImage('gallery/03-photonics-conference.jpg'), alt: '黄新宏参加光电会议', ratio: 'landscape', span: 'standard', position: '50% 50%' },
  { src: profileImage('gallery/04-national-games.jpg'), alt: '黄新宏参加十五运会志愿服务', ratio: 'landscape', span: 'wide', position: '50% 50%' },
  { src: profileImage('gallery/12-basketball.jpg'), alt: '黄新宏参加校园篮球赛', ratio: 'portrait', span: 'tall', position: '50% 50%' },
  { src: profileImage('gallery/05-national-games-2.jpg'), alt: '十五运会志愿服务现场', ratio: 'landscape', span: 'standard', position: '50% 50%' },
  { src: profileImage('gallery/06-beijing.jpg'), alt: '黄新宏在北京旅行', ratio: 'landscape', span: 'wide', position: '50% 50%' },
  { src: profileImage('gallery/07-nanjing.png'), alt: '黄新宏在南京夜景中', ratio: 'landscape', span: 'standard', position: '50% 50%' },
  { src: profileImage('gallery/08-national-guard.jpg'), alt: '黄新宏参加国旗护卫队活动', ratio: 'landscape', span: 'wide', position: '50% 50%' },
  { src: profileImage('gallery/09-hangzhou.jpg'), alt: '黄新宏在杭州旅行', ratio: 'landscape', span: 'wide', position: '50% 50%' },
  { src: profileImage('gallery/10-quanzhou.jpg'), alt: '黄新宏在泉州湖边', ratio: 'landscape', span: 'standard', position: '50% 50%' },
  { src: profileImage('gallery/13-disney.jpg'), alt: '黄新宏在迪士尼旅途', ratio: 'landscape', span: 'standard', position: '50% 50%' },
  { src: profileImage('gallery/14-great-wall.jpg'), alt: '黄新宏在长城旅行', ratio: 'landscape', span: 'wide', position: '50% 50%' },
  { src: profileImage('gallery/16-hong-kong-2.jpg'), alt: '黄新宏在香港城市风光', ratio: 'landscape', span: 'standard', position: '50% 50%' },
];

export const contactChannels = {
  github: {
    label: 'GitHub', handle: 'Qiqi532',
    href: 'https://github.com/Qiqi532',
  },
  xiaohongshu: {
    label: '小红书', handle: '9776387705',
    href: 'https://www.xiaohongshu.com/user/profile/64afebdd000000001f004818',
  },
  wechat: {
    label: '微信', handle: 'Xizq532-H',
  },
};
