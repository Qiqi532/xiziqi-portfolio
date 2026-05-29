// Xiziqi's photography portfolio — actual photo collection
// Photos stored in public/images/campus/, landscape/, portrait/

const base = '/images';

const campusFiles = [
  '20241006-DSC_4473.jpg',
  '20250625-DSC_8875.jpg',
  '20250914-DSC_0505 拷贝.jpg',
  'DSC_0424 拷贝.jpg',
  'DSC_0451 拷贝.jpg',
  'DSC_0456.jpg',
  'DSC_1727 拷贝.jpg',
  'DSC_1989 拷贝.jpg',
  'DSC_4842-已增强-NR-拷贝-2.jpg',
  '中珠雕像星轨 .jpg',
];

const landscapeFiles = [
  '11.jpg',
  '20260307-DSC_1064-拷贝.jpg',
  '20260308-DSC_1104.jpg',
  'DSC_2977-拷贝.jpg',
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
  'DSC_3913.jpg',
  'DSC_39211.jpg',
  'DSC_4010.jpg',
  'DSC_4377-已增强-NR.jpg',
  'DSC_4743.jpg',
  'b1 拷贝.jpg',
  'lzy.jpg',
  'lzy2.jpg',
  '中珠中山像旁.jpg',
  '中珠逸仙路.jpg',
  '中珠音乐厅旁.jpg',
];

function makeImages(files, category, startId) {
  return files.map((file, i) => ({
    id: startId + i,
    src: `${base}/${category}/${encodeURIComponent(file)}`,
    thumb: `${base}/${category}/${encodeURIComponent(file)}`,
    category,
    title: decodeURIComponent(file.replace(/\.[^.]+$/, '').trim()),
    aspect: 'landscape',
  }));
}

export const images = [
  ...makeImages(campusFiles, 'campus', 1),
  ...makeImages(landscapeFiles, 'landscape', 100),
  ...makeImages(portraitFiles, 'portrait', 200),
];

export const categories = [
  { key: 'all', label: 'All' },
  { key: 'campus', label: 'Campus' },
  { key: 'landscape', label: 'Landscape' },
  { key: 'portrait', label: 'Portrait' },
];
