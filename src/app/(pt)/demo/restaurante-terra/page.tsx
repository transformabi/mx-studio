import Demo from '@/demos/restaurante-terra/demo';
import { demoMetadata } from '@/demos/route';

export const metadata = demoMetadata('pt', 'restaurante-terra');

export default function Page() {
  return <Demo />;
}
