// Renders the 1200×630 share images (WhatsApp, Instagram, Google) with the brand fonts.
// Usage: npm run og   (needs Microsoft Edge and internet for Google Fonts)
import { mkdir, readFile } from 'node:fs/promises';
import { chromium } from 'playwright-core';

const logo = await readFile('public/brand/max-logo-dark.svg', 'utf8');
const copy = {
  pt: { title: 'Sites que trazem <b>clientes</b> para o seu negócio.', sub: 'Estúdio de sites sob medida · Rio de Janeiro' },
  en: { title: 'Websites that bring <b>customers</b> to your business.', sub: 'Custom website studio · Rio de Janeiro, Brazil' },
  es: { title: 'Sitios web que traen <b>clientes</b> a tu negocio.', sub: 'Estudio de sitios a medida · Río de Janeiro, Brasil' },
};

const html = ({ title, sub }) => `<!doctype html><html><head><meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,700&family=JetBrains+Mono:wght@500&display=block" rel="stylesheet">
<style>
  *{margin:0;box-sizing:border-box}
  body{width:1200px;height:630px;padding:72px 80px;display:flex;flex-direction:column;justify-content:space-between;
    background:#0C0E0A;color:#FBFCF8;font-family:'Bricolage Grotesque',sans-serif;
    background-image:linear-gradient(to right,rgba(255,255,255,.05) 1px,transparent 1px),linear-gradient(to bottom,rgba(255,255,255,.05) 1px,transparent 1px);
    background-size:72px 72px}
  .top{display:flex;align-items:center;gap:20px;font:500 22px 'JetBrains Mono',monospace;letter-spacing:.12em;text-transform:uppercase;color:rgba(251,252,248,.65)}
  .top svg{width:72px;height:72px}
  h1{font-size:78px;line-height:.98;letter-spacing:-.03em;max-width:1000px;font-weight:700}
  h1 b{color:#A4FE24;font-weight:700}
  .bottom{display:flex;justify-content:space-between;font:500 22px 'JetBrains Mono',monospace;color:rgba(251,252,248,.6)}
  .bottom span:last-child{color:#A4FE24}
</style></head><body>
<div class="top">${logo}<span>MX Studio Web</span></div>
<h1>${title}</h1>
<div class="bottom"><span>${sub}</span><span>mxstudioweb.com.br</span></div>
</body></html>`;

await mkdir('public/og', { recursive: true });
const browser = await chromium.launch({ channel: 'msedge' });
const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
for (const [locale, c] of Object.entries(copy)) {
  await page.setContent(html(c), { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({ path: `public/og/og-${locale}.png` });
  console.log('ok', locale);
}
await browser.close();
