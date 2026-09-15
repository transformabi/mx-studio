import { Fragment } from 'react';
import { cn } from '@/lib/utils';

/** Masked word-by-word rise. Pure CSS, so it plays on first paint without waiting for JS. */
export function Words({
  text,
  start = 0,
  step = 55,
  className,
}: {
  text: string;
  /** Index of the first word across the whole heading, to chain several <Words>. */
  start?: number;
  step?: number;
  className?: string;
}) {
  return (
    <>
      {text.split(' ').map((word, i) => (
        <Fragment key={i}>
          {i > 0 && ' '}
          <span className="word-mask">
            <span className={cn('word-inner', className)} style={{ animationDelay: `${(start + i) * step}ms` }}>
              {word}
            </span>
          </span>
        </Fragment>
      ))}
    </>
  );
}

export const wordCount = (text: string) => text.split(' ').length;
