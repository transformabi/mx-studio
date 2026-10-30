import { notFound } from 'next/navigation';
import { TermsPage, termsMetadata } from '@/components/terms/terms-page';

// The es slug of the terms page; the other prefixed language uses its own slug, so only 'es' is generated.
export const dynamicParams = false;
export function generateStaticParams() {
  return [{ locale: 'es' }];
}

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  return locale === 'es' ? termsMetadata('es') : {};
}

export default async function Page({ params }: Props) {
  const { locale } = await params;
  if (locale !== 'es') notFound();
  return <TermsPage locale="es" />;
}
