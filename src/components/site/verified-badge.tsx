import { cn } from '@/lib/utils';

/**
 * Blue scalloped seal with a white check, in the style of the verified badge on Instagram and Facebook.
 * Sized in em so it follows the text it sits next to. Decorative: the section label already says "real client".
 */
export function VerifiedBadge({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden
      focusable="false"
      className={cn('inline-block h-[0.72em] w-[0.72em] shrink-0', className)}
    >
      <path
        d="M12 1.7 15.33 3.96 19.28 4.72 20.04 8.67 22.3 12 20.04 15.33 19.28 19.28 15.33 20.04 12 22.3 8.67 20.04 4.72 19.28 3.96 15.33 1.7 12 3.96 8.67 4.72 4.72 8.67 3.96Z"
        fill="#0095F6"
        stroke="#0095F6"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path d="m7.6 12.3 3 3 5.8-6.3" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
