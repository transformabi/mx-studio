import { ArrowUpRight, Check, Clock, Mail } from 'lucide-react';
import { localeInfo, type Locale } from '@/i18n/config';
import { fill } from '@/i18n/format';
import type { Messages } from '@/i18n/messages';
import { estudio, expressDeliveryDays, expressPlans, whatsappUrl } from '@/lib/estudio';
import { SectionHeader } from '@/components/site/section-header';
import { Reveal } from '@/components/reveal';
import { cn } from '@/lib/utils';

/** Fixed euro amounts: these plans are priced in EUR, so they skip the site's BRL conversion. */
export const eur = (locale: Locale, n: number) =>
  new Intl.NumberFormat(localeInfo[locale].intl, { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(n);

/** Entry offer: one-time setup + monthly maintenance, live in 14 days. Sits before the quoted services. */
export function ExpressPlans({ locale, t }: { locale: Locale; t: Messages['pricing']['express'] }) {
  return (
    <section id="express" className="scroll-mt-24 border-t border-white/10 py-24 sm:py-32">
      <div className="container-site">
        <SectionHeader index="04" label={t.label} title={t.title} lead={t.lead} />

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {expressPlans.map((plan, i) => {
            const item = t.plans[plan.id];
            const setup = eur(locale, plan.setup);
            const monthly = eur(locale, plan.monthly);
            const featured = 'featured' in plan && plan.featured;
            const msg = fill(t.askMsg, { plan: item.name, setup, monthly });
            const subject = fill(t.emailSubject, { plan: item.name });
            return (
              <Reveal key={plan.id} delay={i * 80}>
                <article
                  className={cn(
                    'relative flex h-full flex-col rounded-xl border bg-ink-2 p-7',
                    featured ? 'border-lime/70' : 'border-white/10',
                  )}
                >
                  {featured && (
                    <p className="absolute -top-3 left-7 rounded-full bg-lime px-3 py-1 font-label text-[10px] uppercase tracking-[0.14em] text-ink">
                      {t.featured}
                    </p>
                  )}
                  <h3 className="font-brand text-2xl font-bold tracking-tight">{item.name}</h3>
                  <p className="mt-1 text-sm text-white/55">{item.text}</p>

                  <div className="mt-7 flex items-end gap-3">
                    <div>
                      <p className="font-label text-[11px] uppercase tracking-[0.14em] text-white/50">{t.setupLabel}</p>
                      <p className="mt-1 font-brand text-4xl font-bold leading-none tracking-tight text-lime">{setup}</p>
                    </div>
                    <p className="pb-1 font-brand text-xl font-bold text-white/40" aria-hidden>
                      {t.plus}
                    </p>
                    <div>
                      <p className="font-label text-[11px] uppercase tracking-[0.14em] text-white/50">{t.monthlyLabel}</p>
                      <p className="mt-1 font-brand text-2xl font-bold leading-none tracking-tight">
                        {monthly}
                        <span className="ml-0.5 text-sm font-semibold text-white/55">{t.per}</span>
                      </p>
                    </div>
                  </div>

                  <p className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-lime">
                    <Clock className="h-4 w-4" aria-hidden />
                    {fill(t.delivery, { days: expressDeliveryDays })}
                  </p>

                  <ul className="mt-6 space-y-2.5 text-sm text-white/75">
                    {item.bullets.map((b) => (
                      <li key={b} className="flex gap-2.5">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-lime" aria-hidden />
                        {b}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-auto pt-8">
                    <a
                      href={whatsappUrl(msg)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={cn(
                        'inline-flex w-full items-center justify-center gap-1.5 rounded-full px-6 py-3.5 text-sm font-semibold transition-colors duration-200',
                        featured ? 'bg-lime text-ink hover:bg-[#b8ff52]' : 'border border-white/20 text-bone hover:border-white/60',
                      )}
                    >
                      {fill(t.cta, { plan: item.name })}
                      <ArrowUpRight className="h-4 w-4" aria-hidden />
                    </a>
                    <a
                      href={`mailto:${estudio.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(msg)}`}
                      className="mt-3 inline-flex w-full items-center justify-center gap-1.5 text-xs text-white/55 transition-colors hover:text-lime"
                    >
                      <Mail className="h-3.5 w-3.5" aria-hidden />
                      {t.email}
                    </a>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>

        <p className="mt-8 max-w-3xl text-sm leading-relaxed text-white/60">{t.maintenance}</p>
      </div>
    </section>
  );
}
