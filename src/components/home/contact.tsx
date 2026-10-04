import { ArrowUpRight } from 'lucide-react';
import type { Messages } from '@/i18n/messages';
import { estudio, whatsappUrl } from '@/lib/estudio';
import { ContactForm } from './contact-form';

export function Contact({ t, waMsg }: { t: Messages['contact']; waMsg: string }) {
  const channels = [
    { label: t.channels.whatsapp, value: estudio.whatsappDisplay, href: whatsappUrl(waMsg), external: true },
    { label: t.channels.email, value: estudio.email, href: `mailto:${estudio.email}`, external: false },
    { label: t.channels.instagram, value: estudio.instagramHandle, href: estudio.instagram, external: true },
    { label: t.channels.preview, value: t.channels.previewText, href: estudio.diagnostico, external: true },
  ];

  return (
    <section id="contact" className="border-t border-white/10 py-24 sm:py-32">
      <div className="container-site grid gap-14 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <p className="font-label text-xs uppercase tracking-[0.16em] text-white/50">
            <span className="text-lime">07</span> — {t.label}
          </p>
          <h2 className="mt-6 text-balance font-brand text-[clamp(2rem,3.2vw+1rem,3.5rem)] font-bold leading-[1.02] tracking-[-0.025em]">
            {t.title}
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-white/65">{t.lead}</p>
          <ul className="mt-10 divide-y divide-white/10 border-y border-white/10">
            {channels.map((c) => (
              <li key={c.label}>
                <a
                  href={c.href}
                  {...(c.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  className="group flex items-center justify-between gap-4 py-5"
                >
                  <span>
                    <span className="block font-label text-[11px] uppercase tracking-[0.14em] text-white/45">{c.label}</span>
                    <span className="mt-1 block break-all font-brand text-lg font-semibold transition-colors group-hover:text-lime">
                      {c.value}
                    </span>
                  </span>
                  <ArrowUpRight className="h-5 w-5 shrink-0 text-white/40 transition-colors group-hover:text-lime" aria-hidden />
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="lg:col-span-7">
          <ContactForm t={t.form} />
        </div>
      </div>
    </section>
  );
}
