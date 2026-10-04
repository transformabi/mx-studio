import { ArrowUpRight } from 'lucide-react';
import { localeInfo, type Locale } from '@/i18n/config';
import { fill } from '@/i18n/format';
import type { Messages } from '@/i18n/messages';
import { localizedPath } from '@/i18n/paths';
import { demoBySlug, estudio, lcpSeconds, showcase } from '@/lib/estudio';
import { shots } from '@/lib/images';
import { ButtonLink } from '@/components/site/button-link';
import { SectionHeader } from '@/components/site/section-header';
import { Reveal } from '@/components/reveal';
import { ShowcaseCard } from './showcase-card';

export function Showcase({ locale, t }: { locale: Locale; t: Messages['work'] }) {
  const seconds = new Intl.NumberFormat(localeInfo[locale].intl, { maximumFractionDigits: 1 });

  return (
    <section id="work" className="border-t border-white/10 py-24 sm:py-32">
      <div className="container-site">
        <SectionHeader index="02" label={t.label} title={t.title} lead={t.lead} />
        <div className="mt-16 grid gap-x-8 gap-y-14 md:grid-cols-2">
          {showcase.map((slug, i) => {
            const demo = demoBySlug[slug];
            return (
              <Reveal key={slug} delay={(i % 2) * 80}>
                <ShowcaseCard
                  href={localizedPath(locale, `/demo/${slug}`)}
                  image={shots.demos[slug]}
                  alt={fill(t.imageAlt, { name: demo.clientName })}
                  label={`${t.niches[demo.niche]} · ${t.badge}`}
                  title={demo.clientName}
                  text={t.cards[slug]}
                  meta={fill(t.lcp, { value: `${seconds.format(lcpSeconds[slug])} s` })}
                  cta={t.open}
                />
              </Reveal>
            );
          })}
        </div>
        <div className="mt-16 flex flex-col gap-6 border-t border-white/10 pt-8 lg:flex-row lg:items-center lg:justify-between">
          <p className="max-w-2xl text-xs leading-relaxed text-white/45">{t.note}</p>
          <ButtonLink href={estudio.diagnostico} external className="shrink-0">
            {t.cta}
            <ArrowUpRight className="h-4 w-4" aria-hidden />
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
