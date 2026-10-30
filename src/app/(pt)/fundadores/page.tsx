import { pt } from '@/i18n/messages/pt';
import { pageMetadata } from '@/lib/seo';
import { Pricing } from '@/components/home/pricing';

// Old launch URL. It stays out of search and now shows the small-business plans.
export const metadata = pageMetadata({
  locale: 'pt',
  path: '/fundadores',
  title: 'Planos para pequenos negócios · MX Studio Web',
  description: 'Site para pequenos negócios no ar em 14 dias: planos Launch, Business e Growth, com criação + mensalidade.',
  index: false,
  translated: false,
});

export default function FundadoresPage() {
  return (
    <main id="conteudo" className="font-body pt-8">
      <Pricing t={pt.pricing} />
    </main>
  );
}
