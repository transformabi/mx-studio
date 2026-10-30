'use client';

import { CalendarCheck } from 'lucide-react';
import { fill } from '@/i18n/format';
import type { Messages } from '@/i18n/messages';
import { useI18n } from '@/i18n/provider';
import { localizedPath } from '@/i18n/paths';
import { planos, planosCurrency, planoSchedule, planoStageDay, planoStages, type PlanoStage } from '@/lib/estudio';
import { Reveal } from '@/components/reveal';
import { cn } from '@/lib/utils';

type Row = {
  id: (typeof planos)[number]['id'];
  name: string;
  featured: boolean;
  setup: string;
  monthly: string;
  stages: { stage: PlanoStage; pct: number; amount: string }[];
};

/** Lime segments sized by each stage's share of the setup fee: the split at a glance. */
function SplitBar({ stages }: { stages: Row['stages'] }) {
  return (
    <div className="mt-3 flex h-1.5 gap-1 overflow-hidden rounded-full" aria-hidden>
      {stages.map((s, i) => (
        <span key={s.stage} className={cn('h-full rounded-full', i === 0 ? 'bg-lime' : i === 1 && stages.length === 3 ? 'bg-lime/60' : 'bg-lime/35')} style={{ width: `${s.pct}%` }} />
      ))}
    </div>
  );
}

/**
 * How the setup fee of each plan is paid across the 14 days (Terms v1.1, section 4), in the visitor's
 * currency. Amounts come from `planos` and `planoSchedule`; converted values are marked "≈" like the cards.
 */
