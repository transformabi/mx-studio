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

/** Max's own photo, black and white (scripts/portrait.mjs). */
export const portrait: Img = { src: '/sobre/max-costa.webp', width: 640, height: 800 };

export const ogImage = (locale: Locale) => `/og/og-${locale}.png`;
