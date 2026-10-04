import Image from 'next/image';
import { Check } from 'lucide-react';
import type { Messages } from '@/i18n/messages';
import { estudio } from '@/lib/estudio';
import { portrait } from '@/lib/images';
import { Reveal } from '@/components/reveal';

export function About({ t }: { t: Messages['about'] }) {
  return (
    <section id="about" className="border-t border-white/10 py-24 sm:py-32">
      <div className="container-site grid items-center gap-14 lg:grid-cols-12">
        <Reveal className="lg:col-span-5">
          <figure>
            <Image
              src={portrait.src}
              alt={t.photoAlt}
              width={portrait.width}
              height={portrait.height}
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="h-auto w-full rounded-xl border border-white/10"
            />
            <figcaption className="mt-4 flex justify-between gap-4 text-sm">
              <span className="font-brand font-semibold">{estudio.owner}</span>
              <span className="text-white/50">{t.role}</span>
            </figcaption>
          </figure>
        </Reveal>
        <Reveal delay={100} className="lg:col-span-7">
          <p className="font-label text-xs uppercase tracking-[0.16em] text-white/50">
            <span className="text-lime">05</span> — {t.label}
          </p>
          <h2 className="mt-6 font-brand text-[clamp(2rem,3.2vw+1rem,3.5rem)] font-bold leading-[1.02] tracking-[-0.025em]">
            {t.title}
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-white/75">{t.p1}</p>
          <p className="mt-4 text-lg leading-relaxed text-white/75">{t.p2}</p>
          <ul className="mt-10 grid gap-x-8 gap-y-3 border-t border-white/10 pt-8 text-sm text-white/80 sm:grid-cols-2">
            {t.points.map((p) => (
              <li key={p} className="flex gap-2.5">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-lime" aria-hidden />
                {p}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
