import Demo from '@/demos/iris-estetica/demo';
import { localeDemoMetadata } from '@/demos/route';

// The en/es params come from the [locale] layout (generateStaticParams, dynamicParams = false).
export const generateMetadata = localeDemoMetadata('iris-estetica');

export default function Page() {
  return <Demo />;
}
