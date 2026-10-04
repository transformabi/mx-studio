import Demo from '@/demos/rota-clara/demo';
import { localeDemoMetadata } from '@/demos/route';

// The en/es params come from the [locale] layout (generateStaticParams, dynamicParams = false).
export const generateMetadata = localeDemoMetadata('rota-clara');

export default function Page() {
  return <Demo />;
}
