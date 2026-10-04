import Demo from '@/demos/clinica-sereno/demo';
import { demoMetadata } from '@/demos/route';

export const metadata = demoMetadata('pt', 'clinica-sereno');

export default function Page() {
  return <Demo />;
}
