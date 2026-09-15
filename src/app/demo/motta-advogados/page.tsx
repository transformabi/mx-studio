'use client';

import { useState } from 'react';
import { ArrowLeft, ArrowRight, Building2, Check, Gavel, Scale, ShieldCheck, Users, X } from 'lucide-react';
import { DemoFrame } from '@/components/demo-frame';
import { heros, mottaPartners } from '@/lib/demo-images';
import { useI18n } from '@/i18n/provider';
import { content } from './content';

type AreaId = 'empresarial' | 'tributario' | 'trabalhista' | 'civel';

const areaIds: AreaId[] = ['empresarial', 'tributario', 'trabalhista', 'civel'];

const areaIcons: Record<AreaId, JSX.Element> = {
  empresarial: <Building2 className="h-5 w-5" />,
  tributario: <Scale className="h-5 w-5" />,
  trabalhista: <Users className="h-5 w-5" />,
  civel: <Gavel className="h-5 w-5" />,
};

const partners = [
  { name: 'Dr. Henrique Motta', oab: 'OAB/RJ 138.472', photo: mottaPartners.p1 },
  { name: 'Dra. Fernanda Ferreira', oab: 'OAB/RJ 142.900', photo: mottaPartners.p2 },
  { name: 'Dr. Rodrigo Barreto', oab: 'OAB/RJ 156.203', photo: mottaPartners.p3 },
];

