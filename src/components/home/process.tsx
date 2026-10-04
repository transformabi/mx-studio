import type { Messages } from '@/i18n/messages';
import { SectionHeader } from '@/components/site/section-header';

export function Process({ t }: { t: Messages['process'] }) {
  return (
    <section id="process" className="bg-paper py-24 text-ink sm:py-32">
      <div className="container-site">
        <SectionHeader tone="light" index="03" label={t.label} title={t.title} />
        <ol className="mt-16 grid gap-px overflow-hidden rounded-xl border border-ink/10 bg-ink/10 sm:grid-cols-2 lg:grid-cols-4">
          {t.steps.map((step, i) => (
            <li key={step.title} className="bg-paper p-7">
              <span className="font-label text-xs text-ink/60">{String(i + 1).padStart(2, '0')}</span>
              <h3 className="mt-10 font-brand text-2xl font-bold tracking-tight">{step.title}</h3>
              <p className="mt-1 font-label text-xs uppercase tracking-[0.12em] text-ink/65">{step.duration}</p>
              <p className="mt-4 text-[15px] leading-relaxed text-ink/75">{step.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
