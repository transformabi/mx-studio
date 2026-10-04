import Demo from '@/demos/lumi-odonto/demo';
import { demoMetadata } from '@/demos/route';

export const metadata = demoMetadata('pt', 'lumi-odonto');

export default function Page() {
  return <Demo />;
}
