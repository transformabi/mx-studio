import Demo from '@/demos/clinica-sereno/demo';
import { localeDemoMetadata } from '@/demos/route';

// The en/es params come from the [locale] layout (generateStaticParams, dynamicParams = false).
export const generateMetadata = localeDemoMetadata('clinica-sereno');

export default function Page() {
  return <Demo />;
}
