import { ArrowUpRight, Check, CreditCard, Globe, QrCode } from 'lucide-react';
import { fill } from '@/i18n/format';
import type { Messages } from '@/i18n/messages';
import { services, whatsappUrl } from '@/lib/estudio';
import { CurrencySwitch } from '@/components/site/currency-switch';
import { Price } from '@/components/site/price';
import { SectionHeader } from '@/components/site/section-header';

// Same order as pricing.payments.methods: PIX, card, Wise.
const methodIcons = [QrCode, CreditCard, Globe];

export function Pricing({ t }: { t: Messages['pricing'] }) {
  return (
    <section id="pricing" className="py-24 sm:py-32">
      <div className="container-site">
        <SectionHeader index="04" label={t.label} title={t.title} lead={t.lead} />

        <div className="mt-14 flex flex-wrap items-center justify-between gap-4 border-y border-white/10 py-4">
          <CurrencySwitch label={t.currency} />
          <p className="max-w-md text-xs leading-relaxed text-white/45">{t.approx}</p>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {services.map(({ key, price }) => {
            const item = t.items[key];
            return (
              <article key={key} className="flex flex-col rounded-xl border border-white/10 bg-ink-2 p-7">
                <h3 className="font-brand text-xl font-bold tracking-tight">{item.title}</h3>
                <p className="mt-1 text-sm text-white/55">{item.text}</p>
                <p className="mt-8 font-label text-[11px] uppercase tracking-[0.14em] text-white/45">{t.from}</p>
                <Price brl={price} className="mt-1 block font-brand text-4xl font-bold tracking-tight" />
                <ul className="mt-7 space-y-2.5 text-sm text-white/75">
                  {item.bullets.map((b) => (
                    <li key={b} className="flex gap-2.5">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-lime" aria-hidden />
                      {b}
                    </li>
                  ))}
                </ul>
                <a
                  href={whatsappUrl(fill(t.askMsg, { service: item.title }))}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-auto inline-flex items-center gap-1.5 pt-8 text-sm font-semibold transition-colors hover:text-lime"
                >
                  {t.ask}
                  <ArrowUpRight className="h-4 w-4" aria-hidden />
                </a>
              </article>
            );
          })}
        </div>

        <div className="mt-10 grid gap-6 rounded-xl border border-white/10 p-7 lg:grid-cols-12 lg:items-center">
          <p className="font-label text-[11px] uppercase tracking-[0.14em] text-white/50 lg:col-span-3">{t.payments.title}</p>
          <ul className="flex flex-wrap gap-3 lg:col-span-9">
            {t.payments.methods.map((m, i) => {
              const Icon = methodIcons[i];
              return (
                <li key={m} className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-sm">
                  <Icon className="h-4 w-4 text-lime" aria-hidden />
                  {m}
                </li>
              );
            })}
          </ul>
          <p className="text-sm leading-relaxed text-white/60 lg:col-span-12">
            {t.payments.terms} {t.payments.abroad}
          </p>
        </div>
      </div>
    </section>
  );
}
