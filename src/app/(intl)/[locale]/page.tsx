import type { Metadata } from 'next';
import { isLocale } from '@/i18n/config';
import { messages } from '@/i18n/messages';
import { HomePage } from '@/components/home/home-page';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return { title: messages[locale].meta.title, description: messages[locale].meta.description };
}

export default async function Page({ params }: Props) {
  const { locale } = await params;
  return <HomePage locale={isLocale(locale) ? locale : 'en'} />;
}
