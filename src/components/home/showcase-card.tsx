import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import type { Img } from '@/components/site/browser-frame';

export function ShowcaseCard({
  href,
  external,
  image,
  alt,
  label,
  title,
  text,
  meta,
  cta,
}: {
  href: string;
  external?: boolean;
  image: Img;
  alt: string;
  label: string;
  title: string;
  text: string;
  meta?: string;
  cta: string;
}) {
  const body = (
    <>
      <div className="overflow-hidden rounded-xl border border-white/10 bg-ink-2">
        <Image
          src={image.src}
          alt={alt}
          width={image.width}
          height={image.height}
          sizes="(min-width: 768px) 50vw, 100vw"
          className="h-auto w-full transition-transform duration-700 ease-out group-hover:scale-[1.02]"
        />
      </div>
      <div className="mt-5 flex items-start justify-between gap-6">
        <div>
          <p className="font-label text-[11px] uppercase tracking-[0.14em] text-white/50">{label}</p>
          <h3 className="mt-2 font-brand text-xl font-bold tracking-tight">{title}</h3>
          <p className="mt-1 text-sm text-white/60">{text}</p>
          {meta && <p className="mt-3 font-label text-[11px] text-white/50">{meta}</p>}
        </div>
        <span className="mt-1 inline-flex shrink-0 items-center gap-1 text-sm font-semibold transition-colors group-hover:text-lime">
          {cta}
          <ArrowUpRight className="h-4 w-4" aria-hidden />
        </span>
      </div>
    </>
  );

  return external ? (
    <a href={href} target="_blank" rel="noopener noreferrer" className="group block">
      {body}
    </a>
  ) : (
    <Link href={href} className="group block">
      {body}
    </Link>
  );
}
