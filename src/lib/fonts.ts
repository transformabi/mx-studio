import localFont from 'next/font/local';

/**
 * Studio + demo fonts, self-hosted (latin `.woff2` under `src/fonts/`).
 *
 * We intentionally avoid `next/font/google` at build time: Next.js 16.3.x Turbopack
 * fails in CI when Google returns extensionless `/l/font?kit=…&skey=…` URLs
 * (`Can't resolve @vercel/turbopack-next/internal/font/google/font`,
 * `next/font/google queries have exactly one entry`). Upstream:
 * https://github.com/vercel/next.js/issues/99114
 *
 * Visual identity stays the same families/weights as before; only the loader changed.
 */

// Studio identity: the same family as the @mxstudioweb posts and the diagnosis form.
const bricolage = localFont({
  src: [
    {
      path: '../fonts/bricolage-grotesque-500800-normal.woff2',
      weight: '500 800',
      style: 'normal',
    },
  ],
  variable: '--font-bricolage',
  display: 'swap',
});
const figtree = localFont({
  src: [
    {
      path: '../fonts/figtree-400700-normal.woff2',
      weight: '400 700',
      style: 'normal',
    },
  ],
  variable: '--font-figtree',
  display: 'swap',
});
const jetbrains = localFont({
  src: [
    {
      path: '../fonts/jetbrains-mono-400500-normal.woff2',
      weight: '400 500',
      style: 'normal',
    },
  ],
  variable: '--font-jetbrains',
  display: 'swap',
});

// The demos play other brands and keep their own type. Not preloaded, so studio pages don't download them
// up front; a page that uses them still loads them through the @font-face rules.
const spaceGrotesk = localFont({
  src: [
    {
      path: '../fonts/space-grotesk-300700-normal.woff2',
      weight: '300 700',
      style: 'normal',
    },
  ],
  variable: '--font-space-grotesk',
  display: 'swap',
  preload: false,
});
const instrumentSerif = localFont({
  src: [
    {
      path: '../fonts/instrument-serif-400-normal.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../fonts/instrument-serif-400-italic.woff2',
      weight: '400',
      style: 'italic',
    },
  ],
  variable: '--font-instrument-serif',
  display: 'swap',
  preload: false,
});
const instrumentSans = localFont({
  src: [
    {
      path: '../fonts/instrument-sans-400700-normal.woff2',
      weight: '400 700',
      style: 'normal',
    },
  ],
  variable: '--font-instrument-sans',
  display: 'swap',
  preload: false,
});

export const fontVariables = [bricolage, figtree, jetbrains, spaceGrotesk, instrumentSerif, instrumentSans]
  .map((font) => font.variable)
  .join(' ');
