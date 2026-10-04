import type { Metadata } from 'next';
import { isLocale } from '@/i18n/config';
import { homeMetadata } from '@/lib/seo';
import { HomePage } from '@/components/home/home-page';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return isLocale(locale) ? homeMetadata(locale) : {};
}

export default async function Page({ params }: Props) {
  const { locale } = await params;
  return <HomePage locale={isLocale(locale) ? locale : 'en'} />;
}
