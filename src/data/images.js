// Xiziqi's photography portfolio
// Photos stored in public/images/campus/, landscape/, portrait/

const base = `${import.meta.env.BASE_URL}images`;

const campusFiles = [
  '20241006-DSC_4473.jpg',
  '20250625-DSC_8875-拷贝.jpg',
  'DSC_0424-拷贝.jpg',
  'DSC_0451-拷贝.jpg',
  'DSC_0456.jpg',
  'DSC_1727-拷贝.jpg',
  'DSC_1989-拷贝.jpg',
];

const landscapeFiles = [
  '20260307-DSC_1064-拷贝.jpg',
  'DSC_3968-拷贝.jpg',
  'DSC_4071-拷贝.jpg',
  'DSC_42682.jpg',
  'DSC_8817-26.jpg',
  'b.jpg',
  'beij.jpg',
  'hk.jpg',
  'hongkong.jpg',
  '乍浦路桥.jpg',
  '北京天际线.jpg',
];

const portraitFiles = [
  'DSC_39211.jpg',
  'DSC_4010.jpg',
  'DSC_4743.jpg',
  'b1-拷贝.jpg',
  'lzy.jpg',
  'lzy2.jpg',
  '中珠中山像旁.jpg',
  '中珠逸仙路.jpg',
  '中珠音乐厅旁.jpg',
];

const personalPhotos = [
  { file: '01-fieldwork.jpg', title: '三下乡实践', aspect: 'landscape' },
  { file: '02-shanghai.jpg', title: '上海旅行', aspect: 'landscape' },
  { file: '03-photonics-conference.jpg', title: '光电会议', aspect: 'landscape' },
  { file: '04-national-games.jpg', title: '全运会志愿服务', aspect: 'landscape' },
  { file: '05-national-games-2.jpg', title: '全运会现场', aspect: 'landscape' },
  { file: '06-beijing.jpg', title: '北京旅行', aspect: 'landscape' },
  { file: '07-nanjing.png', title: '南京夜色', aspect: 'landscape' },
  { file: '08-national-guard.jpg', title: '国旗护卫队', aspect: 'landscape' },
  { file: '09-hangzhou.jpg', title: '杭州旅行', aspect: 'landscape' },
  { file: '10-quanzhou.jpg', title: '泉州湖畔', aspect: 'landscape' },
  { file: '11-meizhou-island.jpg', title: '湄洲岛旅行', aspect: 'portrait' },
  { file: '12-basketball.jpg', title: '篮球赛场', aspect: 'portrait' },
  { file: '13-disney.jpg', title: '迪士尼旅途', aspect: 'landscape' },
  { file: '14-great-wall.jpg', title: '长城旅行', aspect: 'landscape' },
  { file: '15-hong-kong.jpg', title: '香港街头', aspect: 'portrait' },
  { file: '16-hong-kong-2.jpg', title: '香港城市风光', aspect: 'landscape' },
];

const categoryNames = {
  campus: '校园',
  landscape: '风光',
  portrait: '人像',
  personal: '个人照',
};

function makeImages(files, category, startId) {
  const label = categoryNames[category] || category;
  return files.map((file, i) => ({
    id: startId + i,
    src: `${base}/${category}/${encodeURIComponent(file)}`,
    thumb: `${base}/${category}/${encodeURIComponent(file)}`,
    category,
    title: `${label} · ${String(i + 1).padStart(2, '0')}`,
    aspect: 'landscape',
  }));
}

function makePersonalImages(photos, startId) {
  return photos.map(({ file, title, aspect }, index) => ({
    id: startId + index,
    src: `${base}/profile/gallery/${file}`,
    thumb: `${base}/profile/gallery/${file}`,
    category: 'personal',
    title,
    aspect,
  }));
}

export const images = [
  ...makeImages(campusFiles, 'campus', 1),
  ...makeImages(landscapeFiles, 'landscape', 100),
  ...makeImages(portraitFiles, 'portrait', 200),
  ...makePersonalImages(personalPhotos, 300),
];

export const categories = [
  { key: 'all', label: '全部' },
  { key: 'campus', label: '校园' },
  { key: 'landscape', label: '风光' },
  { key: 'portrait', label: '人像' },
  { key: 'personal', label: '个人照' },
];
