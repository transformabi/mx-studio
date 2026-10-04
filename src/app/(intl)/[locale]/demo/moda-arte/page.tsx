import Demo from '@/demos/moda-arte/demo';
import { localeDemoMetadata } from '@/demos/route';

// The en/es params come from the [locale] layout (generateStaticParams, dynamicParams = false).
export const generateMetadata = localeDemoMetadata('moda-arte');

export default function Page() {
  return <Demo />;
}
