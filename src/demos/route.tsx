import type { Metadata } from 'next';
import { isLocale, type Locale } from '@/i18n/config';
import { fill } from '@/i18n/format';
import { messages } from '@/i18n/messages';
import { demoBySlug, isShowcased, type DemoSlug } from '@/lib/estudio';
import { pageMetadata } from '@/lib/seo';

// Shared helpers for the demo pages. Every demo has its own route folder,
// app/(pt)/demo/<slug> and app/(intl)/[locale]/demo/<slug>, that statically imports
// only its own demo, so each page ships just that demo's code. (A single [slug] route
// with a slug → component map put all ten demos in every demo page's client bundle.)

export function demoMetadata(locale: Locale, slug: DemoSlug): Metadata {
  const { clientName } = demoBySlug[slug];
  const t = messages[locale].demo;
  return pageMetadata({
    locale,
    path: `/demo/${slug}`,
    title: `${clientName} · ${t.badge} · MX Studio Web`,
    description: fill(t.description, { name: clientName }),
    index: isShowcased(slug),
  });
}

/** generateMetadata for /[locale]/demo/<slug>; the [locale] layout only builds en and es and 404s the rest. */
export const localeDemoMetadata =
  (slug: DemoSlug) =>
  async ({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> => {
    const { locale } = await params;
    return isLocale(locale) ? demoMetadata(locale, slug) : {};
  };
