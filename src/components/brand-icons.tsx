import type { SVGProps } from 'react';

// lucide-react 1.x dropped brand logos; these keep its 24px grid and 2px stroke.
const base = {
  xmlns: 'http://www.w3.org/2000/svg',
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
} as const;

export function Instagram(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

export function Linkedin(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

/** Blue scalloped seal with a check, in the style of social "verified" badges. */
export function VerifiedBadge(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden {...props}>
      <path fill="#0095F6" d="M23.2 12.0L22.9 12.7L22.3 13.4L21.6 13.9L21.3 14.5L21.3 15.2L21.6 16.0L21.8 16.8L21.7 17.6L21.1 18.1L20.3 18.3L19.4 18.5L18.8 18.8L18.5 19.4L18.3 20.3L18.1 21.1L17.6 21.7L16.8 21.8L16.0 21.6L15.2 21.3L14.5 21.3L13.9 21.6L13.4 22.3L12.7 22.9L12.0 23.2L11.3 22.9L10.6 22.3L10.1 21.6L9.5 21.3L8.8 21.3L8.0 21.6L7.2 21.8L6.4 21.7L5.9 21.1L5.7 20.3L5.5 19.4L5.2 18.8L4.6 18.5L3.7 18.3L2.9 18.1L2.3 17.6L2.2 16.8L2.4 16.0L2.7 15.2L2.7 14.5L2.4 13.9L1.7 13.4L1.1 12.7L0.8 12.0L1.1 11.3L1.7 10.6L2.4 10.1L2.7 9.5L2.7 8.8L2.4 8.0L2.2 7.2L2.3 6.4L2.9 5.9L3.7 5.7L4.6 5.5L5.2 5.2L5.5 4.6L5.7 3.7L5.9 2.9L6.4 2.3L7.2 2.2L8.0 2.4L8.8 2.7L9.5 2.7L10.1 2.4L10.6 1.7L11.3 1.1L12.0 0.8L12.7 1.1L13.4 1.7L13.9 2.4L14.5 2.7L15.2 2.7L16.0 2.4L16.8 2.2L17.6 2.3L18.1 2.9L18.3 3.7L18.5 4.6L18.8 5.2L19.4 5.5L20.3 5.7L21.1 5.9L21.7 6.4L21.8 7.2L21.6 8.0L21.3 8.8L21.3 9.5L21.6 10.1L22.3 10.6L22.9 11.3Z" />
      <path d="M7.6 12.3l3 3 5.9-6.1" fill="none" stroke="#fff" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
