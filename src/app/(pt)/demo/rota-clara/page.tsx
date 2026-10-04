import Demo from '@/demos/rota-clara/demo';
import { demoMetadata } from '@/demos/route';

export const metadata = demoMetadata('pt', 'rota-clara');

export default function Page() {
  return <Demo />;
}
