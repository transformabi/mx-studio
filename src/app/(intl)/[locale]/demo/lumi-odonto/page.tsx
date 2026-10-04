import Demo from '@/demos/lumi-odonto/demo';
import { localeDemoMetadata } from '@/demos/route';

// The en/es params come from the [locale] layout (generateStaticParams, dynamicParams = false).
export const generateMetadata = localeDemoMetadata('lumi-odonto');

export default function Page() {
  return <Demo />;
}
