import Link from 'next/link';
import { ArrowRight, ArrowUpRight, Check } from 'lucide-react';
import { fill } from '@/i18n/format';
import type { Messages } from '@/i18n/messages';
import { fundadores, services, whatsappUrl } from '@/lib/estudio';
import { CardLogos, PixLogo, WiseLogo } from '@/components/site/payment-logos';
import { SectionHeader } from '@/components/site/section-header';

// Brand marks in the same order as pricing.payments.methods: PIX, card, Wise.
const methodLogos = [PixLogo, CardLogos, WiseLogo];

const brl = (n: number) =>
  new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 }).format(n);

export function Pricing({ t }: { t: Messages['pricing'] }) {
  const price = brl(fundadores.preco);
  return (
    <section id="pricing" className="py-24 sm:py-32">
      <div className="container-site">
        <SectionHeader index="04" label={t.label} title={t.title} lead={t.lead} />

        <div className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {services.map(({ key }) => {
            const item = t.items[key];
            return (
              // Each card spans six rows of the parent grid (subgrid), one per child, so titles,
              // the consult line, bullets and buttons line up across a row even when text wraps.
              <article
                key={key}
                className="row-span-6 grid grid-rows-subgrid gap-y-0 rounded-xl border border-white/10 bg-ink-2 p-7"
              >
                <h3 className="font-brand text-xl font-bold tracking-tight">{item.title}</h3>
                <p className="mt-1 text-sm text-white/55">{item.text}</p>
                <p className="mt-8 font-label text-[11px] uppercase tracking-[0.14em] text-white/50">{t.consultLabel}</p>
                <p className="mt-1 font-brand text-3xl font-bold leading-tight tracking-tight">{t.consult}</p>
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

        <div className="mt-4 rounded-xl border border-lime/40 bg-ink-2 p-7 sm:p-8">
          <div className="grid items-end gap-8 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <p className="font-label text-[11px] uppercase tracking-[0.14em] text-lime">{t.offer.eyebrow}</p>
              <h3 className="mt-3 font-brand text-3xl font-bold tracking-tight sm:text-4xl">
                {fill(t.offer.title, { price })}
              </h3>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/65">
                {fill(t.offer.text, { days: fundadores.prazoDias, slots: fundadores.vagas })}
              </p>
            </div>
            <div className="lg:col-span-4 lg:text-right">
              <p className="font-brand text-5xl font-bold tracking-tight text-lime">{price}</p>
              <Link
                href="/fundadores"
                className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold transition-colors hover:text-lime"
              >
                {t.offer.cta}
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-10 grid gap-6 rounded-xl border border-white/10 p-7 lg:grid-cols-12 lg:items-center">
          <p className="font-label text-[11px] uppercase tracking-[0.14em] text-white/50 lg:col-span-3">{t.payments.title}</p>
          <ul className="flex flex-wrap gap-3 lg:col-span-9">
            {t.payments.methods.map((m, i) => {
              const Logo = methodLogos[i];
              return (
                <li key={m} className="inline-flex items-center gap-2.5 rounded-full border border-white/15 px-4 py-2 text-sm">
                  <Logo />
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
