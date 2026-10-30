import { TermsPage, termsMetadata } from '@/components/terms/terms-page';

export const metadata = termsMetadata('pt');

export default function Page() {
  return <TermsPage locale="pt" />;
}
