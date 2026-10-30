// Renders the 1200×1200 product images used by the Stripe products (Plano Launch, Business, Growth).
// No prices on purpose: Stripe converts them per currency at checkout. Usage: node scripts/stripe-plans.mjs
import { mkdir, readFile } from 'node:fs/promises';
import { chromium } from 'playwright-core';

const logo = await readFile('public/brand/max-logo-dark.svg', 'utf8');
const plans = [
  { id: 'launch', name: 'Launch', line: 'Página única · até 3 seções', bullets: ['Design responsivo', 'Formulário + WhatsApp', 'SEO básico'] },
  { id: 'business', name: 'Business', line: 'Até 5 páginas · design sob medida', bullets: ['SEO on-page', 'Google Analytics', 'Formulário + WhatsApp'] },
  { id: 'growth', name: 'Growth', line: 'Até 10 páginas · blog ou portfólio', bullets: ['Captação de contatos', 'SEO avançado', 'Suporte prioritário'] },
];

const html = (p) => `<!doctype html><html><head><meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,700;12..96,800&family=Figtree:wght@500&family=JetBrains+Mono:wght@500&display=block" rel="stylesheet">
<style>
  *{margin:0;box-sizing:border-box}
  body{width:1200px;height:1200px;padding:96px;display:flex;flex-direction:column;justify-content:space-between;
    background:#0C0E0A;color:#FBFCF8;font-family:'Bricolage Grotesque',sans-serif;
    background-image:radial-gradient(circle at 85% 90%,rgba(164,254,36,.16),transparent 45%),
      linear-gradient(to right,rgba(255,255,255,.05) 1px,transparent 1px),linear-gradient(to bottom,rgba(255,255,255,.05) 1px,transparent 1px);
    background-size:auto,80px 80px,80px 80px}
  .top{display:flex;align-items:center;gap:24px;font:500 26px 'JetBrains Mono',monospace;letter-spacing:.14em;text-transform:uppercase;color:rgba(251,252,248,.7)}
  .top svg{width:96px;height:96px}
  .label{font:500 28px 'JetBrains Mono',monospace;letter-spacing:.16em;text-transform:uppercase;color:#A4FE24}
  h1{font-size:220px;line-height:.9;letter-spacing:-.045em;font-weight:800;margin-top:18px}
  .line{font:500 40px 'Figtree',sans-serif;color:rgba(251,252,248,.75);margin-top:28px}
  ul{list-style:none;display:flex;flex-wrap:wrap;gap:16px;margin-top:44px}
  li{font:500 30px 'Figtree',sans-serif;border:2px solid rgba(251,252,248,.2);border-radius:999px;padding:14px 28px}
  .bottom{display:flex;justify-content:space-between;align-items:center;font:500 26px 'JetBrains Mono',monospace;color:rgba(251,252,248,.6)}
  .pill{background:#A4FE24;color:#0C0E0A;border-radius:999px;padding:16px 30px;font-weight:500;letter-spacing:.06em;text-transform:uppercase}
</style></head><body>
<div class="top">${logo}<span>MX Studio Web</span></div>
<div>
  <p class="label">Plano</p>
  <h1>${p.name}</h1>
  <p class="line">${p.line}</p>
  <ul>${p.bullets.map((b) => `<li>${b}</li>`).join('')}</ul>
</div>
<div class="bottom"><span class="pill">No ar em 14 dias</span><span>Criação + manutenção mensal</span></div>
</body></html>`;

await mkdir('public/stripe', { recursive: true });
const browser = await chromium.launch({ channel: process.env.PW_CHANNEL || 'msedge' });
const page = await browser.newPage({ viewport: { width: 1200, height: 1200 } });
for (const p of plans) {
  await page.setContent(html(p), { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({ path: `public/stripe/plano-${p.id}.png` });
  console.log('ok', p.id);
}
await browser.close();
