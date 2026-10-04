import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/estudio';

export const dynamic = 'force-static';

// Everything stays crawlable so the noindex tags on the internal pages can be read.
export default function robots(): MetadataRoute.Robots {
  return { rules: { userAgent: '*', allow: '/' }, sitemap: `${SITE_URL}/sitemap.xml` };
}
