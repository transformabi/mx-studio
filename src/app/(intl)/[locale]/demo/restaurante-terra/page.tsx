import Demo from '@/demos/restaurante-terra/demo';
import { localeDemoMetadata } from '@/demos/route';

// The en/es params come from the [locale] layout (generateStaticParams, dynamicParams = false).
export const generateMetadata = localeDemoMetadata('restaurante-terra');

export default function Page() {
  return <Demo />;
}
