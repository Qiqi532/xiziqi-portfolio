const image = (folder, file) => `${import.meta.env.BASE_URL}images/${folder}/${file}`;
const profileImage = (file) => image('profile', file);
const researchImage = (file) => image('research', file);
const practiceImage = (file) => image('practice', file);

export const profile = {
  name: '黄新宏',
  englishName: 'Xinhong Huang',
  role: '中山大学物理学本科生',
  statement: '在公式与光影之间，持续探索。',
  introduction: '关注光纤传感、天文光谱与机器学习，也持续参与校园传播、志愿服务和摄影创作。',
  email: 'huangxh89@mail2.sysu.edu.cn',
};

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
    id: 'lhc-top-tagging', label: 'R-03', title: 'LHC 顶夸克标记', period: '2025.12', status: '课程与方法实践',
    summary: '使用 PyTorch 与 CNN 区分 top 夸克衰变喷注和 QCD 背景喷注。',
    details: ['围绕喷注子结构完成数据表示与分类实验。', '将 CNN 结果与 Mass Drop、HEPTopTagger 等传统物理方法进行比较。'],
    contribution: '高能物理课程项目',
    media: { src: researchImage('lhc-top-tagging.jpg'), alt: 'LHC 顶夸克标记分类结果示例' },
    href: '/research#lhc-top-tagging',
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
  { label: '视觉创作', items: ['Adobe 系列'] },
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

export const personalGallery = [
  { src: profileImage('gallery/01-coast.jpg'), alt: '黄新宏在海边观看日落', ratio: 'portrait', span: 'tall', position: '50% 45%' },
  { src: profileImage('gallery/02-beijing.jpg'), alt: '黄新宏在北京篮球场', ratio: 'landscape', span: 'wide', position: '50% 42%' },
  { src: profileImage('gallery/03-photonics-conference.jpg'), alt: '黄新宏参加光电会议', ratio: 'landscape', span: 'standard', position: '50% 45%' },
  { src: profileImage('gallery/04-national-games.jpg'), alt: '黄新宏参加十五运会志愿服务', ratio: 'portrait', span: 'tall', position: '50% 40%' },
  { src: profileImage('gallery/05-national-games.jpg'), alt: '十五运会志愿服务现场', ratio: 'landscape', span: 'standard', position: '50% 45%' },
  { src: profileImage('gallery/06-national-games.jpg'), alt: '十五运会志愿者合影', ratio: 'landscape', span: 'standard', position: '50% 50%' },
  { src: profileImage('gallery/07-hangzhou.jpg'), alt: '黄新宏在杭州旅行', ratio: 'landscape', span: 'wide', position: '50% 48%' },
  { src: profileImage('gallery/08-nanjing.jpg'), alt: '黄新宏在南京夜景中', ratio: 'landscape', span: 'standard', position: '50% 50%' },
  { src: profileImage('gallery/09-quanzhou.jpg'), alt: '黄新宏在泉州湖边', ratio: 'landscape', span: 'wide', position: '50% 45%' },
  { src: profileImage('gallery/10-fieldwork.jpg'), alt: '黄新宏参加三下乡影像记录', ratio: 'landscape', span: 'wide', position: '50% 45%' },
  { src: profileImage('gallery/11-basketball.jpg'), alt: '黄新宏参加校园篮球赛', ratio: 'portrait', span: 'tall', position: '50% 42%' },
  { src: profileImage('gallery/12-id-photo.jpg'), alt: '黄新宏证件照', ratio: 'portrait', span: 'standard', position: '50% 20%' },
  { src: profileImage('gallery/13-great-wall.jpg'), alt: '黄新宏在长城旅行', ratio: 'landscape', span: 'wide', position: '50% 42%' },
  { src: profileImage('gallery/14-hong-kong.jpg'), alt: '黄新宏在香港街头', ratio: 'portrait', span: 'tall', position: '50% 38%' },
];

export const contactChannels = {
  xiaohongshu: {
    label: '小红书', handle: '9776387705',
    href: 'https://www.xiaohongshu.com/user/profile/64afebdd000000001f004818',
  },
};