export function PaymentSchedule({ t, plans }: { t: Messages['pricing']['schedule']; plans: Messages['pricing']['plans']['plans'] }) {
  const { convert, split, currency, locale } = useI18n();
  const converted = currency !== planosCurrency;
  const approx = (v: string) => (converted ? `≈ ${v}` : v);
  const opts = { decimals: 0, round: true } as const;

  const rows: Row[] = planos.map((plan) => {
    const schedule = planoSchedule[plan.id];
    const used = planoStages.filter((s) => schedule[s] !== undefined);
    const pcts = used.map((s) => schedule[s] as number);
    const amounts = split(plan.setup, pcts, planosCurrency, opts);
    return {
      id: plan.id,
      name: plans[plan.id].name,
      featured: 'featured' in plan && plan.featured,
      setup: approx(convert(plan.setup, planosCurrency, opts)),
      monthly: approx(convert(plan.monthly, planosCurrency, opts)),
      stages: used.map((stage, i) => ({ stage, pct: pcts[i], amount: approx(amounts[i]) })),
    };
  });

  const day = (stage: PlanoStage) => fill(t.day, { day: planoStageDay[stage] });

  return (
    <Reveal>
      <div id="pagamento-etapas" data-payment-schedule className="mt-16 scroll-mt-24 rounded-xl border border-white/10 bg-ink-2 p-6 sm:p-8">
        <div className="grid gap-4 lg:grid-cols-12">
          <p className="font-label text-[11px] uppercase tracking-[0.14em] text-white/50 lg:col-span-3 lg:pt-2">
            <CalendarCheck className="mr-2 inline h-4 w-4 -translate-y-px text-lime" aria-hidden />
            {t.label}
          </p>
          <div className="lg:col-span-9">
            <h3 className="font-brand text-3xl font-bold leading-tight tracking-tight sm:text-4xl">{t.title}</h3>
            <p className="mt-3 max-w-2xl leading-relaxed text-white/65">{t.lead}</p>
          </div>
        </div>

        {/* Desktop and tablet: one row per plan, one column per stage of the 14 days. */}
        <div className="mt-10 hidden overflow-hidden rounded-lg border border-white/10 md:block">
          <table className="w-full border-collapse text-left">
            <caption className="sr-only">{t.title}</caption>
            <thead>
              <tr className="bg-white/[0.03] align-bottom">
                <th scope="col" className="px-5 py-4 font-label text-[11px] font-normal uppercase tracking-[0.14em] text-white/50">
                  {t.planCol}
                </th>
                {planoStages.map((stage) => (
                  <th key={stage} scope="col" className="px-5 py-4 font-normal">
                    <span className="block font-label text-[11px] uppercase tracking-[0.14em] text-lime">{day(stage)}</span>
                    <span className="mt-1 block text-sm font-semibold text-bone">{t.stages[stage]}</span>
                  </th>
                ))}
                <th scope="col" className="px-5 py-4 font-normal">
                  <span className="block font-label text-[11px] uppercase tracking-[0.14em] text-white/50">{t.monthlyWhen}</span>
                  <span className="mt-1 block text-sm font-semibold text-bone">{t.monthlyCol}</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.id} data-schedule-plan={row.id} className={cn('border-t border-white/10 align-top', row.featured && 'bg-lime/[0.04]')}>
                  <th scope="row" className="px-5 py-5 font-normal">
                    <span className="block font-brand text-xl font-bold tracking-tight">{row.name}</span>
                    <span className="mt-1 block text-xs text-white/55">
                      {t.setupCol}: <span className="whitespace-nowrap font-semibold text-white/80">{row.setup}</span>
                    </span>
                    <SplitBar stages={row.stages} />
                  </th>
                  {planoStages.map((stage) => {
                    const s = row.stages.find((x) => x.stage === stage);
                    return (
                      <td key={stage} className="px-5 py-5">
                        {s ? (
                          <>
                            <span className="block whitespace-nowrap font-brand text-2xl font-bold leading-none tracking-tight text-lime">{s.pct}%</span>
                            <span className="mt-2 block whitespace-nowrap text-sm text-white/75">{s.amount}</span>
                          </>
                        ) : (
                          <span className="block pt-1 text-sm text-white/30">
                            <span aria-hidden>—</span>
                            <span className="sr-only">{t.noStage}</span>
                          </span>
                        )}
                      </td>
                    );
                  })}
                  <td className="px-5 py-5">
                    <span className="block whitespace-nowrap font-brand text-xl font-bold leading-none tracking-tight">
                      {row.monthly}
                      <span className="ml-0.5 text-sm font-semibold text-white/55">{t.per}</span>
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Phones: one card per plan with its stages as a short timeline. */}
        <ul className="mt-8 grid gap-4 md:hidden">
          {rows.map((row) => (
            <li key={row.id} data-schedule-card={row.id} className={cn('rounded-lg border p-5', row.featured ? 'border-lime/60' : 'border-white/10')}>
              <div className="flex items-baseline justify-between gap-3">
                <h4 className="font-brand text-xl font-bold tracking-tight">{row.name}</h4>
                <p className="text-xs text-white/55">
                  {t.setupCol}: <span className="whitespace-nowrap font-semibold text-white/80">{row.setup}</span>
                </p>
              </div>
              <SplitBar stages={row.stages} />
              <ol className="mt-4 space-y-3">
                {row.stages.map((s) => (
                  <li key={s.stage} className="flex items-start justify-between gap-4 border-l-2 border-lime/50 pl-3">
                    <span>
                      <span className="block font-label text-[10px] uppercase tracking-[0.14em] text-lime">{day(s.stage)}</span>
                      <span className="block text-sm text-bone">{t.stages[s.stage]}</span>
                    </span>
                    <span className="text-right">
                      <span className="block font-brand text-lg font-bold leading-none text-lime">{s.pct}%</span>
                      <span className="mt-1 block whitespace-nowrap text-xs text-white/70">{s.amount}</span>
                    </span>
                  </li>
                ))}
                <li className="flex items-start justify-between gap-4 border-l-2 border-white/20 pl-3">
                  <span>
                    <span className="block font-label text-[10px] uppercase tracking-[0.14em] text-white/50">{t.monthlyWhen}</span>
                    <span className="block text-sm text-bone">{t.monthlyCol}</span>
                  </span>
                  <span className="whitespace-nowrap font-brand text-base font-bold">
                    {row.monthly}
                    <span className="text-xs font-semibold text-white/55">{t.per}</span>
                  </span>
                </li>
              </ol>
            </li>
          ))}
        </ul>

        <ul className="mt-8 grid gap-x-8 gap-y-3 text-sm leading-relaxed text-white/70 md:grid-cols-2">
          {t.notes.map((note) => (
            <li key={note} className="flex gap-2.5">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-lime" aria-hidden />
              {note}
            </li>
          ))}
        </ul>
        <p className="mt-6 text-sm text-white/60">
          {t.termsBefore}
          <a href={`${localizedPath(locale, '/termos')}#${t.termsAnchor}`} className="font-semibold text-lime underline underline-offset-4 hover:text-bone">
            {t.termsLink}
          </a>
          {t.termsAfter}
        </p>
      </div>
    </Reveal>
  );
}
