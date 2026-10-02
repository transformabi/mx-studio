import Link from 'next/link';
import { ArrowUpRight, Instagram, Linkedin, Mail, MapPin } from 'lucide-react';
import { demos, estudio, whatsappUrl } from '@/lib/estudio';
import { messages } from '@/i18n/messages';
import { getLocale } from '@/i18n/server';
import { MaxMonogram } from './max-monogram';

export function EstudioFooter() {
  const t = messages[getLocale()];
  const f = t.footer;

  return (
    <footer className="relative mt-24 border-t border-white/10 bg-ink font-body">
      <div className="pointer-events-none absolute inset-x-0 -top-40 h-40 bg-[radial-gradient(ellipse_60%_100%_at_50%_100%,rgba(148,228,33,0.10),transparent)]" />

      <div className="container-wide py-16">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <div className="flex items-center gap-2.5">
              <MaxMonogram variant="inverted" rounded={22} className="h-9 w-9 shrink-0" />
              <div>
                <div className="font-brand text-lg font-extrabold tracking-tight text-white">MX Studio Web</div>
                <div className="text-[11px] uppercase tracking-[0.14em] text-white/50">
                  {f.tagline}
                </div>
              </div>
            </div>
            <p className="mt-6 max-w-md text-sm leading-relaxed text-white/70">{f.description}</p>

            <div className="mt-6 flex flex-col gap-3 text-sm text-white/70">
              <a
                href={`mailto:${estudio.email}`}
                className="inline-flex items-center gap-2 self-start hover:text-white"
              >
                <Mail className="h-4 w-4" /> {estudio.email}
              </a>
              <div className="inline-flex items-center gap-2 self-start">
                <MapPin className="h-4 w-4 shrink-0" /> {f.location}
              </div>
            </div>

            <div className="mt-6 flex items-center gap-2">
              <SocialLink href={estudio.instagram} label="Instagram">
                <Instagram className="h-4 w-4" />
              </SocialLink>
              <SocialLink href={estudio.linkedin} label="LinkedIn">
                <Linkedin className="h-4 w-4" />
              </SocialLink>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 lg:col-span-6">
            <div>
              <div className="text-xs font-semibold uppercase tracking-[0.16em] text-white/50">
                {f.portfolio}
              </div>
              <ul className="mt-4 space-y-2.5 text-sm">
                <li><Link href="/#trabalhos" className="text-white/70 hover:text-white">{f.work}</Link></li>
                <li><Link href="/#processo" className="text-white/70 hover:text-white">{f.process}</Link></li>
                <li><Link href="/#servicos" className="text-white/70 hover:text-white">{f.services}</Link></li>
                <li><Link href="/#sobre" className="text-white/70 hover:text-white">{f.about}</Link></li>
              </ul>
            </div>
            <div>
              <div className="text-xs font-semibold uppercase tracking-[0.16em] text-white/50">
                {f.demos}
              </div>
              <ul className="mt-4 space-y-2.5 text-sm">
                {demos.map((d) => (
                  <li key={d.slug}>
                    <Link href={`/demo/${d.slug}`} className="text-white/70 hover:text-white">
                      {f.demoLinks[d.slug]}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 rounded-2xl border border-white/10 bg-white/[0.02] p-6 sm:p-8">
          <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="font-label text-xs uppercase tracking-[0.14em] text-lime">
                {f.ctaEyebrow}
              </div>
              <div className="mt-1 font-brand text-2xl font-extrabold text-white sm:text-3xl">
                {f.ctaTitle}
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              <a
                href={whatsappUrl(t.whatsappMsg)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full bg-lime px-5 py-2.5 text-sm font-semibold text-ink transition-transform hover:-translate-y-0.5"
              >
                WhatsApp {estudio.whatsappDisplay}
                <ArrowUpRight className="h-4 w-4" />
              </a>
              <a
                href={`mailto:${estudio.email}`}
                className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-white/10"
              >
                {f.sendEmail}
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-start justify-between gap-4 border-t border-white/10 pt-6 text-xs text-white/50 sm:flex-row sm:items-center">
          <div>© {new Date().getFullYear()} MX Studio Web · {f.rights}</div>
          <div className="flex items-center gap-6">
            <span>{f.madeWith}</span>
          </div>
        </div>

        <div aria-hidden className="mt-12 select-none overflow-hidden">
          <div className="text-outline whitespace-nowrap font-brand text-[clamp(2.5rem,12vw,10.5rem)] font-extrabold leading-[0.85] tracking-tighter transition-colors duration-700 hover:text-lime">
            MX Studio Web
          </div>
        </div>
      </div>
    </footer>
  );
}

function SocialLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="grid h-9 w-9 place-items-center rounded-full border border-white/10 bg-white/5 text-white/70 transition-all hover:border-[#94E421]/40 hover:text-[#94E421] hover:-translate-y-0.5"
    >
      {children}
    </a>
  );
}
