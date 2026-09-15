import type { ReactNode } from 'react';
import { ArrowDown, ArrowUpRight, BadgeCheck, Handshake, MessageCircle } from 'lucide-react';

import { Reveal } from '@/components/reveal';
import { EstudioBtn } from '@/components/btn';
import { Marquee } from '@/components/marquee';
import { ContactForm } from '@/components/contact-form';
import { FaqAccordion } from '@/components/faq-accordion';
import { ProcessTimeline } from '@/components/process-timeline';
import { WorkGrid } from '@/components/work-grid';
import { CountUp } from '@/components/fx/count-up';
import { HeroBackdrop } from '@/components/fx/hero-backdrop';
import { SpotlightCard } from '@/components/fx/spotlight-card';
import { Words, wordCount } from '@/components/fx/words';
import { demos, estudio, whatsappUrl } from '@/lib/estudio';
import { fill } from '@/i18n/format';
import { getI18n } from '@/i18n/server';

/** In BRL, same order as messages.services.items. */
const servicePrices = [4900, 9900, 3500, 16000];

const techStack = ['Next.js', 'TypeScript', 'Tailwind CSS', 'WebGL', 'Framer Motion', 'Vercel'];

const serifStyle = { fontFamily: 'var(--font-instrument-serif)' } as const;

