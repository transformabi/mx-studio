'use client';

import { ArrowUpRight, Check, Clock, CreditCard, Mail, MessageCircle } from 'lucide-react';
import { fill } from '@/i18n/format';
import type { Messages } from '@/i18n/messages';
import { useI18n } from '@/i18n/provider';
import { localizedPath } from '@/i18n/paths';
import { estudio, planoCheckoutUrl, planos, planosCurrency, planosDeliveryDays, whatsappUrl } from '@/lib/estudio';
import { CurrencySwitch } from '@/components/site/currency-switch';
import { BoletoLogo, CardLogos, PixLogo, WiseLogo } from '@/components/site/payment-logos';
import { SectionHeader } from '@/components/site/section-header';
import { Reveal } from '@/components/reveal';
import { cn } from '@/lib/utils';

/**
 * Small-business plans: one-time setup + monthly maintenance, live in 14 days. Priced in EUR and shown
 * in the visitor's currency; converted amounts are marked "≈", and the WhatsApp/e-mail text uses them too.
 */
// Brand marks in the same order as pricing.payments.methods: card, Pix, boleto (all Stripe), then Wise (arranged directly).
const methodLogos = [CardLogos, PixLogo, BoletoLogo, WiseLogo];

export function Plans({ t, payments }: { t: Messages['pricing']['plans']; payments: Messages['pricing']['payments'] }) {
  const { convert, currency, locale } = useI18n();
  const converted = currency !== planosCurrency;
  const price = (amount: number) => {
    const value = convert(amount, planosCurrency, { decimals: 0, round: true });
    return converted ? `≈ ${value}` : value;
  };

  return (
    <section id="planos" className="scroll-mt-24 py-24 sm:py-32">
      <div className="container-site">
        <SectionHeader index="04" label={t.label} title={fill(t.title, { price: price(planos[0].setup) })} lead={t.lead} />

        <div className="mt-10 flex flex-wrap items-center justify-between gap-4 lg:pl-[25%]">
          <CurrencySwitch label={t.currencyLabel} />
          {converted && <p className="text-xs text-white/50">{t.approx}</p>}
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {planos.map((plan, i) => {
            const item = t.plans[plan.id];
            const setup = price(plan.setup);
            const monthly = price(plan.monthly);
            const featured = 'featured' in plan && plan.featured;
            const msg = fill(t.askMsg, { plan: item.name, setup, monthly });
            const subject = fill(t.emailSubject, { plan: item.name });
            return (
              <Reveal key={plan.id} delay={i * 80}>
                <article
                  data-plan={plan.id}
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
                  <p className="mt-1 min-h-10 text-sm text-white/55">{item.text}</p>

                  {/* Setup and maintenance on their own lines, so long converted amounts never wrap unevenly. */}
                  <div className="mt-7">
                    <p className="font-label text-[11px] uppercase tracking-[0.14em] text-white/50">{t.setupLabel}</p>
                    <p className="mt-1 whitespace-nowrap font-brand text-4xl font-bold leading-none tracking-tight text-lime">
                      {setup}
                    </p>
                    <p className="mt-4 font-label text-[11px] uppercase tracking-[0.14em] text-white/50">
                      <span aria-hidden>{t.plus} </span>
                      {t.monthlyLabel}
                    </p>
                    <p className="mt-1 whitespace-nowrap font-brand text-2xl font-bold leading-none tracking-tight">
                      {monthly}
                      <span className="ml-0.5 text-sm font-semibold text-white/55">{t.per}</span>
                    </p>
                  </div>

                  <p className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-lime">
                    <Clock className="h-4 w-4" aria-hidden />
                    {fill(t.delivery, { days: planosDeliveryDays })}
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
                    {/* Stripe Payment Link: monthly subscription + one-time setup on the first invoice. */}
                    <a
                      href={planoCheckoutUrl(plan.checkout, locale)}
                      data-checkout={plan.id}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={cn(
                        'inline-flex w-full items-center justify-center gap-1.5 rounded-full px-6 py-3.5 text-sm font-semibold transition-colors duration-200',
                        featured ? 'bg-lime text-ink hover:bg-[#b8ff52]' : 'border border-white/20 text-bone hover:border-white/60',
                      )}
                    >
                      <CreditCard className="h-4 w-4" aria-hidden />
                      {fill(t.checkout, { plan: item.name })}
                      <ArrowUpRight className="h-4 w-4" aria-hidden />
                    </a>
                    {/* One-time Stripe link for the setup fee only (Pix, boleto or card), for clients in Brazil. */}
                    <a
                      href={planoCheckoutUrl(plan.pixCheckout, locale)}
                      data-pix-checkout={plan.id}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-3 inline-flex w-full items-center justify-center gap-2 text-xs text-white/70 transition-colors hover:text-lime"
                    >
                      <PixLogo />
                      {t.pix}
                    </a>
                    <a
                      href={whatsappUrl(msg)}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={fill(t.cta, { plan: item.name })}
                      className="mt-3 inline-flex w-full items-center justify-center gap-1.5 rounded-full border border-white/15 px-6 py-3 text-sm font-semibold text-white/80 transition-colors duration-200 hover:border-white/50 hover:text-bone"
                    >
                      <MessageCircle className="h-4 w-4" aria-hidden />
                      {t.whatsapp}
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

        {/* Every Stripe link requires ticking the same terms (v1.0) before paying. */}
        <p data-terms-notice className="mt-8 max-w-3xl text-sm leading-relaxed text-white/75">
          {t.termsNotice.before}
          <a href={localizedPath(locale, '/termos')} className="font-semibold text-lime underline underline-offset-4 hover:text-bone">
            {t.termsNotice.link}
          </a>
          {t.termsNotice.after}
        </p>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-white/60">{t.maintenance}</p>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-white/60">{t.secure}</p>

        <div className="mt-10 grid gap-6 rounded-xl border border-white/10 p-7 lg:grid-cols-12 lg:items-center">
          <p className="font-label text-[11px] uppercase tracking-[0.14em] text-white/50 lg:col-span-3">{payments.title}</p>
          <ul className="flex flex-wrap gap-3 lg:col-span-9">
            {payments.methods.map((m, i) => {
              const Logo = methodLogos[i];
              return (
                <li key={m} className="inline-flex items-center gap-2.5 rounded-full border border-white/15 px-4 py-2 text-sm">
                  <Logo />
                  {m}
                </li>
              );
            })}
          </ul>
          <p className="text-sm leading-relaxed text-white/60 lg:col-span-12">{payments.note}</p>
        </div>
      </div>
    </section>
  );
}
