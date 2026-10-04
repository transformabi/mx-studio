import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import type { Locale } from '@/i18n/config';
import { demoBySlug, demos, isShowcased, type DemoSlug } from '@/lib/estudio';
import { demoComponents } from './registry';

export const demoParams = () => demos.map(({ slug }) => ({ slug }));

const isDemoSlug = (slug: string): slug is DemoSlug => slug in demoBySlug;

export function demoMetadata(_locale: Locale, slug: string): Metadata {
  if (!isDemoSlug(slug)) return {};
  return {
    title: `${demoBySlug[slug].clientName} · MX Studio Web`,
    robots: isShowcased(slug) ? { index: true, follow: true } : { index: false, follow: false },
  };
}

export function DemoPage({ slug }: { slug: string }) {
  if (!isDemoSlug(slug)) notFound();
  const Demo = demoComponents[slug];
  return <Demo />;
}