export default async function EstudioHome() {
  const { t, currency, money } = await getI18n();

  const price = (brl: number) => money(brl, { decimals: 0, round: true });
  const compact = (brl: number) => money(brl, { compact: true });
  const budgets = [
    fill(t.form.budgetUpTo, { amount: compact(5000) }),
    `${compact(5000)}–${compact(10000)}`,
    `${compact(10000)}–${compact(20000)}`,
    fill(t.form.budgetAbove, { amount: compact(20000) }),
  ];
  const faqPrices = { price: price(4900), cheap: price(1500) };
  const faq = t.faq.items.map((f) => ({ q: fill(f.q, faqPrices), a: fill(f.a, faqPrices) }));
  const whatsapp = whatsappUrl(t.whatsappMsg);

  // Word indexes so the hero headline reveals as one continuous sequence.
  const h = t.hero;
  const wordsA = wordCount(h.titleA);
  const wordsEm = wordCount(h.titleEm);
  const wordsB = wordCount(h.titleB);
  const wordsAccent = wordCount(h.titleAccent);

  return (
    <>
      {/* HERO */}
      <section className="grain relative isolate flex min-h-[100svh] items-end overflow-hidden pb-14 pt-36 sm:pb-20">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(198,255,59,0.14),transparent),radial-gradient(ellipse_50%_40%_at_100%_10%,rgba(255,138,92,0.10),transparent)]"
        />
        <div aria-hidden className="absolute inset-0 -z-10">
          <HeroBackdrop />
        </div>
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 opacity-[0.05] [background:radial-gradient(circle_at_1px_1px,white_1px,transparent_0)] [background-size:40px_40px]"
        />

        <div className="container-wide relative">
          <Reveal>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/30 px-3 py-1 text-xs font-medium text-white/80 backdrop-blur">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#c6ff3b] opacity-70" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[#c6ff3b]" />
              </span>
              {h.badge}
            </div>
          </Reveal>

          <h1 className="mt-8 max-w-6xl font-display text-[clamp(2.75rem,7.5vw+0.5rem,8rem)] font-semibold leading-[0.92] tracking-tight text-white">
            <Words text={h.titleA} />{' '}
            <span style={serifStyle} className="font-normal italic text-white/90">
              <Words text={h.titleEm} start={wordsA} />
            </span>
            <br />
            <Words text={h.titleB} start={wordsA + wordsEm} />{' '}
            <span className="text-[#c6ff3b]">
              <Words text={`${h.titleAccent}.`} start={wordsA + wordsEm + wordsB} />
            </span>
          </h1>

          <div className="mt-10 grid grid-cols-1 items-end gap-8 lg:grid-cols-12">
            <Reveal delay={500} className="lg:col-span-7">
              <p className="max-w-2xl text-lg leading-relaxed text-white/70">
                {h.leadA} <span className="text-white">MX Studio</span>. {h.leadB}
              </p>
            </Reveal>
            <Reveal delay={600} className="lg:col-span-5 lg:justify-self-end">
              <div className="flex flex-wrap items-center gap-3">
                <EstudioBtn href={whatsapp} external>
                  <MessageCircle className="h-4 w-4" />
                  {h.whatsapp}
                </EstudioBtn>
                <EstudioBtn href="#trabalhos" variant="secondary">
                  {h.seeWork}
                  <ArrowUpRight className="h-4 w-4" />
                </EstudioBtn>
              </div>
            </Reveal>
          </div>

          <Reveal delay={700}>
            <div className="mt-14 grid grid-cols-2 gap-6 border-t border-white/10 pt-8 sm:grid-cols-4">
              {h.stats.map((s) => (
                <div key={s.label}>
                  <CountUp value={s.kpi} className="block font-display text-4xl font-semibold text-white sm:text-5xl" />
                  <div className="mt-1 text-xs text-white/50">{s.label}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>

        <a
          href="#trabalhos"
          aria-label={h.seeWork}
          className="absolute bottom-8 right-8 hidden h-14 w-14 place-items-center rounded-full border border-white/15 text-white/70 transition-colors hover:border-[#c6ff3b] hover:text-[#c6ff3b] xl:grid"
        >
          <ArrowDown className="h-5 w-5 animate-bounce" />
        </a>
      </section>

      {/* MARQUEE */}
      <section className="relative space-y-4 overflow-hidden border-y border-white/10 bg-white/[0.02] py-10">
        <Marquee speed={45}>
          {t.marquee.flatMap((item, i) => [
            <em key={`n${i}`} style={serifStyle} className="font-display text-3xl font-semibold text-white/80 sm:text-5xl">
              {item}
            </em>,
            <span key={`s${i}`} className="text-2xl text-[#c6ff3b]">★</span>,
          ])}
        </Marquee>
        <Marquee speed={60} reverse>
          {techStack.map((item) => (
            <span key={item} className="text-outline font-display text-5xl font-semibold uppercase tracking-tight sm:text-7xl">
              {item}
            </span>
          ))}
        </Marquee>
      </section>

      {/* TRABALHOS */}
      <section id="trabalhos" className="container-wide py-24 sm:py-32">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <Reveal>
            <div>
              <Eyebrow index="01">{t.work.eyebrow}</Eyebrow>
              <h2 className="mt-4 max-w-3xl font-display text-[clamp(2.25rem,5vw+0.5rem,4.5rem)] font-semibold leading-[1] tracking-tight text-white">
                {t.work.titleA}{' '}
                <span style={serifStyle} className="font-normal italic text-[#c6ff3b]">
                  {t.work.titleEm}
                </span>
                {t.work.titleB}
              </h2>
              <p className="mt-5 max-w-xl text-base text-white/60">{t.work.lead}</p>
              <p className="mt-4 max-w-xl text-sm text-white/40">{t.work.note}</p>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <div className="text-xs font-medium uppercase tracking-[0.16em] text-white/40">
              {t.work.count}
            </div>
          </Reveal>
        </div>

        <WorkGrid
          items={demos.map((demo) => ({
            demo,
            text: t.work.cards[demo.slug],
            openLabel: fill(t.work.openDemo, { name: demo.clientName }),
          }))}
          filters={t.work.filters}
          numberLabel={t.work.number}
          cursorLabel={t.work.cursor}
        />
      </section>

      {/* PROCESSO */}
      <section id="processo" className="relative border-t border-white/10 bg-white/[0.02] py-24 sm:py-32">
        <div className="container-wide grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-32">
              <Reveal>
                <Eyebrow index="02">{t.process.eyebrow}</Eyebrow>
                <h2 className="mt-4 font-display text-[clamp(2.25rem,4.5vw+0.5rem,4rem)] font-semibold leading-[1] tracking-tight text-white">
                  {t.process.titleA}{' '}
                  <span style={serifStyle} className="font-normal italic">
                    {t.process.titleEm}
                  </span>
                  {t.process.titleB}
                </h2>
              </Reveal>
              <div aria-hidden className="text-outline mt-10 hidden select-none font-display text-[12rem] font-semibold leading-none lg:block">
                0{t.process.steps.length}
              </div>
            </div>
          </div>
          <div className="lg:col-span-7">
            <ProcessTimeline steps={t.process.steps} />
          </div>
        </div>
      </section>

      {/* SERVIÇOS */}
      <section id="servicos" className="container-wide py-24 sm:py-32">
        <Reveal>
          <Eyebrow index="03">{t.services.eyebrow}</Eyebrow>
          <h2 className="mt-4 max-w-4xl font-display text-[clamp(2.25rem,4.5vw+0.5rem,4rem)] font-semibold leading-[1] tracking-tight text-white">
            {t.services.titleA}{' '}
            <span style={serifStyle} className="font-normal italic">
              {t.services.titleEm}
            </span>
            {t.services.titleB}
          </h2>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-4 md:grid-cols-2">
          {t.services.items.map((s, i) => (
            <Reveal key={s.title} delay={(i % 2) * 80}>
              <SpotlightCard className="h-full rounded-3xl border border-white/10 bg-white/[0.03] transition-colors hover:border-white/20">
                <div className="p-8">
                  <div className="flex items-start justify-between gap-6">
                    <div>
                      <span className="font-mono text-xs text-white/30">{String(i + 1).padStart(2, '0')}</span>
                      <div className="mt-2 font-display text-2xl font-semibold text-white sm:text-3xl">{s.title}</div>
                      <div className="mt-2 text-sm text-white/50">
                        {t.services.from}{' '}
                        <span className="font-display text-lg font-semibold text-[#c6ff3b]">{price(servicePrices[i])}</span>
                      </div>
                    </div>
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-white/15 bg-white/5 text-white transition-all duration-500 group-hover:rotate-45 group-hover:border-[#c6ff3b] group-hover:bg-[#c6ff3b] group-hover:text-black">
                      <ArrowUpRight className="h-4 w-4" />
                    </span>
                  </div>
                  <ul className="mt-8 grid grid-cols-2 gap-3 border-t border-white/10 pt-6 text-sm text-white/70">
                    {s.bullets.map((b) => (
                      <li key={b} className="flex items-start gap-2">
                        <BadgeCheck className="mt-0.5 h-4 w-4 shrink-0 text-[#c6ff3b]" />
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>

        {currency !== 'BRL' && <p className="mt-6 text-xs text-white/40">{t.prefs.ratesNote}</p>}
      </section>

      {/* SOBRE */}
      <section id="sobre" className="relative overflow-hidden border-t border-white/10 bg-white/[0.02] py-24 sm:py-32">
        <div className="container-wide grid grid-cols-1 gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <Eyebrow index="04">{t.about.eyebrow}</Eyebrow>
            <h2 className="mt-4 font-display text-[clamp(2.25rem,4.5vw+0.5rem,4rem)] font-semibold leading-[1] tracking-tight text-white">
              {t.about.titleA}{' '}
              <span style={serifStyle} className="font-normal italic text-[#c6ff3b]">
                {t.about.titleEm}
              </span>
              {t.about.titleB}
            </h2>
            <p className="mt-6 text-base leading-relaxed text-white/70">{t.about.p1}</p>
            <p className="mt-4 text-base leading-relaxed text-white/70">{t.about.p2}</p>

            <div className="mt-8 flex flex-wrap gap-3">
              <EstudioBtn href="#contato">
                {t.about.talk}
                <ArrowUpRight className="h-4 w-4" />
              </EstudioBtn>
              <EstudioBtn href="#trabalhos" variant="secondary">
                {t.about.seeWork}
              </EstudioBtn>
            </div>
          </Reveal>

          <Reveal delay={120} className="lg:col-span-7">
            <div className="grid grid-cols-2 gap-4">
              <SpotlightCard className="rounded-3xl border border-white/10 bg-white/[0.02]">
                <div className="p-6">
                  <div className="text-[11px] font-medium uppercase tracking-[0.14em] text-white/50">{t.about.stack}</div>
                  <Pills items={['Next.js 14', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Sanity / MDX', 'Vercel']} />
                </div>
              </SpotlightCard>
              <SpotlightCard className="rounded-3xl border border-white/10 bg-white/[0.02]">
                <div className="p-6">
                  <div className="text-[11px] font-medium uppercase tracking-[0.14em] text-white/50">{t.about.alsoWith}</div>
                  <Pills items={['Stripe / PagarMe', 'Google Maps', 'Supabase', 'Resend / Postmark', 'Cal.com / Calendly', 'Analytics 4 + Pixel']} />
                </div>
              </SpotlightCard>
              <SpotlightCard className="col-span-2 rounded-3xl border border-white/10 bg-white/[0.02]">
                <div className="p-6">
                  <div className="text-[11px] font-medium uppercase tracking-[0.14em] text-white/50">{t.about.howIWork}</div>
                  <ul className="mt-4 grid grid-cols-2 gap-3 text-sm text-white/80 sm:grid-cols-3">
                    {t.about.howItems.map((item) => (
                      <li key={item} className="flex items-center gap-2">
                        <Handshake className="h-4 w-4 text-[#c6ff3b]" /> {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </SpotlightCard>
            </div>
          </Reveal>
        </div>
      </section>

      {/* FAQ */}
      <section className="container-wide py-24 sm:py-32">
        <Reveal>
          <Eyebrow index="05">{t.faq.eyebrow}</Eyebrow>
          <h2 className="mt-4 max-w-3xl font-display text-[clamp(2.25rem,4.5vw+0.5rem,4rem)] font-semibold leading-[1] tracking-tight text-white">
            {t.faq.titleA}{' '}
            <span style={serifStyle} className="font-normal italic">
              {t.faq.titleEm}
            </span>
            {t.faq.titleB}
          </h2>
        </Reveal>

        <FaqAccordion items={faq} />
      </section>

      {/* CONTATO */}
      <section id="contato" className="relative isolate overflow-hidden border-t border-white/10 bg-white/[0.02] py-24 sm:py-32">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_60%_100%_at_50%_0%,rgba(198,255,59,0.14),transparent)]"
        />
        <div className="container-wide grid grid-cols-1 gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <Eyebrow index="06">{t.contact.eyebrow}</Eyebrow>
            <h2 className="mt-4 font-display text-[clamp(2.25rem,4.5vw+0.5rem,4rem)] font-semibold leading-[1] tracking-tight text-white">
              {t.contact.titleA}{' '}
              <span style={serifStyle} className="font-normal italic text-[#c6ff3b]">
                {t.contact.titleEm}
              </span>
              {t.contact.titleB}
            </h2>
            <p className="mt-6 text-base leading-relaxed text-white/70">{t.contact.lead}</p>

            <div className="mt-8 space-y-3">
              <a
                href={whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-4 text-sm text-white transition-colors hover:border-[#25D366]/50"
              >
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-[#25D366]/15 text-[#25D366]">
                  <MessageCircle className="h-4 w-4" />
                </span>
                <div>
                  <div className="text-[11px] uppercase tracking-[0.14em] text-white/50">{t.contact.whatsapp}</div>
                  <div className="font-medium">{estudio.whatsappDisplay}</div>
                </div>
                <ArrowUpRight className="ml-auto h-4 w-4 text-white/50 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
              <a
                href={`mailto:${estudio.email}`}
                className="group flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-4 text-sm text-white transition-colors hover:border-white/30"
              >
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-white/10 text-white">@</span>
                <div>
                  <div className="text-[11px] uppercase tracking-[0.14em] text-white/50">{t.contact.email}</div>
                  <div className="font-medium">{estudio.email}</div>
                </div>
                <ArrowUpRight className="ml-auto h-4 w-4 text-white/50 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            </div>
          </Reveal>

          <Reveal delay={120} className="lg:col-span-7">
            <ContactForm t={t.form} budgets={budgets} />
          </Reveal>
        </div>
      </section>
    </>
  );
}

function Eyebrow({ index, children }: { index: string; children: ReactNode }) {
  return (
    <div className="inline-flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.18em] text-white/50">
      <span className="font-mono text-[#c6ff3b]">({index})</span>
      <span className="h-px w-8 bg-white/20" />
      {children}
    </div>
  );
}

function Pills({ items }: { items: string[] }) {
  return (
    <ul className="mt-4 flex flex-wrap gap-2">
      {items.map((item) => (
        <li
          key={item}
          className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs text-white/80 transition-colors hover:border-[#c6ff3b]/50 hover:text-[#c6ff3b]"
        >
          {item}
        </li>
      ))}
    </ul>
  );
}
