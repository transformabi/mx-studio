import { DemoPage, demoMetadata, demoParams } from '@/demos/route';

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;
export const generateStaticParams = demoParams;

export async function generateMetadata({ params }: Props) {
  return demoMetadata('pt', (await params).slug);
}

export default async function Page({ params }: Props) {
  return <DemoPage slug={(await params).slug} />;
}
