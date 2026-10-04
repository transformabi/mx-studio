import Demo from '@/demos/costa-imoveis/demo';
import { localeDemoMetadata } from '@/demos/route';

// The en/es params come from the [locale] layout (generateStaticParams, dynamicParams = false).
export const generateMetadata = localeDemoMetadata('costa-imoveis');

export default function Page() {
  return <Demo />;
}
