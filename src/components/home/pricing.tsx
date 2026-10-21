import Image from 'next/image';
import { ArrowUpRight, Check } from 'lucide-react';
import { fill } from '@/i18n/format';
import type { Messages } from '@/i18n/messages';
import { planos, services, whatsappUrl } from '@/lib/estudio';
import { CardLogos, PixLogo, WiseLogo } from '@/components/site/payment-logos';
import { SectionHeader } from '@/components/site/section-header';
import { Reveal } from '@/components/reveal';

// Brand marks in the same order as pricing.payments.methods: PIX, card, Wise.
const methodLogos = [PixLogo, CardLogos, WiseLogo];

const brl = (n: number) =>
  new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 }).format(n);

export function Pricing({ t }: { t: Messages['pricing'] }) {
  return (
    <>
      <section id="pricing" className="py-24 sm:py-32">
        <div className="container-site">
          <SectionHeader index="04" label={t.label} title={t.title} lead={t.lead} />

          <div className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {services.map(({ key }) => {
              const item = t.items[key];
              return (
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

      <section id="planos" className="scroll-mt-24 border-t border-white/10 py-24 sm:py-32">
        <div className="container-site">
          <SectionHeader index="05" label={t.plans.label} title={t.plans.title} lead={t.plans.lead} />
          <div className="mt-14 grid gap-6 lg:grid-cols-3">
            {planos.map((plano, i) => {
              const item = t.plans[plano.id];
              const price = brl(plano.price);
              return (
                <Reveal key={plano.id} delay={i * 80}>
                  <article className="flex h-full flex-col">
                    <Image
                      src={plano.image}
                      alt={item.alt}
                      width={plano.width}
                      height={plano.height}
                      sizes="(min-width: 1024px) 30vw, 100vw"
                      className="h-auto w-full rounded-xl border border-white/10"
                    />
                    <h3 className="mt-6 font-brand text-2xl font-bold tracking-tight">{item.name}</h3>
                    <p className="mt-1 font-brand text-4xl font-bold tracking-tight text-lime">
                      {price}
                      <span className="ml-1 text-base font-semibold text-white/55">{t.plans.per}</span>
                    </p>
                    <ul className="mt-6 space-y-2.5 text-sm text-white/75">
                      {item.bullets.map((b) => (
                        <li key={b} className="flex gap-2.5">
                          <Check className="mt-0.5 h-4 w-4 shrink-0 text-lime" aria-hidden />
                          {b}
                        </li>
                      ))}
                    </ul>
                    <a
                      href={whatsappUrl(fill(t.plans.askMsg, { plan: item.name, price }))}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-auto inline-flex items-center gap-1.5 pt-8 text-sm font-semibold transition-colors hover:text-lime"
                    >
                      {t.plans.cta}
                      <ArrowUpRight className="h-4 w-4" aria-hidden />
                    </a>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
