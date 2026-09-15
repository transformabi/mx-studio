'use client';

import dynamic from 'next/dynamic';

// three.js loads after hydration so it never blocks the hero text.
export const HeroBackdrop = dynamic(() => import('./hero-canvas'), { ssr: false });
