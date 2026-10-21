import { pt } from '@/i18n/messages/pt';
import { pageMetadata } from '@/lib/seo';
import { Pricing } from '@/components/home/pricing';

// Old launch URL. It stays out of search and now shows the three subscription plans, not the retired price.
export const metadata = pageMetadata({
  locale: 'pt',
  path: '/fundadores',
  title: 'Planos por assinatura · MX Studio Web',
  description: 'Site por assinatura para pequenos negócios: Essencial, Profissional e Completo.',
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
