import Demo from '@/demos/alicerce-construtora/demo';
import { localeDemoMetadata } from '@/demos/route';

// The en/es params come from the [locale] layout (generateStaticParams, dynamicParams = false).
export const generateMetadata = localeDemoMetadata('alicerce-construtora');

export default function Page() {
  return <Demo />;
}
