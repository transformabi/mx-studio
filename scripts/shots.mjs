// Captures the real screenshots shown on the studio site (needs Microsoft Edge installed).
// Usage: npm run shots
// Env: DEMO_BASE=http://localhost:4173/demo  captures the demos from a local build (npm run build, then serve out/)
//      ONLY=rota-clara,moda-arte             re-captures just those files (names without extension)
import { mkdir } from 'node:fs/promises';
import { chromium } from 'playwright-core';
import sharp from 'sharp';

const OUT = 'public/shots';
const SULAMITA = 'https://www.sulamitaestetica.pt/';
// By default the demos are captured as they are live today; set DEMO_BASE to capture a local build of this branch.
const DEMO_BASE = process.env.DEMO_BASE ?? 'https://mxstudioweb.vercel.app/demo';
const only = process.env.ONLY?.split(',');
const wanted = (name) => !only || only.includes(name);
const demos = ['clinica-sereno', 'motta-advogados', 'moda-arte', 'restaurante-terra', 'costa-imoveis', 'rota-clara'];

await mkdir(OUT, { recursive: true });
const browser = await chromium.launch({ channel: 'msedge' });

async function shoot({ url, viewport, deviceScaleFactor = 1, isMobile = false, scrollY = 0, clip }) {
  const context = await browser.newContext({
    viewport,
    deviceScaleFactor,
    isMobile,
    hasTouch: isMobile,
    locale: 'pt-BR',
    reducedMotion: 'reduce',
  });
  const page = await context.newPage();
  await page.goto(url, { waitUntil: 'networkidle' });
  await page.waitForTimeout(2000);
  if (scrollY) {
    await page.evaluate((y) => window.scrollTo(0, y), scrollY);
    await page.waitForTimeout(1500);
  }
  let buffer;
  if (clip) {
    // The live demo sits inside the portfolio frame; keep only the client's site, at 16:10.
    // Drop the frame's rounded corners, border and width cap so the shot is the bare 1440px page.
    await page.addStyleTag({
      content: `${clip} { border-radius: 0 !important; border: 0 !important; box-shadow: none !important; }
        :has(> ${clip}) { max-width: none !important; padding: 0 !important; }`,
    });
    await page.waitForTimeout(500);
    const box = await page.locator(clip).first().boundingBox();
    buffer = await page.screenshot({
      clip: { x: box.x, y: box.y, width: box.width, height: Math.round((box.width * 900) / 1440) },
    });
  } else {
    buffer = await page.screenshot();
  }
  await context.close();
  return buffer;
}

const save = (buffer, name, width, height) =>
  sharp(buffer).resize(width, height, { fit: 'cover', position: 'top' }).webp({ quality: 80 }).toFile(`${OUT}/${name}.webp`);

const wide = { width: 1440, height: 900 };
if (wanted('sulamita-desktop')) await save(await shoot({ url: SULAMITA, viewport: wide }), 'sulamita-desktop', 1440, 900);
// 760px puts the whole certification card right below the sticky menu.
if (wanted('sulamita-detail')) await save(await shoot({ url: SULAMITA, viewport: wide, scrollY: 760 }), 'sulamita-detail', 1440, 900);
if (wanted('sulamita-mobile')) {
  await save(
    await shoot({ url: SULAMITA, viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true }),
    'sulamita-mobile',
    780,
    1688,
  );
}
for (const slug of demos.filter(wanted)) {
  const shot = await shoot({ url: `${DEMO_BASE}/${slug}`, viewport: { width: 1440, height: 1100 }, clip: 'div.overflow-hidden.rounded-3xl' });
  await save(shot, slug, 1440, 900);
  console.log('ok', slug);
}
await browser.close();
