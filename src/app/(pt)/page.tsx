import { homeMetadata } from '@/lib/seo';
import { HomePage } from '@/components/home/home-page';

export const metadata = homeMetadata('pt');

export default function Page() {
  return <HomePage locale="pt" />;
}
