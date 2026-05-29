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

const categoryNames = {
  campus: '校园',
  landscape: '风光',
  portrait: '人像',
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
