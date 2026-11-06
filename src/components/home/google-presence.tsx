import { ArrowDown, MessageCircle } from 'lucide-react';
import type { Locale } from '@/i18n/config';
import type { Messages } from '@/i18n/messages';
import { diagnosticoUrl, whatsappUrl } from '@/lib/estudio';
import { ButtonLink } from '@/components/site/button-link';
import { SectionHeader } from '@/components/site/section-header';
import { Reveal } from '@/components/reveal';

/** Educational section: site + domain + Google Business Profile, with Search Profile readiness when eligible. */
export function GooglePresence({
  locale,
  t,
  waMsg,
}: {
  locale: Locale;
  t: Messages['googlePresence'];
  waMsg: string;
}) {
  return (
    <section id="presenca-google" className="scroll-mt-24 border-t border-white/10 py-24 sm:py-32">
      <div className="container-site">
        <SectionHeader index="04" label={t.label} title={t.title} lead={t.lead} />

        <ol className="mt-16 grid gap-6 lg:grid-cols-3">
          {t.pillars.map((pillar, i) => (
            <Reveal key={pillar.title} delay={i * 80}>
              <li className="flex h-full flex-col rounded-xl border border-white/10 bg-ink-2 p-7">
                <span className="font-label text-xs text-white/50">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="mt-8 font-brand text-2xl font-bold tracking-tight">{pillar.title}</h3>
                <p className="mt-1 font-label text-xs uppercase tracking-[0.12em] text-lime/90">{pillar.tag}</p>
                <p className="mt-4 flex-1 text-[15px] leading-relaxed text-white/70">{pillar.text}</p>
              </li>
            </Reveal>
          ))}
        </ol>

        <Reveal delay={120}>
          <aside className="mt-10 rounded-xl border border-white/10 bg-ink-2/60 p-6 sm:p-8 lg:ml-[25%]">
            <p className="font-label text-xs uppercase tracking-[0.14em] text-white/50">{t.noteLabel}</p>
            <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-white/70">{t.note}</p>
            <ul className="mt-5 max-w-2xl space-y-2 text-sm text-white/65">
              {t.caveats.map((item) => (
                <li key={item} className="flex gap-2.5">
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-lime" aria-hidden />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </aside>
        </Reveal>

        <div className="mt-12 flex flex-wrap items-center gap-3 lg:ml-[25%]">
          <ButtonLink href={diagnosticoUrl(locale)} className="cta-call">
            {t.ctaPlans}
            <ArrowDown className="cta-call-arrow h-4 w-4" aria-hidden />
          </ButtonLink>
          <ButtonLink href={whatsappUrl(waMsg)} external variant="outline">
            <MessageCircle className="h-4 w-4" aria-hidden />
            {t.ctaWhatsapp}
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
