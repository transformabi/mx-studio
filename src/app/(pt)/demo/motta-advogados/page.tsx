import Demo from '@/demos/motta-advogados/demo';
import { demoMetadata } from '@/demos/route';

export const metadata = demoMetadata('pt', 'motta-advogados');

export default function Page() {
  return <Demo />;
}
