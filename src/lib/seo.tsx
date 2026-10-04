import type { Metadata } from 'next';
import { localeInfo, locales, type Locale } from '@/i18n/config';
import { messages } from '@/i18n/messages';
import { alternates, localizedPath } from '@/i18n/paths';
import { estudio, SITE_URL } from './estudio';
import { ogImage } from './images';

/** Absolute URL without a trailing slash on the home page: https://mxstudioweb.com.br */
export const absoluteUrl = (path: string) => (path === '/' ? SITE_URL : `${SITE_URL}${path}`);

export const absoluteAlternates = (path: string) =>
  Object.fromEntries(Object.entries(alternates(path)).map(([lang, p]) => [lang, absoluteUrl(p)]));

export function pageMetadata({
  locale,
  path,
  title,
  description,
  index = true,
  translated = true,
}: {
  locale: Locale;
  path: string;
  title: string;
  description: string;
  index?: boolean;
  translated?: boolean;
}): Metadata {
  const url = absoluteUrl(localizedPath(locale, path));
  const image = { url: ogImage(locale), width: 1200, height: 630, alt: title };

  return {
    title: { absolute: title },
    description,
    alternates: { canonical: url, ...(translated ? { languages: absoluteAlternates(path) } : {}) },
    openGraph: {
      type: 'website',
      url,
      title,
      description,
      siteName: estudio.name,
      locale: localeInfo[locale].og,
      images: [image],
    },
    twitter: { card: 'summary_large_image', title, description, images: [image.url] },
    robots: index ? { index: true, follow: true } : { index: false, follow: false },
  };
}

export const homeMetadata = (locale: Locale) =>
  pageMetadata({ locale, path: '/', title: messages[locale].meta.title, description: messages[locale].meta.description });

export function StudioJsonLd({ locale }: { locale: Locale }) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: estudio.name,
    url: absoluteUrl(localizedPath(locale, '/')),
    description: messages[locale].meta.description,
    email: estudio.email,
    telephone: estudio.phoneE164,
    image: `${SITE_URL}${ogImage(locale)}`,
    logo: `${SITE_URL}/apple-touch-icon.png`,
    sameAs: [estudio.instagram],
    founder: { '@type': 'Person', name: estudio.owner },
    address: { '@type': 'PostalAddress', addressLocality: 'Rio de Janeiro', addressRegion: 'RJ', addressCountry: 'BR' },
    priceRange: 'R$ 3.500 – R$ 16.000',
    // The languages the studio works in (inLanguage is for creative works, not businesses).
    knowsLanguage: locales.map((l) => localeInfo[l].htmlLang),
    areaServed: [
      { '@type': 'Country', name: 'Brasil' },
      { '@type': 'Place', name: 'Worldwide' },
    ],
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}
