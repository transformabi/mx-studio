'use client';

import { useEffect } from 'react';

/**
 * Hides images whose file is missing, so a demo shows blank space (or the art-directed
 * stand-in underneath, see components/demo-art.tsx) instead of a broken-image icon.
 * Mounted by the demo frame; only the demos still waiting for photos need it.
 */
export function ImgFallback() {
  useEffect(() => {
    const hide = (img: HTMLImageElement) => {
      img.style.visibility = 'hidden';
    };
    document.querySelectorAll('img').forEach((img) => {
      if (img.complete && img.naturalWidth === 0) hide(img);
    });
    const onError = (e: Event) => {
      if (e.target instanceof HTMLImageElement) hide(e.target);
    };
    document.addEventListener('error', onError, true);
    return () => document.removeEventListener('error', onError, true);
  }, []);
  return null;
}
