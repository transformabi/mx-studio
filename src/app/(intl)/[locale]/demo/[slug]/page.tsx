import { isLocale } from '@/i18n/config';
import { DemoPage, demoMetadata, demoParams } from '@/demos/route';

type Props = { params: Promise<{ locale: string; slug: string }> };

export const dynamicParams = false;
export const generateStaticParams = demoParams;

export async function generateMetadata({ params }: Props) {
  const { locale, slug } = await params;
  return isLocale(locale) ? demoMetadata(locale, slug) : {};
}

export default async function Page({ params }: Props) {
  return <DemoPage slug={(await params).slug} />;
}
