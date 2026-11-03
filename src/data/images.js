// Xiziqi's photography portfolio
// Photos stored in public/images/campus/, landscape/, portrait/

const base = `${import.meta.env.BASE_URL}images`;

const campusFiles = [
  ['20250625-DSC_8875-拷贝.jpg', 1600, 1068],
  ['DSC_0424-拷贝.jpg', 1600, 1068],
  ['DSC_0451-拷贝.jpg', 1600, 1068],
  ['DSC_1727-拷贝.jpg', 1600, 1068],
  ['DSC_1989-拷贝.jpg', 1600, 900],
];

const landscapeFiles = [
  ['DSC_3968-拷贝.jpg', 1600, 900],
  ['DSC_4071-拷贝.jpg', 1600, 900],
  ['DSC_42682.jpg', 1600, 900],
  ['DSC_8817-26.jpg', 1600, 900],
  ['b.jpg', 1600, 900],
  ['beij.jpg', 1600, 2397],
  ['hk.jpg', 1600, 900],
  ['hongkong.jpg', 1600, 1068],
  ['乍浦路桥.jpg', 1600, 1068],
  ['北京天际线.jpg', 1600, 900],
];

const portraitFiles = [
  ['DSC_39211.jpg', 6016, 4016],
  ['DSC_4010.jpg', 1600, 1068],
  ['DSC_4743.jpg', 1600, 1068],
  ['b1-拷贝.jpg', 1600, 2133],
  ['lzy.jpg', 1600, 1068],
  ['lzy2.jpg', 1600, 900],
  ['中珠中山像旁.jpg', 1600, 2397],
  ['中珠逸仙路.jpg', 1600, 2402],
  ['中珠音乐厅旁.jpg', 1600, 2397],
];

const exhibitionPhotos = [
  { file: 'exhibition-campus-dawn.jpg', title: '晨曦中的校园', category: 'campus', width: 2400, height: 1602 },
  { file: 'exhibition-macau-fireworks.jpg', title: '烟花节中的澳门塔', category: 'landscape', width: 2400, height: 1350 },
  { file: 'exhibition-kennedy-town.jpg', title: '坚尼地城的城市切片', category: 'landscape', width: 1602, height: 2400 },
  { file: 'exhibition-concert-hall.jpg', title: '繁花中的中珠音乐厅', category: 'campus', width: 2400, height: 1602 },
  { file: 'exhibition-sea-cliffs.jpg', title: '海蚀巨壁', category: 'landscape', width: 1800, height: 2400 },
  { file: 'exhibition-kangyuan.jpg', title: '康园岁影', category: 'campus', width: 2400, height: 1602 },
  { file: 'exhibition-racecourse-station.jpg', title: '马会站', category: 'landscape', width: 1800, height: 2400 },
];

const personalPhotos = [
  { file: '17-photography-talk.jpg', title: '摄影分享现场', aspect: 'landscape', width: 1536, height: 1024 },
  { file: '01-fieldwork.jpg', title: '三下乡实践', aspect: 'landscape' },
  { file: '02-shanghai.jpg', title: '上海旅行', aspect: 'landscape' },
  { file: '03-photonics-conference.jpg', title: '光电会议', aspect: 'landscape', height: 1365 },
  { file: '04-national-games.jpg', title: '全运会志愿服务', aspect: 'landscape' },
  { file: '05-national-games-2.jpg', title: '全运会现场', aspect: 'landscape', height: 1152 },
  { file: '06-beijing.jpg', title: '北京旅行', aspect: 'landscape' },
  { file: '07-nanjing.png', title: '南京夜色', aspect: 'landscape', width: 1536, height: 1024 },
  { file: '08-national-guard.jpg', title: '国旗护卫队', aspect: 'landscape' },
  { file: '09-hangzhou.jpg', title: '杭州旅行', aspect: 'landscape' },
  { file: '10-quanzhou.jpg', title: '泉州湖畔', aspect: 'landscape', height: 1365 },
  { file: '11-meizhou-island.jpg', title: '湄洲岛旅行', aspect: 'portrait', width: 1367, height: 2048 },
  { file: '12-basketball.jpg', title: '篮球赛场', aspect: 'portrait', width: 1365, height: 2048 },
  { file: '13-disney.jpg', title: '迪士尼旅途', aspect: 'landscape', height: 1536 },
  { file: '14-great-wall.jpg', title: '长城旅行', aspect: 'landscape', height: 1536 },
  { file: '15-hong-kong.jpg', title: '香港街头', aspect: 'portrait', width: 1536, height: 2048 },
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
  return files.map(([file, width, height], i) => ({
    id: startId + i,
    src: `${base}/${category}/${encodeURIComponent(file)}`,
    thumb: `${base}/${category}/${encodeURIComponent(file)}`,
    category,
    title: `${label} · ${String(i + 1).padStart(2, '0')}`,
    aspect: width < height ? 'portrait' : 'landscape',
    width,
    height,
  }));
}

function makePersonalImages(photos, startId) {
  return photos.map(({ file, title, aspect, width = 2048, height = 1367 }, index) => ({
    id: startId + index,
    src: `${base}/profile/gallery/${file}`,
    thumb: `${base}/profile/gallery/${file}`,
    category: 'personal',
    title,
    aspect,
    width,
    height,
  }));
}

export const images = [
  ...exhibitionPhotos.map(({ file, category, width, height, title }, index) => ({
    id: 400 + index,
    src: `${base}/${category}/${file}`,
    thumb: `${base}/thumbnails/${category}/${file}`,
    category,
    title,
    width,
    height,
    aspect: width < height ? 'portrait' : 'landscape',
    exhibition: true,
  })),
  ...makeImages(campusFiles, 'campus', 1),
  ...makeImages(landscapeFiles, 'landscape', 100),
  ...makeImages(portraitFiles, 'portrait', 200),
  ...makePersonalImages(personalPhotos, 300),
];

export const categories = [
  { key: 'all', label: '全部' },
  { key: 'exhibition', label: '入展作品' },
  { key: 'campus', label: '校园' },
  { key: 'landscape', label: '风光' },
  { key: 'portrait', label: '人像' },
  { key: 'personal', label: '个人照' },
];
