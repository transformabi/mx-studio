import type { Metadata } from 'next';
import { Space_Grotesk, Instrument_Serif, Instrument_Sans } from 'next/font/google';
import './globals.css';
import { EstudioNav } from '@/components/nav';
import { EstudioFooter } from '@/components/footer';
import { ImgFallback } from '@/components/img-fallback';
import { HideOnCarrossel } from '@/components/hide-on-carrossel';
import { CustomCursor } from '@/components/fx/custom-cursor';
import { ScrollProgress } from '@/components/fx/scroll-progress';
import { SmoothScroll } from '@/components/fx/smooth-scroll';
import { localeInfo } from '@/i18n/config';
import { messages } from '@/i18n/messages';
import { I18nProvider } from '@/i18n/provider';
import { getI18n, getLocale } from '@/i18n/server';

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
    metadataBase: new URL('https://maxcosta.studio'),
    title: {
      default: t.title,
      template: '%s · MX Studio',
    },
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
      className={`${spaceGrotesk.variable} ${instrumentSerif.variable} ${instrumentSans.variable}`}
    >
      <body className="bg-black text-white antialiased">
        <I18nProvider locale={locale} currency={currency} rates={rates}>
          <SmoothScroll />
          <ScrollProgress />
          <CustomCursor />
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
