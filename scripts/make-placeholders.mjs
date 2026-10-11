// Generates abstract "flat brush" placeholder images for the sample works.
// Run once: node scripts/make-placeholders.mjs. Replace with real art later.
import sharp from 'sharp';
import { mkdirSync } from 'node:fs';

const works = [
  { slug: 'quiet-room', w: 1600, h: 2000, palette: ['#1e2a78', '#3b4fb8', '#e9e7df', '#5fb3b3'] },
  { slug: 'after-rain', w: 1600, h: 2400, palette: ['#14304a', '#2f6f8f', '#d9dccf', '#7fa2ff'] },
  { slug: 'blue-hour', w: 2400, h: 1600, palette: ['#0f1b4d', '#2f4fb3', '#9fb4e8', '#e4e2da'] },
  { slug: 'empty-corridor', w: 2000, h: 2000, palette: ['#1d3b3b', '#3f8080', '#e8e6de', '#2a2f6b'] },
  { slug: 'small-hands', w: 1600, h: 2400, palette: ['#2a2f6b', '#6c7fd1', '#efede6', '#3b8c8c'] },
  { slug: 'teal-window', w: 1600, h: 2000, palette: ['#0e3d40', '#2b7a78', '#dfe6e1', '#3b4fb8'] },
];

// Deterministic pseudo-random so placeholders are stable between runs.
function rng(seed) {
  let s = [...seed].reduce((a, c) => a + c.charCodeAt(0), 0) * 9301;
  return () => ((s = (s * 9301 + 49297) % 233280) / 233280);
}

for (const work of works) {
  const r = rng(work.slug);
  const [deep, mid, light, accent] = work.palette;
  const { w, h } = work;
  const strokes = [];
  for (let i = 0; i < 14; i++) {
    const sw = w * (0.15 + r() * 0.5);
    const sh = h * (0.03 + r() * 0.08);
    const x = r() * w - sw * 0.2;
    const y = r() * h;
    const color = [mid, light, accent, deep][Math.floor(r() * 4)];
    const angle = (r() - 0.5) * 8;
    strokes.push(
      `<rect x="${x}" y="${y}" width="${sw}" height="${sh}" fill="${color}" opacity="${0.55 + r() * 0.45}" transform="rotate(${angle} ${x + sw / 2} ${y + sh / 2})"/>`,
    );
  }
  const fs = Math.round(Math.min(w, h) * 0.035);
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}">
    <rect width="100%" height="100%" fill="${deep}"/>
    <rect x="${w * 0.08}" y="${h * 0.1}" width="${w * 0.84}" height="${h * 0.62}" fill="${mid}" opacity="0.6"/>
    ${strokes.join('\n')}
    <rect x="${w * 0.05}" y="${h - fs * 3}" width="${fs * 10}" height="${fs * 1.8}" fill="#000" opacity="0.55"/>
    <text x="${w * 0.05 + fs * 0.6}" y="${h - fs * 1.75}" font-family="monospace" font-size="${fs}" letter-spacing="${fs * 0.15}" fill="#fff">PLACEHOLDER</text>
  </svg>`;
  const dir = `src/content/works/${work.slug}`;
  mkdirSync(dir, { recursive: true });
  await sharp(Buffer.from(svg)).jpeg({ quality: 88 }).toFile(`${dir}/image.jpg`);
  console.log('wrote', dir);
}
