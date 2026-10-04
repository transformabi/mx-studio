import { ArrowUpRight } from 'lucide-react';
import type { Messages } from '@/i18n/messages';
import { clientCases } from '@/lib/estudio';
import { shots } from '@/lib/images';
import { BrowserFrame } from '@/components/site/browser-frame';
import { ButtonLink } from '@/components/site/button-link';
import { VerifiedBadge } from '@/components/site/verified-badge';
import { Reveal } from '@/components/reveal';

export function ClientCase({ t }: { t: Messages['case'] }) {
  const sulamita = clientCases[0];
  const cut = t.name.lastIndexOf(' ');
  const firstNames = t.name.slice(0, cut);
  const lastName = t.name.slice(cut + 1);
  return (
    <section id="case" className="border-t border-white/10 py-24 sm:py-32">
      <div className="container-site grid items-center gap-14 lg:grid-cols-12">
        <Reveal className="lg:col-span-5">
          <p className="flex items-center gap-2 font-label text-xs uppercase tracking-[0.16em] text-white/55">
            <span className="text-lime">01</span> — {t.label}
          </p>
          <h2 className="mt-6 text-balance font-brand text-[clamp(2rem,2.6vw+1rem,3rem)] font-bold leading-[1.05] tracking-[-0.025em]">
            {firstNames}{' '}
            {/* The seal stays glued to the last word of the name, like on Instagram. */}
            <span className="whitespace-nowrap">
              {lastName}
              <VerifiedBadge className="ml-[0.18em] align-[-0.06em]" />
            </span>
            <span className="mt-2 block text-[0.5em] font-semibold leading-snug tracking-normal text-white/70">
              {t.business}
            </span>
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-white/70">{t.text}</p>
          <dl className="mt-8 divide-y divide-white/10 border-y border-white/10">
            {t.facts.map((f) => (
              <div key={f.label} className="flex justify-between gap-6 py-3.5 text-sm">
                <dt className="text-white/50">{f.label}</dt>
                <dd className="text-right font-medium">{f.value}</dd>
              </div>
            ))}
          </dl>
          <ButtonLink href={sulamita.url} external variant="outline" className="mt-8">
            {t.visit}
            <ArrowUpRight className="h-4 w-4" aria-hidden />
          </ButtonLink>
        </Reveal>
        <Reveal delay={100} className="lg:col-span-7">
          <BrowserFrame image={shots.sulamita.detail} alt={t.imageAlt} url="sulamitaestetica.pt" />
        </Reveal>
      </div>
    </section>
  );
}
