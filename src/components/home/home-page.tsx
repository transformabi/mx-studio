import type { Locale } from '@/i18n/config';
import { messages } from '@/i18n/messages';
import { About } from './about';
import { ClientCase } from './client-case';
import { Contact } from './contact';
import { Faq } from './faq';
import { Hero } from './hero';
import { Pricing } from './pricing';
import { Process } from './process';
import { Showcase } from './showcase';

export function HomePage({ locale }: { locale: Locale }) {
  const t = messages[locale];
  return (
    <main className="font-body">
      <Hero t={t.hero} waMsg={t.whatsappMsg} />
      <ClientCase t={t.case} />
      <Showcase locale={locale} t={t.work} />
      <Process t={t.process} />
      <Pricing t={t.pricing} />
      <About t={t.about} />
      <Faq t={t.faq} />
      <Contact t={t.contact} waMsg={t.whatsappMsg} />
    </main>
  );
}
