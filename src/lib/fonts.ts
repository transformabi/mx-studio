import {
  Bricolage_Grotesque,
  Figtree,
  Instrument_Sans,
  Instrument_Serif,
  JetBrains_Mono,
  Space_Grotesk,
} from 'next/font/google';

// Studio identity: the same family as the @mxstudioweb posts and the diagnosis form.
const bricolage = Bricolage_Grotesque({
  subsets: ['latin'],
  weight: ['500', '600', '700', '800'],
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
  weight: ['400', '500'],
  variable: '--font-jetbrains',
  display: 'swap',
});

// The demos play other brands and keep their own type.
const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], variable: '--font-space-grotesk', display: 'swap' });
const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  weight: '400',
  style: ['normal', 'italic'],
  variable: '--font-instrument-serif',
  display: 'swap',
});
const instrumentSans = Instrument_Sans({ subsets: ['latin'], variable: '--font-instrument-sans', display: 'swap' });

export const fontVariables = [bricolage, figtree, jetbrains, spaceGrotesk, instrumentSerif, instrumentSans]
  .map((font) => font.variable)
  .join(' ');
