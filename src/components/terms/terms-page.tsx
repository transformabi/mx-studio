import { localeInfo, type Locale } from '@/i18n/config';
import { fill } from '@/i18n/format';
import { TERMS_DATE, TERMS_VERSION, terms, type TermsBlock } from '@/content/terms';
import { pageMetadata } from '@/lib/seo';
import { estudio, whatsappUrl } from '@/lib/estudio';
import { messages } from '@/i18n/messages';

/** Internal path of the terms page; localizedPath() turns it into /en/terms and /es/terminos. */
export const TERMS_PATH = '/termos';

export const termsMetadata = (locale: Locale) =>
  pageMetadata({
    locale,
    path: TERMS_PATH,
    title: `${terms[locale].title} · ${estudio.name}`,
    description: terms[locale].description,
  });

/** '30/10/2026', 'October 30, 2026', '30 de octubre de 2026'. */
export function termsDate(locale: Locale) {
  const date = new Date(`${TERMS_DATE}T12:00:00Z`);
  const style = locale === 'pt' ? ({ dateStyle: 'short' } as const) : ({ dateStyle: 'long' } as const);
  return new Intl.DateTimeFormat(localeInfo[locale].intl, { ...style, timeZone: 'UTC' }).format(date);
}

function Block({ block }: { block: TermsBlock }) {
  if (typeof block === 'string') return <p className="mt-4 leading-relaxed text-white/75">{block}</p>;
  return (
    <ul className="mt-4 list-disc space-y-2 pl-5 leading-relaxed text-white/75 marker:text-lime">
      {block.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

export function TermsPage({ locale }: { locale: Locale }) {
  const t = terms[locale];
  return (
    <main id="conteudo" className="font-body">
      <article className="container-site max-w-3xl py-20 sm:py-28">
        <h1 className="font-brand text-4xl font-bold tracking-tight sm:text-5xl">{t.title}</h1>
        <p className="mt-4 font-label text-[11px] uppercase tracking-[0.14em] text-white/50">
          {fill(t.versionLabel, { version: TERMS_VERSION, date: termsDate(locale) })}
        </p>
        {t.intro.map((p) => (
          <p key={p} className="mt-6 text-lg leading-relaxed text-white/80">
            {p}
          </p>
        ))}

        <nav aria-label={t.tocTitle} className="mt-10 rounded-xl border border-white/10 p-6">
          <h2 className="font-label text-[11px] uppercase tracking-[0.14em] text-white/50">{t.tocTitle}</h2>
          <ol className="mt-3 grid gap-1.5 text-sm sm:grid-cols-2">
            {t.sections.map((s) => (
              <li key={s.id}>
                <a href={`#${s.id}`} className="text-white/70 transition-colors hover:text-lime">
                  {s.title}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        {t.sections.map((s) => (
          <section key={s.id} id={s.id} className="mt-12 scroll-mt-24">
            <h2 className="font-brand text-2xl font-bold tracking-tight">{s.title}</h2>
            {s.body.map((block, i) => (
              <Block key={i} block={block} />
            ))}
          </section>
        ))}

        <section id="contato" className="mt-14 rounded-xl border border-white/10 p-6">
          <h2 className="font-brand text-xl font-bold tracking-tight">{t.contact.title}</h2>
          <p className="mt-2 text-white/75">{t.contact.text}</p>
          <ul className="mt-3 space-y-1 text-white/80">
            <li>
              {t.contact.whatsapp}:{' '}
              <a href={whatsappUrl(messages[locale].whatsappMsg)} target="_blank" rel="noopener noreferrer" className="text-lime hover:underline">
                {estudio.whatsappDisplay}
              </a>
            </li>
            <li>
              {t.contact.email}:{' '}
              <a href={`mailto:${estudio.email}`} className="text-lime hover:underline">
                {estudio.email}
              </a>
            </li>
          </ul>
        </section>
      </article>
    </main>
  );
}
