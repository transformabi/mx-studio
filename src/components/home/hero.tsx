import { ArrowUpRight, MessageCircle } from 'lucide-react';
import type { Messages } from '@/i18n/messages';
import { estudio, whatsappUrl } from '@/lib/estudio';
import { shots } from '@/lib/images';
import { BrowserFrame } from '@/components/site/browser-frame';
import { ButtonLink } from '@/components/site/button-link';
import { PhoneFrame } from '@/components/site/phone-frame';

export function Hero({ t, waMsg }: { t: Messages['hero']; waMsg: string }) {
  return (
    <section className="relative overflow-hidden pb-24 pt-32 sm:pb-32 sm:pt-40">
      <div
        aria-hidden
        className="grid-lines pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_70%_60%_at_70%_30%,black,transparent)]"
      />
      <div className="container-site relative grid items-center gap-16 lg:grid-cols-12">
        <div className="lg:col-span-6">
          <p className="font-label text-xs uppercase tracking-[0.16em] text-white/55">{t.eyebrow}</p>
          <h1 className="mt-6 text-balance font-brand text-[clamp(2.75rem,5vw+1rem,5.5rem)] font-bold leading-[0.95] tracking-[-0.035em]">
            {t.titleA} <span className="text-lime">{t.titleAccent}</span> {t.titleB}
          </h1>
          <p className="mt-7 max-w-xl text-lg leading-relaxed text-white/70">{t.lead}</p>
          <div className="mt-9 flex flex-wrap items-center gap-3">
            <ButtonLink href={estudio.diagnostico} external>
              {t.primary}
              <ArrowUpRight className="h-4 w-4" aria-hidden />
            </ButtonLink>
            <ButtonLink href={whatsappUrl(waMsg)} external variant="outline">
              <MessageCircle className="h-4 w-4" aria-hidden />
              {t.secondary}
            </ButtonLink>
          </div>
          <p className="mt-4 text-sm text-white/45">{t.note}</p>
        </div>

        <div className="lg:col-span-6">
          <div className="relative pb-10 sm:pb-0 sm:pl-10">
            <BrowserFrame image={shots.sulamita.desktop} alt={t.desktopAlt} url="sulamitaestetica.pt" priority />
            <PhoneFrame
              image={shots.sulamita.mobile}
              alt={t.mobileAlt}
              className="absolute -bottom-2 left-0 sm:-bottom-12 sm:-left-2"
            />
          </div>
          <p className="mt-6 text-right font-label text-[11px] uppercase tracking-[0.14em] text-white/45 sm:mt-16">
            {t.caseLabel}
          </p>
        </div>
      </div>
    </section>
  );
}
