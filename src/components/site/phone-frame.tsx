import Image from 'next/image';
import { cn } from '@/lib/utils';
import type { Img } from './browser-frame';

export function PhoneFrame({ image, alt, className }: { image: Img; alt: string; className?: string }) {
  return (
    <figure
      className={cn(
        'w-[168px] rounded-[1.75rem] border border-white/15 bg-ink p-1.5 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.9)] sm:w-[196px]',
        className,
      )}
    >
      <Image
        src={image.src}
        alt={alt}
        width={image.width}
        height={image.height}
        sizes="196px"
        className="block h-auto w-full rounded-[1.4rem]"
      />
    </figure>
  );
}
