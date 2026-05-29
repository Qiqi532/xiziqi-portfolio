// Placeholder images using picsum.photos — replace with your own photos
// Categorized into campus, landscape, portrait

const baseImg = (id, w, h) => `https://picsum.photos/seed/${id}/${w}/${h}`;

export const images = [
  // Campus
  { id: 1, src: baseImg('campus1', 800, 1000), thumb: baseImg('campus1', 400, 500), category: 'campus', title: 'Golden Hour Library', aspect: 'portrait' },
  { id: 2, src: baseImg('campus2', 1200, 800), thumb: baseImg('campus2', 600, 400), category: 'campus', title: 'Autumn Path', aspect: 'landscape' },
  { id: 3, src: baseImg('campus3', 800, 1000), thumb: baseImg('campus3', 400, 500), category: 'campus', title: 'Quiet Corner', aspect: 'portrait' },
  { id: 4, src: baseImg('campus4', 1200, 800), thumb: baseImg('campus4', 600, 400), category: 'campus', title: 'Morning Light', aspect: 'landscape' },

  // Landscape
  { id: 5, src: baseImg('land1', 1200, 800), thumb: baseImg('land1', 600, 400), category: 'landscape', title: 'Mountain Mist', aspect: 'landscape' },
  { id: 6, src: baseImg('land2', 800, 1200), thumb: baseImg('land2', 400, 600), category: 'landscape', title: 'Vertical Horizon', aspect: 'portrait' },
  { id: 7, src: baseImg('land3', 1200, 800), thumb: baseImg('land3', 600, 400), category: 'landscape', title: 'Golden Fields', aspect: 'landscape' },
  { id: 8, src: baseImg('land4', 1000, 1000), thumb: baseImg('land4', 500, 500), category: 'landscape', title: 'Still Waters', aspect: 'square' },

  // Portrait
  { id: 9, src: baseImg('port1', 800, 1000), thumb: baseImg('port1', 400, 500), category: 'portrait', title: 'Candid Smile', aspect: 'portrait' },
  { id: 10, src: baseImg('port2', 800, 1000), thumb: baseImg('port2', 400, 500), category: 'portrait', title: 'Window Light', aspect: 'portrait' },
  { id: 11, src: baseImg('port3', 1200, 800), thumb: baseImg('port3', 600, 400), category: 'portrait', title: 'In Thought', aspect: 'landscape' },
  { id: 12, src: baseImg('port4', 800, 1000), thumb: baseImg('port4', 400, 500), category: 'portrait', title: 'Laughter', aspect: 'portrait' },
];

export const categories = [
  { key: 'all', label: 'All' },
  { key: 'campus', label: 'Campus' },
  { key: 'landscape', label: 'Landscape' },
  { key: 'portrait', label: 'Portrait' },
];
