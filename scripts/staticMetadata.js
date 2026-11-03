const escapeHtml = (value) => value.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');

export function renderPageMetadata(html, metadata, pageUrl, imageUrl) {
  let output = html.replace(/<title>[\s\S]*?<\/title>/i, `<title>${escapeHtml(metadata.title)}</title>`);
  function upsert(pattern, tag) {
    output = pattern.test(output) ? output.replace(pattern, tag) : output.replace('</head>', `    ${tag}\n  </head>`);
  }
  upsert(/<meta name="description" content="[^"]*"\s*\/?>/i, `<meta name="description" content="${escapeHtml(metadata.description)}" />`);
  for (const [property, content] of Object.entries({ 'og:title': metadata.title, 'og:description': metadata.description, 'og:url': pageUrl, 'og:image': imageUrl })) {
    upsert(new RegExp(`<meta property="${property}" content="[^"]*"\\s*\\/?>`, 'i'), `<meta property="${property}" content="${escapeHtml(content)}" />`);
  }
  upsert(/<link rel="canonical" href="[^"]*"\s*\/?>/i, `<link rel="canonical" href="${escapeHtml(pageUrl)}" />`);
  return output;
}
