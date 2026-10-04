import type { Img } from '@/components/site/browser-frame';
import type { Locale } from '@/i18n/config';
import type { ShowcaseSlug } from './estudio';

const desktop = (name: string): Img => ({ src: `/shots/${name}.webp`, width: 1440, height: 900 });

/** Screenshots of live pages, captured by scripts/shots.mjs. */
export const shots = {
  sulamita: {
    desktop: desktop('sulamita-desktop'),
    detail: desktop('sulamita-detail'),
    mobile: { src: '/shots/sulamita-mobile.webp', width: 780, height: 1688 } satisfies Img,
    /**
     * Her home page from the top down to the treatments, split in the sticky menu and the body that scrolls
     * under it (target sulamita-scroll). Stops above the before/after results on purpose.
     */
    scroll: {
      header: { src: '/shots/sulamita-scroll-header.webp', width: 1200, height: 68 },
      body: { src: '/shots/sulamita-scroll.webp', width: 1200, height: 4302 },
      bodySmall: { src: '/shots/sulamita-scroll-768.webp', width: 768, height: 2753 },
    } satisfies Record<'header' | 'body' | 'bodySmall', Img>,
  },
  demos: {
    'clinica-sereno': desktop('clinica-sereno'),
    'motta-advogados': desktop('motta-advogados'),
    'moda-arte': desktop('moda-arte'),
    'restaurante-terra': desktop('restaurante-terra'),
    'costa-imoveis': desktop('costa-imoveis'),
    'rota-clara': desktop('rota-clara'),
  } satisfies Record<ShowcaseSlug, Img>,
};

/** Max's own photo, full frame in original size and colors (scripts/portrait.mjs). */
export const portrait: Img = { src: '/sobre/max-costa.webp', width: 1080, height: 1089 };

export const ogImage = (locale: Locale) => `/og/og-${locale}.png`;
