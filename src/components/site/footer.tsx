import Link from 'next/link';
import { localeInfo, locales, type Locale } from '@/i18n/config';
import type { Messages } from '@/i18n/messages';
import { localizedPath } from '@/i18n/paths';
import { estudio, whatsappUrl } from '@/lib/estudio';
import { Logo } from './logo';

const heading = 'font-label text-[11px] uppercase tracking-[0.14em] text-white/45';
const link = 'text-white/70 transition-colors hover:text-bone';

export function Footer({ locale, t }: { locale: Locale; t: Messages }) {
  const home = localizedPath(locale, '/');
  const sections = [
    ['work', t.nav.work],
    ['process', t.nav.process],
    ['pricing', t.nav.pricing],
    ['about', t.nav.about],
    ['contact', t.nav.contact],
  ] as const;

  return (
    <footer className="border-t border-white/10 font-body text-sm">
      <div className="container-site grid gap-12 py-16 md:grid-cols-12">
        <div className="md:col-span-5">
          <Logo />
          <p className="mt-5 max-w-sm leading-relaxed text-white/55">{t.footer.blurb}</p>
        </div>

        <div className="md:col-span-2">
          <h2 className={heading}>{t.footer.navTitle}</h2>
          <ul className="mt-4 space-y-2.5">
            {sections.map(([id, label]) => (
              <li key={id}>
                <Link href={`${home}#${id}`} className={link}>
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-3">
          <h2 className={heading}>{t.footer.contactTitle}</h2>
          <ul className="mt-4 space-y-2.5">
            <li>
              <a href={whatsappUrl(t.whatsappMsg)} target="_blank" rel="noopener noreferrer" className={link}>
                WhatsApp {estudio.whatsappDisplay}
              </a>
            </li>
            <li>
              <a href={`mailto:${estudio.email}`} className={link}>
                {estudio.email}
              </a>
            </li>
            <li>
              <a href={estudio.instagram} target="_blank" rel="noopener noreferrer" className={link}>
                Instagram {estudio.instagramHandle}
              </a>
            </li>
          </ul>
        </div>

        <div className="md:col-span-2">
          <h2 className={heading}>{t.footer.languagesTitle}</h2>
          <ul className="mt-4 space-y-2.5">
            {locales.map((l) => (
              <li key={l}>
                <a href={localizedPath(l, '/')} hrefLang={localeInfo[l].htmlLang} lang={localeInfo[l].htmlLang} className={link}>
                  {localeInfo[l].name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-site flex flex-col gap-2 py-6 text-xs text-white/50 sm:flex-row sm:justify-between">
          <p>
            © {new Date().getFullYear()} MX Studio Web. {t.footer.rights}
          </p>
          <p>{t.footer.location}</p>
        </div>
      </div>
    </footer>
  );
}
