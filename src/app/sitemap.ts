import type { MetadataRoute } from 'next';
import { locales } from '@/i18n/config';
import { localizedPath } from '@/i18n/paths';
import { showcase } from '@/lib/estudio';
import { absoluteAlternates, absoluteUrl } from '@/lib/seo';

export const dynamic = 'force-static';

/** Public, indexable pages only: the home, the six showcased demos and the terms, in the three languages. */
export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ['/', ...showcase.map((slug) => `/demo/${slug}`), '/termos'];
  return paths.flatMap((path) =>
    locales.map((locale) => ({
      url: absoluteUrl(localizedPath(locale, path)),
      changeFrequency: 'monthly' as const,
      priority: path === '/' ? 1 : path === '/termos' ? 0.3 : 0.6,
      alternates: { languages: absoluteAlternates(path) },
    })),
  );
}
