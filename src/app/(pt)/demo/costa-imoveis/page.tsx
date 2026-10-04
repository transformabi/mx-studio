import Demo from '@/demos/costa-imoveis/demo';
import { demoMetadata } from '@/demos/route';

export const metadata = demoMetadata('pt', 'costa-imoveis');

export default function Page() {
  return <Demo />;
}
