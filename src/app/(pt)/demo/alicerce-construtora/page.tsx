import Demo from '@/demos/alicerce-construtora/demo';
import { demoMetadata } from '@/demos/route';

export const metadata = demoMetadata('pt', 'alicerce-construtora');

export default function Page() {
  return <Demo />;
}
