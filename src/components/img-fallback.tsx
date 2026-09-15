'use client';

import { useEffect } from 'react';

/**
 * Global fallback for broken images: swaps failed <img> src to
 * a deterministic Picsum photo based on alt text.
 * Also retroactively scans images already broken before mount.
 */
export function ImgFallback() {
  useEffect(() => {
    const swap = (el: HTMLImageElement) => {
      if (el.dataset.fallbackApplied === '1') return;
      el.dataset.fallbackApplied = '1';
      // Photos with art underneath (components/demo-art.tsx) just step aside.
      if (el.dataset.fallback === 'hide') {
        el.style.visibility = 'hidden';
        return;
      }
      const w = Math.max(200, el.width || el.clientWidth || 800);
      const h = Math.max(200, el.height || el.clientHeight || 600);
      const kw = el.dataset.keyword?.trim();
      if (kw) {
        el.src = `https://loremflickr.com/${w}/${h}/${encodeURIComponent(kw)}`;
      } else {
        const seed = encodeURIComponent(
          (el.alt && el.alt.trim()) || el.src.split('/').pop()?.split('?')[0] || 'img',
        );
        el.src = `https://picsum.photos/seed/${seed}/${w}/${h}`;
      }
    };

    const isBroken = (el: HTMLImageElement) => el.complete && el.naturalWidth === 0;

    const scan = () => {
      document.querySelectorAll('img').forEach((img) => {
        if (isBroken(img as HTMLImageElement)) swap(img as HTMLImageElement);
      });
    };

    scan();

    const handler = (e: Event) => {
      const el = e.target as HTMLElement;
      if (el instanceof HTMLImageElement) swap(el);
    };
    document.addEventListener('error', handler, true);

    const observer = new MutationObserver(() => scan());
    observer.observe(document.body, { childList: true, subtree: true });

    const interval = setInterval(scan, 2000);
    const clearIt = setTimeout(() => clearInterval(interval), 15000);

    return () => {
      document.removeEventListener('error', handler, true);
      observer.disconnect();
      clearInterval(interval);
      clearTimeout(clearIt);
    };
  }, []);
  return null;
}
