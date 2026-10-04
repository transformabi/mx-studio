import Demo from '@/demos/mare-salao/demo';
import { demoMetadata } from '@/demos/route';

export const metadata = demoMetadata('pt', 'mare-salao');

export default function Page() {
  return <Demo />;
}
