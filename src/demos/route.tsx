import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import type { Locale } from '@/i18n/config';
import { fill } from '@/i18n/format';
import { messages } from '@/i18n/messages';
import { demoBySlug, demos, isShowcased, type DemoSlug } from '@/lib/estudio';
import { pageMetadata } from '@/lib/seo';
import { demoComponents } from './registry';

export const demoParams = () => demos.map(({ slug }) => ({ slug }));

const isDemoSlug = (slug: string): slug is DemoSlug => slug in demoBySlug;

export function demoMetadata(locale: Locale, slug: string): Metadata {
  if (!isDemoSlug(slug)) return {};
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

export function DemoPage({ slug }: { slug: string }) {
  if (!isDemoSlug(slug)) notFound();
  const Demo = demoComponents[slug];
  return <Demo />;
}
