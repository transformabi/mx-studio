import { notFound } from 'next/navigation';
import { TermsPage, termsMetadata } from '@/components/terms/terms-page';

// The en slug of the terms page; the other prefixed language uses its own slug, so only 'en' is generated.
export const dynamicParams = false;
export function generateStaticParams() {
  return [{ locale: 'en' }];
}

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  return locale === 'en' ? termsMetadata('en') : {};
}

export default async function Page({ params }: Props) {
  const { locale } = await params;
  if (locale !== 'en') notFound();
  return <TermsPage locale="en" />;
}
