import type { Metadata } from 'next';
import { Space_Grotesk, Instrument_Serif, Instrument_Sans } from 'next/font/google';
import './globals.css';
import { EstudioNav } from '@/components/nav';
import { EstudioFooter } from '@/components/footer';
import { ImgFallback } from '@/components/img-fallback';
import { HideOnCarrossel } from '@/components/hide-on-carrossel';

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

export const metadata: Metadata = {
  metadataBase: new URL('https://maxcosta.studio'),
  title: {
    default: 'MX Studio · Estúdio digital freelance',
    template: '%s · MX Studio',
  },
  description:
    'Sites, e-commerces e produtos digitais sob medida em Next.js. Portfólio com demos funcionais em 6 nichos: e-commerce, gastronomia, saúde, jurídico, imobiliário, infoproduto.',
  keywords: [
    'freelance next.js',
    'desenvolvedor freelancer',
    'sites sob medida',
    'e-commerce next.js',
    'Rio de Janeiro',
    'MX Studio',
  ],
  openGraph: {
    title: 'MX Studio · Estúdio digital freelance',
    description:
      'Sites que fazem seu negócio parecer sério — e que vendem. Portfólio com 6 demos funcionais.',
    type: 'website',
    locale: 'pt_BR',
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="pt-BR"
      className={`${spaceGrotesk.variable} ${instrumentSerif.variable} ${instrumentSans.variable}`}
    >
      <body className="bg-black text-white antialiased">
        <ImgFallback />
        <EstudioNav />
        <div className="relative">{children}</div>
        <HideOnCarrossel>
          <EstudioFooter />
        </HideOnCarrossel>
      </body>
    </html>
  );
}
