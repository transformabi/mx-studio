// Captures the real screenshots shown on the studio site (needs Microsoft Edge installed).
// Usage: npm run shots
// Env: DEMO_BASE=http://localhost:4173/demo  captures the demos from a local build (npm run build, then serve out/)
//      ONLY=rota-clara,moda-arte             re-captures just those files (names without extension)
//      CHROMIUM_PATH=/path/to/chrome         uses that Chromium instead of Edge; with HTTPS_PROXY set it goes through the proxy
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

const { CHROMIUM_PATH, HTTPS_PROXY } = process.env;
// The proxy re-terminates TLS with its own CA (trusted through the system NSS store); capping Chromium at
// TLS 1.2 is what makes that handshake verify. Certificate errors are never ignored.
const launchOptions = CHROMIUM_PATH
  ? {
      executablePath: CHROMIUM_PATH,
      ...(HTTPS_PROXY && { proxy: { server: HTTPS_PROXY }, args: ['--ssl-version-max=tls1.2'] }),
    }
  : { channel: 'msedge' };

await mkdir(OUT, { recursive: true });
const browser = await chromium.launch(launchOptions);

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
if (wanted('sulamita-scroll')) await sulamitaScroll();
await browser.close();

/**
 * The client's home page as one tall strip, scrolled inside the browser frame on the studio home
 * (src/components/site/scrolling-site.tsx). It stops right above section#resultados: those before/after
 * photos were shared with the client, not with us, and before/after is not allowed in aesthetics ads.
 * Writes the sticky menu on its own (it stays at the top of the frame) and the page body at 1200 and 768 wide.
 */
async function sulamitaScroll() {
  const context = await browser.newContext({ viewport: wide, locale: 'pt-BR', reducedMotion: 'reduce' });
  const page = await context.newPage();
  await page.goto(SULAMITA, { waitUntil: 'networkidle' });
  // Walk down the whole page once so every lazy image and scroll reveal has run, then back to the top.
  const total = await page.evaluate(() => document.documentElement.scrollHeight);
  for (let y = 0; y < total; y += 400) {
    await page.evaluate((v) => window.scrollTo(0, v), y);
    await page.waitForTimeout(150);
  }
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(1500);

  const m = await page.evaluate(() => {
    const header = document.querySelector('#nav') ?? document.querySelector('body > header, body > nav');
    const cut = document.querySelector('section#resultados');
    if (!header || !cut) return null;
    header.setAttribute('data-shot-header', '');
    // Lowest visible pixel of the section above the cut (the treatments), so the strip can end on its last
    // line instead of on its bottom padding: the frame then rests on the treatments heading and full list.
    let contentBottom = 0;
    for (const el of cut.previousElementSibling?.querySelectorAll('*') ?? []) {
      const r = el.getBoundingClientRect();
      if (r.width && r.height) contentBottom = Math.max(contentBottom, r.bottom + window.scrollY);
    }
    return {
      position: getComputedStyle(header).position,
      headerBottom: header.getBoundingClientRect().bottom,
      cutTop: cut.getBoundingClientRect().top + window.scrollY,
      contentBottom,
    };
  });
  if (!m) throw new Error('sulamita-scroll: the menu or section#resultados is missing; check the live page');
  const sticky = m.position === 'sticky' || m.position === 'fixed';
  const top = sticky ? Math.round(m.headerBottom) : 0;
  // Never past the top of section#resultados.
  const bottom = Math.floor(Math.min(m.cutTop, (m.contentBottom || m.cutTop) + 40));
  console.log(
    `sulamita-scroll: menu is ${m.position}, ${m.headerBottom}px tall; #resultados at ${m.cutTop}px; ` +
      `last line above it at ${m.contentBottom}px; body ${top}..${bottom}px`,
  );

  const full = await page.screenshot({ fullPage: true });
  const webp = { quality: 72, effort: 6, smartSubsample: true };
  const body = (width, name) =>
    sharp(full)
      .extract({ left: 0, top, width: wide.width, height: bottom - top })
      .resize({ width })
      .webp(webp)
      .toFile(`${OUT}/${name}.webp`);
  await body(1200, 'sulamita-scroll');
  await body(768, 'sulamita-scroll-768');

  if (sticky) {
    // The menu as it looks once the visitor has scrolled (the site adds a hairline under it then),
    // drawn over the bare page background so no content shows through its translucent fill.
    await page.evaluate(() => window.scrollTo(0, window.innerHeight));
    await page.waitForTimeout(800);
    await page.addStyleTag({
      content: 'body > :not([data-shot-header]):not(.ambient) { visibility: hidden !important; }',
    });
    await page.waitForTimeout(300);
    const strip = await page.screenshot({ clip: { x: 0, y: 0, width: wide.width, height: top } });
    await sharp(strip).resize({ width: 1200 }).webp(webp).toFile(`${OUT}/sulamita-scroll-header.webp`);
  }
  await context.close();
  console.log('ok sulamita-scroll');
}
