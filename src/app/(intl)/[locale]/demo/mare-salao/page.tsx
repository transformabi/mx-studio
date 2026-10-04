import Demo from '@/demos/mare-salao/demo';
import { localeDemoMetadata } from '@/demos/route';

// The en/es params come from the [locale] layout (generateStaticParams, dynamicParams = false).
export const generateMetadata = localeDemoMetadata('mare-salao');

export default function Page() {
  return <Demo />;
}