export default function MottaDemo() {
  const { locale, money } = useI18n();
  const c = content[locale];

  const [drawerArea, setDrawerArea] = useState<AreaId | null>(null);
  const [step, setStep] = useState<0 | 1 | 2 | 3 | 4>(0);
  const [areaSel, setAreaSel] = useState<AreaId | null>(null);
  const [urgency, setUrgency] = useState<string | null>(null);
  const [detail, setDetail] = useState('');
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const nextStep = () => {
    const e: Record<string, string> = {};
    if (step === 1 && !areaSel) e.area = c.errors.area;
    if (step === 2 && !urgency) e.urgency = c.errors.urgency;
    if (step === 3 && detail.trim().length < 20) e.detail = c.errors.detail;
    if (step === 4) {
      if (!name.trim()) e.name = c.errors.name;
      if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) e.email = c.errors.email;
      if (!phone.match(/\d{8,}/)) e.phone = c.errors.phone;
    }
    setErrors(e);
    if (Object.keys(e).length === 0) {
      if (step === 4) setStep(0);
      else setStep((s) => (s + 1) as typeof step);
    }
  };

  const [submitted, setSubmitted] = useState(false);

  const finalSubmit = () => {
    const e: Record<string, string> = {};
    if (!name.trim()) e.name = c.errors.name;
    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) e.email = c.errors.email;
    if (!phone.match(/\d{8,}/)) e.phone = c.errors.phone;
    setErrors(e);
    if (Object.keys(e).length === 0) {
      setSubmitted(true);
    }
  };

  const reset = () => {
    setSubmitted(false);
    setStep(0);
    setAreaSel(null);
    setUrgency(null);
    setDetail('');
    setName('');
    setCompany('');
    setEmail('');
    setPhone('');
  };

  return (
    <DemoFrame siteName="Motta Advogados" bg="#f8f7f4">
      {/* Header */}
      <header className="sticky top-0 z-30 border-b border-neutral-200 bg-[#f8f7f4]/85 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
          <div className="flex items-center gap-2">
            <span className="grid h-9 w-9 place-items-center rounded-lg bg-[#1e1b4b] text-white">
              <Scale className="h-4 w-4" />
            </span>
            <div className="leading-none">
              <div className="font-display text-base font-semibold text-[#1e1b4b]">Motta</div>
              <div className="text-[10px] uppercase tracking-[0.14em] text-neutral-500">Advogados</div>
            </div>
          </div>
          <nav className="hidden items-center gap-1 sm:flex">
            <a href="#areas" className="rounded-full px-3 py-1.5 text-sm text-neutral-700 hover:bg-neutral-100">
              {c.navAreas}
            </a>
            <a href="#socios" className="rounded-full px-3 py-1.5 text-sm text-neutral-700 hover:bg-neutral-100">
              {c.navPartners}
            </a>
            <a href="#casos" className="rounded-full px-3 py-1.5 text-sm text-neutral-700 hover:bg-neutral-100">
              {c.navCases}
            </a>
          </nav>
          <button
            onClick={() => setStep(1)}
            className="inline-flex items-center gap-1.5 rounded-full bg-[#1e1b4b] px-4 py-2 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5"
          >
            {c.startConsult}
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </header>

      {/* Hero */}
      <section className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-4 py-16 sm:px-6 sm:py-24 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <div className="text-xs font-medium uppercase tracking-[0.18em] text-[#a78bfa]">
            {c.heroEyebrow}
          </div>
          <h1 className="mt-4 max-w-2xl font-display text-4xl font-semibold leading-[1.02] text-[#1e1b4b] sm:text-5xl lg:text-6xl">
            {c.heroTitleA}{' '}
            <em style={{ fontFamily: 'var(--font-instrument-serif)' }} className="font-normal">
              {c.heroTitleEm}
            </em>
            .
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-neutral-700 sm:text-lg">{c.heroLead}</p>

          <div className="mt-8 flex flex-wrap gap-3">
            <button
              onClick={() => setStep(1)}
              className="inline-flex items-center gap-1.5 rounded-full bg-[#1e1b4b] px-5 py-3 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5"
            >
              {c.startConsult}
              <ArrowRight className="h-4 w-4" />
            </button>
            <a
              href="#areas"
              className="inline-flex items-center gap-1.5 rounded-full border border-neutral-300 bg-white px-5 py-3 text-sm font-semibold text-[#1e1b4b] transition-colors hover:bg-neutral-50"
            >
              {c.seeAreas}
            </a>
          </div>

          <div className="mt-10 grid grid-cols-2 gap-6 border-t border-neutral-200 pt-8 sm:grid-cols-4">
            {c.stats.map((s) => (
              <Stat key={s.label} kpi={s.kpi} label={s.label} />
            ))}
          </div>
        </div>

        <div className="lg:col-span-5">
          <div className="relative overflow-hidden rounded-3xl bg-[#dcd7c8]">
            <div className="relative aspect-[3/4] overflow-hidden">
              <img
                src={heros['motta-advogados']}
                alt={c.heroAlt}
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-black/25" />
            </div>
            <blockquote className="absolute inset-x-6 bottom-6 rounded-2xl bg-white/95 p-5 shadow-lg backdrop-blur">
              <p style={{ fontFamily: 'var(--font-instrument-serif)' }} className="text-lg italic leading-snug text-[#1e1b4b]">
                {c.quote}
              </p>
              <div className="mt-4 flex items-center gap-3 border-t border-neutral-200 pt-4">
                <img
                  src={mottaPartners.p1}
                  alt="Dr. Henrique Motta"
                  className="h-9 w-9 rounded-full object-cover"
                />
                <div className="text-xs">
                  <div className="font-semibold text-[#1e1b4b]">Dr. Henrique Motta</div>
                  <div className="text-neutral-600">{c.founderRole} · OAB/RJ 138.472</div>
                </div>
              </div>
            </blockquote>
          </div>
        </div>
      </section>

      {/* Áreas */}
      <section id="areas" className="border-t border-neutral-200 bg-white py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="text-xs font-medium uppercase tracking-[0.18em] text-[#a78bfa]">
            {c.areasEyebrow}
          </div>
          <h2 className="mt-3 max-w-2xl font-display text-3xl font-semibold text-[#1e1b4b] sm:text-4xl">
            {c.areasTitleA}{' '}
            <em style={{ fontFamily: 'var(--font-instrument-serif)' }} className="font-normal">
              {c.areasTitleEm}
            </em>
          </h2>

          <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2">
            {areaIds.map((id) => (
              <button
                key={id}
                onClick={() => setDrawerArea(id)}
                className="group flex items-start gap-5 rounded-3xl border border-neutral-200 bg-white p-6 text-left transition-all hover:border-[#1e1b4b] hover:-translate-y-1 hover:shadow-lg"
              >
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl border border-[#1e1b4b]/20 bg-[#1e1b4b]/5 text-[#1e1b4b] transition-colors group-hover:bg-[#1e1b4b] group-hover:text-white">
                  {areaIcons[id]}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="font-display text-lg font-semibold text-[#1e1b4b]">
                    {c.areas[id].name}
                  </div>
                  <p className="mt-1 text-sm text-neutral-600">{c.areas[id].short}</p>
                  <div className="mt-4 text-xs font-medium uppercase tracking-[0.14em] text-[#a78bfa]">
                    {c.areas[id].cases}
                  </div>
                </div>
                <ArrowRight className="mt-2 h-5 w-5 shrink-0 text-neutral-400 transition-transform group-hover:translate-x-1 group-hover:text-[#1e1b4b]" />
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Sócios */}
      <section id="socios" className="bg-[#f8f7f4] py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="text-xs font-medium uppercase tracking-[0.18em] text-[#a78bfa]">{c.partnersEyebrow}</div>
          <h2 className="mt-3 max-w-2xl font-display text-3xl font-semibold text-[#1e1b4b] sm:text-4xl">
            {c.partnersTitleA}{' '}
            <em style={{ fontFamily: 'var(--font-instrument-serif)' }} className="font-normal">
              {c.partnersTitleEm}
            </em>{' '}
            {c.partnersTitleB}
          </h2>

          <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-3">
            {partners.map((s, i) => (
              <div key={s.name} className="overflow-hidden rounded-3xl border border-neutral-200 bg-white">
                <div className="relative aspect-[4/5] w-full overflow-hidden bg-neutral-100">
                  <img
                    src={s.photo}
                    alt={s.name}
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <div className="font-display text-lg font-semibold text-[#1e1b4b]">{s.name}</div>
                  <div className="text-xs text-neutral-500">{c.partners[i].role}</div>
                  <div className="mt-4 border-t border-neutral-200 pt-4 text-sm text-neutral-700">
                    {c.partners[i].area}
                  </div>
                  <div className="mt-1 text-xs text-neutral-500">{s.oab}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Casos */}
      <section id="casos" className="bg-white py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="text-xs font-medium uppercase tracking-[0.18em] text-[#a78bfa]">{c.casesEyebrow}</div>
          <h2 className="mt-3 max-w-2xl font-display text-3xl font-semibold text-[#1e1b4b] sm:text-4xl">
            {c.casesTitle}
          </h2>

          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {c.cases.map((item) => (
              <div key={item.title} className="group rounded-2xl border border-neutral-200 bg-[#f8f7f4] p-5 transition-colors hover:border-[#1e1b4b]">
                <div className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#a78bfa]">
                  {item.area}
                </div>
                <div className="mt-2 font-display text-base font-semibold text-[#1e1b4b]">
                  {item.title}
                </div>
                <div className="mt-4 flex items-center gap-2 border-t border-neutral-200 pt-4 text-sm text-neutral-700">
                  <Check className="h-4 w-4 text-[#a78bfa]" />
                  {item.scope}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 rounded-2xl border border-dashed border-neutral-300 bg-[#f8f7f4]/50 p-5 text-xs text-neutral-600">
            <ShieldCheck className="mr-2 inline h-4 w-4 text-[#1e1b4b]" />
            {c.compliance}
          </div>
        </div>
      </section>

      {/* CTA final */}
      <section className="bg-[#1e1b4b] py-16 text-white">
        <div className="mx-auto flex max-w-4xl flex-col items-center gap-6 px-4 text-center sm:px-6">
          <h2 className="font-display text-3xl font-semibold sm:text-5xl">
            {c.ctaTitleA}{' '}
            <em style={{ fontFamily: 'var(--font-instrument-serif)' }} className="font-normal">
              {c.ctaTitleEm}
            </em>
            ?
          </h2>
          <p className="max-w-2xl text-white/70">{c.ctaLead}</p>
          <button
            onClick={() => setStep(1)}
            className="inline-flex items-center gap-1.5 rounded-full bg-[#a78bfa] px-6 py-3 text-sm font-semibold text-[#1e1b4b] transition-transform hover:-translate-y-0.5"
          >
            {c.ctaButton}
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </section>

      {/* AREA DRAWER */}
      {drawerArea && (
        <div className="fixed inset-0 z-50 flex" role="dialog" aria-modal="true">
          <button className="flex-1 bg-black/60" onClick={() => setDrawerArea(null)} aria-label={c.close} />
          <aside className="flex w-full max-w-lg flex-col bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-neutral-200 px-6 py-5">
              <div className="flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-[#1e1b4b] text-white">
                  {areaIcons[drawerArea]}
                </span>
                <div>
                  <div className="font-display text-lg font-semibold text-[#1e1b4b]">
                    {c.areas[drawerArea].name}
                  </div>
                  <div className="text-xs text-neutral-500">{c.areas[drawerArea].cases}</div>
                </div>
              </div>
              <button
                onClick={() => setDrawerArea(null)}
                className="grid h-9 w-9 place-items-center rounded-full text-neutral-500 hover:bg-neutral-100"
                aria-label={c.close}
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-6">
              <p className="text-sm leading-relaxed text-neutral-700">{c.areas[drawerArea].bio}</p>
              <div className="mt-6 text-[11px] font-semibold uppercase tracking-[0.14em] text-neutral-500">
                {c.whatWeDo}
              </div>
              <ul className="mt-4 space-y-3">
                {c.areas[drawerArea].bullets.map((b) => (
                  <li key={b} className="flex items-start gap-3 text-sm text-neutral-700">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#1e1b4b]" />
                    {b}
                  </li>
                ))}
              </ul>
            </div>
            <div className="border-t border-neutral-200 p-4">
              <button
                onClick={() => {
                  setAreaSel(drawerArea);
                  setDrawerArea(null);
                  setStep(2);
                }}
                className="w-full rounded-full bg-[#1e1b4b] py-3 text-sm font-semibold text-white"
              >
                {c.consultAbout(c.areas[drawerArea].name)}
              </button>
            </div>
          </aside>
        </div>
      )}

      {/* TRIAGEM MULTI-STEP MODAL */}
      {step > 0 && (
        <div className="fixed inset-0 z-50 grid place-items-center p-4" role="dialog" aria-modal="true">
          <button className="absolute inset-0 bg-black/70" onClick={() => setStep(0)} aria-label={c.close} />
          <div className="relative w-full max-w-lg overflow-hidden rounded-3xl bg-white shadow-2xl">
            <div className="border-b border-neutral-200 px-6 py-5">
              <div className="flex items-center justify-between">
                <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-neutral-500">
                  {c.intakeStep(Math.min(step, 4))}
                </div>
                <button
                  onClick={() => setStep(0)}
                  className="grid h-9 w-9 place-items-center rounded-full text-neutral-500 hover:bg-neutral-100"
                  aria-label={c.close}
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="mt-4 flex items-center gap-2">
                {[1, 2, 3, 4].map((n) => (
                  <div key={n} className={'h-1 flex-1 rounded-full ' + (step >= n ? 'bg-[#1e1b4b]' : 'bg-neutral-200')} />
                ))}
              </div>
            </div>

            <div className="px-6 py-6">
              {!submitted && step === 1 && (
                <div>
                  <div className="font-display text-xl font-semibold text-[#1e1b4b]">
                    {c.step1Title}
                  </div>
                  <p className="mt-2 text-sm text-neutral-600">{c.step1Lead}</p>
                  <div className="mt-6 grid grid-cols-1 gap-2 sm:grid-cols-2">
                    {areaIds.map((id) => (
                      <button
                        key={id}
                        onClick={() => setAreaSel(id)}
                        className={
                          'flex items-center gap-3 rounded-2xl border p-3 text-left transition-colors ' +
                          (areaSel === id
                            ? 'border-[#1e1b4b] bg-[#1e1b4b]/5'
                            : 'border-neutral-200 hover:border-neutral-400')
                        }
                      >
                        <span className="grid h-9 w-9 place-items-center rounded-xl bg-[#1e1b4b]/10 text-[#1e1b4b]">
                          {areaIcons[id]}
                        </span>
                        <span className="text-sm font-medium text-[#1e1b4b]">{c.areas[id].name}</span>
                      </button>
                    ))}
                  </div>
                  {errors.area && <div className="mt-3 text-xs text-red-600">{errors.area}</div>}
                </div>
              )}

              {!submitted && step === 2 && (
                <div>
                  <div className="font-display text-xl font-semibold text-[#1e1b4b]">
                    {c.step2Title}
                  </div>
                  <p className="mt-2 text-sm text-neutral-600">{c.step2Lead}</p>
                  <div className="mt-6 space-y-2">
                    {c.urgency.map((o) => (
                      <button
                        key={o.v}
                        onClick={() => setUrgency(o.v)}
                        className={
                          'block w-full rounded-2xl border p-4 text-left transition-colors ' +
                          (urgency === o.v ? 'border-[#1e1b4b] bg-[#1e1b4b]/5' : 'border-neutral-200 hover:border-neutral-400')
                        }
                      >
                        <div className="font-medium text-[#1e1b4b]">{o.l}</div>
                        <div className="text-xs text-neutral-500">{o.desc}</div>
                      </button>
                    ))}
                  </div>
                  {errors.urgency && <div className="mt-3 text-xs text-red-600">{errors.urgency}</div>}
                </div>
              )}

              {!submitted && step === 3 && (
                <div>
                  <div className="font-display text-xl font-semibold text-[#1e1b4b]">
                    {c.step3Title}
                  </div>
                  <p className="mt-2 text-sm text-neutral-600">{c.step3Lead}</p>
                  <textarea
                    value={detail}
                    onChange={(e) => setDetail(e.target.value)}
                    rows={6}
                    placeholder={c.step3Placeholder((v) => money(v, { compact: true }))}
                    className="mt-6 w-full resize-none rounded-xl border border-neutral-300 px-4 py-3 text-sm focus:border-[#1e1b4b] focus:outline-none"
                  />
                  <div className="mt-2 text-xs text-neutral-500">{c.charCount(detail.length)}</div>
                  {errors.detail && <div className="mt-1 text-xs text-red-600">{errors.detail}</div>}
                </div>
              )}

              {!submitted && step === 4 && (
                <div>
                  <div className="font-display text-xl font-semibold text-[#1e1b4b]">
                    {c.step4Title}
                  </div>
                  <div className="mt-6 grid grid-cols-1 gap-3">
                    <Input label={c.name} value={name} onChange={setName} error={errors.name} placeholder={c.namePlaceholder} />
                    <Input label={c.company} value={company} onChange={setCompany} placeholder={c.companyPlaceholder} />
                    <Input label={c.email} value={email} onChange={setEmail} error={errors.email} placeholder={c.emailPlaceholder} type="email" />
                    <Input label="WhatsApp" value={phone} onChange={setPhone} error={errors.phone} placeholder="(21) 99999-9999" />
                  </div>
                </div>
              )}

              {submitted && (
                <div className="py-6 text-center">
                  <div className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-[#1e1b4b] text-white">
                    <Check className="h-8 w-8" />
                  </div>
                  <div className="mt-6 font-display text-2xl font-semibold text-[#1e1b4b]">
                    {c.receivedTitle(name.split(' ')[0])}
                  </div>
                  <p className="mt-2 text-sm text-neutral-600">{c.receivedText}</p>
                  <div className="mt-6 rounded-2xl bg-neutral-50 p-4 text-left text-sm">
                    <div><span className="text-neutral-500">{c.areaLabel}</span>{areaSel && c.areas[areaSel].name}</div>
                    <div className="mt-1"><span className="text-neutral-500">{c.urgencyLabel}</span>{c.urgency.find((u) => u.v === urgency)?.l}</div>
                  </div>
                  <button
                    onClick={reset}
                    className="mt-6 rounded-full border border-neutral-300 px-5 py-2.5 text-sm font-semibold text-[#1e1b4b]"
                  >
                    {c.close}
                  </button>
                </div>
              )}
            </div>

            {!submitted && (
              <div className="flex items-center justify-between border-t border-neutral-200 px-6 py-4">
                <button
                  onClick={() => setStep((s) => (s > 1 ? ((s - 1) as typeof s) : s))}
                  disabled={step === 1}
                  className="inline-flex items-center gap-1 text-sm text-neutral-500 disabled:opacity-40"
                >
                  <ArrowLeft className="h-4 w-4" /> {c.back}
                </button>
                <button
                  onClick={() => (step === 4 ? finalSubmit() : nextStep())}
                  className="inline-flex items-center gap-1.5 rounded-full bg-[#1e1b4b] px-5 py-2.5 text-sm font-semibold text-white"
                >
                  {step === 4 ? c.sendIntake : c.continue}
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      <footer className="border-t border-neutral-200 bg-white py-8 text-center text-xs text-neutral-500">
        © 2025 Motta Advogados · {c.demoBy}
      </footer>
    </DemoFrame>
  );
}

function Stat({ kpi, label }: { kpi: string; label: string }) {
  return (
    <div>
      <div className="font-display text-2xl font-semibold text-[#1e1b4b] sm:text-3xl">{kpi}</div>
      <div className="mt-1 text-xs text-neutral-500">{label}</div>
    </div>
  );
}

function Input({
  label,
  value,
  onChange,
  error,
  placeholder,
  type = 'text',
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  placeholder?: string;
  type?: string;
}) {
  return (
    <div>
      <label className="text-[11px] font-semibold uppercase tracking-[0.14em] text-neutral-500">
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="mt-2 w-full rounded-xl border border-neutral-300 px-4 py-2.5 text-sm focus:border-[#1e1b4b] focus:outline-none"
      />
      {error && <div className="mt-1 text-xs text-red-600">{error}</div>}
    </div>
  );
}
