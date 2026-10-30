import { Plus } from 'lucide-react';
import type { Messages } from '@/i18n/messages';
import { SectionHeader } from '@/components/site/section-header';

/** Native <details>: works without JavaScript and is read by search engines. */
export function Faq({ t }: { t: Messages['faq'] }) {
  return (
    <section id="faq" className="border-t border-white/10 py-24 sm:py-32">
      <div className="container-site">
        <SectionHeader index="06" label={t.label} title={t.title} />
        <div className="mt-14 divide-y divide-white/10 border-y border-white/10 lg:ml-[25%]">
          {t.items.map((item, i) => (
            <details key={item.q} open={i === 0}>
              <summary className="flex items-start justify-between gap-6 py-6 font-brand text-lg font-semibold">
                {item.q}
                <Plus className="faq-icon mt-1 h-5 w-5 shrink-0 text-white/50 transition-transform duration-300" aria-hidden />
              </summary>
              <p className="max-w-2xl pb-6 leading-relaxed text-white/65">{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
