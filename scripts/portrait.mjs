// Builds the black-and-white portrait for the About section from Max's original photo.
// Usage: npm run portrait
import { mkdir } from 'node:fs/promises';
import sharp from 'sharp';

const SRC = 'scripts/source/max.jpg';
const OUT = 'public/sobre/max-costa.webp';
// Chest-up, 4:5, leaving out the glass on the left edge of the original (1080×1089).
const CROP = { left: 105, top: 0, width: 720, height: 900 };
const OUT_SIZE = { width: 640, height: 800 };

// Darkens the edges so the busy mural behind recedes. Sized to the output: sharp composites after resizing.
const vignette = Buffer.from(
  `<svg width="${OUT_SIZE.width}" height="${OUT_SIZE.height}" xmlns="http://www.w3.org/2000/svg">
    <defs><radialGradient id="v" cx="50%" cy="36%" r="72%">
      <stop offset="50%" stop-color="#fff"/><stop offset="100%" stop-color="#4a4a4a"/>
    </radialGradient></defs>
    <rect width="100%" height="100%" fill="url(#v)"/>
  </svg>`,
);

await mkdir('public/sobre', { recursive: true });
await sharp(SRC)
  .extract(CROP)
  .grayscale()
  .linear(1.1, -12)
  .composite([{ input: vignette, blend: 'multiply' }])
  .resize(OUT_SIZE.width, OUT_SIZE.height)
  .webp({ quality: 82 })
  .toFile(OUT);
console.log('ok', OUT);
