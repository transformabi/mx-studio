// Builds the About-section portrait from Max's original photo: full frame, original size and colors.
// Usage: npm run portrait
import { mkdir } from 'node:fs/promises';
import sharp from 'sharp';

const SRC = 'scripts/source/max.jpg';
const OUT = 'public/sobre/max-costa.webp';

await mkdir('public/sobre', { recursive: true });
const info = await sharp(SRC).webp({ quality: 85 }).toFile(OUT);
console.log('ok', OUT, `${info.width}x${info.height}`, `${Math.round(info.size / 1024)} KB`);
