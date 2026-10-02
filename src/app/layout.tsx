import type { Metadata } from 'next';
import {
  Bricolage_Grotesque,
  Figtree,
  Instrument_Sans,
  Instrument_Serif,
  JetBrains_Mono,
  Space_Grotesk,
} from 'next/font/google';
import './globals.css';
import { EstudioNav } from '@/components/nav';
import { EstudioFooter } from '@/components/footer';
import { ImgFallback } from '@/components/img-fallback';
import { HideOnCarrossel } from '@/components/hide-on-carrossel';
import { ScrollProgress } from '@/components/fx/scroll-progress';
import { SmoothScroll } from '@/components/fx/smooth-scroll';
import { SITE_URL } from '@/lib/estudio';
import { localeInfo } from '@/i18n/config';
import { messages } from '@/i18n/messages';
import { I18nProvider } from '@/i18n/provider';
import { getI18n, getLocale } from '@/i18n/server';

// Studio identity (same as the @mxstudioweb diagnosis page). The demos keep
// their own fonts below, since each one plays a different client brand.
const bricolage = Bricolage_Grotesque({
  subsets: ['latin'],
  weight: ['600', '700', '800'],
  variable: '--font-bricolage',
  display: 'swap',
});
const figtree = Figtree({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-figtree',
  display: 'swap',
});
const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  weight: '500',
  variable: '--font-jetbrains',
  display: 'swap',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
});
const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  weight: '400',
  style: ['normal', 'italic'],
  variable: '--font-instrument-serif',
  display: 'swap',
});
const instrumentSans = Instrument_Sans({
  subsets: ['latin'],
  variable: '--font-instrument-sans',
  display: 'swap',
});

export function generateMetadata(): Metadata {
  const locale = getLocale();
  const t = messages[locale].meta;
  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: t.title,
      template: '%s · MX Studio Web',
    },
    icons: { icon: '/favicon.svg', apple: '/apple-touch-icon.png' },
    description: t.description,
    keywords: t.keywords,
    openGraph: {
      title: t.title,
      description: t.ogDescription,
      type: 'website',
      locale: localeInfo[locale].og,
    },
    robots: { index: true, follow: true },
  };
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const { locale, currency, rates, t } = await getI18n();

  return (
    <html
      lang={localeInfo[locale].htmlLang}
      className={`${bricolage.variable} ${figtree.variable} ${jetbrains.variable} ${spaceGrotesk.variable} ${instrumentSerif.variable} ${instrumentSans.variable}`}
    >
      <body className="bg-ink text-white antialiased">
        <I18nProvider locale={locale} currency={currency} rates={rates}>
          <SmoothScroll />
          <ScrollProgress />
          <ImgFallback />
          <EstudioNav t={t.nav} prefs={t.prefs} />
          <div className="relative">{children}</div>
          <HideOnCarrossel>
            <EstudioFooter />
          </HideOnCarrossel>
        </I18nProvider>
      </body>
    </html>
  );
}
