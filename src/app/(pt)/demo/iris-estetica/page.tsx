import Demo from '@/demos/iris-estetica/demo';
import { demoMetadata } from '@/demos/route';

export const metadata = demoMetadata('pt', 'iris-estetica');

export default function Page() {
  return <Demo />;
}
