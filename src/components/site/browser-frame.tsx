import Image from 'next/image';
import { cn } from '@/lib/utils';

export type Img = { src: string; width: number; height: number };

/** A real screenshot inside a plain browser chrome drawn in CSS. */
export function BrowserFrame({
  image,
  alt,
  url,
  priority,
  sizes = '(min-width: 1024px) 50vw, 100vw',
  className,
}: {
  image: Img;
  alt: string;
  url: string;
  priority?: boolean;
  sizes?: string;
  className?: string;
}) {
  return (
    <figure
      className={cn(
        'overflow-hidden rounded-xl border border-white/10 bg-ink-2 shadow-[0_40px_80px_-30px_rgba(0,0,0,0.85)]',
        className,
      )}
    >
      <div aria-hidden className="flex items-center gap-3 border-b border-white/10 px-4 py-3">
        <span className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
        </span>
        <span className="mx-auto max-w-[60%] truncate rounded-md bg-white/5 px-3 py-1 font-label text-[11px] text-white/50">
          {url}
        </span>
      </div>
      <Image
        src={image.src}
        alt={alt}
        width={image.width}
        height={image.height}
        priority={priority}
        sizes={sizes}
        className="block h-auto w-full"
      />
    </figure>
  );
}
