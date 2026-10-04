import Demo from '@/demos/moda-arte/demo';
import { demoMetadata } from '@/demos/route';

export const metadata = demoMetadata('pt', 'moda-arte');

export default function Page() {
  return <Demo />;
}
