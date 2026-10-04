import Demo from '@/demos/motta-advogados/demo';
import { localeDemoMetadata } from '@/demos/route';

// The en/es params come from the [locale] layout (generateStaticParams, dynamicParams = false).
export const generateMetadata = localeDemoMetadata('motta-advogados');

export default function Page() {
  return <Demo />;
}
