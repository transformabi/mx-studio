'use client';

import { useEffect, useRef } from 'react';
import { PIN_STAGE, PIN_TRACK, pinnedProgress, scrubOffset, travelProgress } from '@/lib/scroll-scrub';
import { BrowserChrome, type Img } from './browser-frame';

/**
 * A real site that scrolls inside the browser frame as the visitor scrolls the page (never with the cursor).
 * Inside a `PIN_TRACK` > `PIN_STAGE` wrapper that CSS has made sticky, progress follows the pin; anywhere else
 * it follows the frame crossing the viewport. The page scroll maps straight onto the strip, with no easing of
 * its own (the site keeps one easing curve; native smooth scrolling gives the feel). Only `transform` moves;
 * reduced motion (at load or switched on later) leaves the page still at its top, and switching it off brings
 * the scroll back.
 */
export function ScrollingSite({
  header,
  body,
  bodySmall,
  alt,
  url,
  sizes,
  background,
  className,
}: {
  /** The site's sticky menu: it stays at the top of the frame while the body passes under it. */
  header?: Img;
  /** The page under the menu, as one tall strip, and the same strip narrower for phones. */
  body: Img;
  bodySmall: Img;
  alt: string;
  url: string;
  /** Rendered width of the frame, for picking the strip. */
  sizes: string;
  /** The site's own page color, shown until the strip has loaded so the frame never flashes white. */
  background: string;
  className?: string;
}) {
  const boxRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLImageElement>(null);
  const bodyRef = useRef<HTMLImageElement>(null);
  const barRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const box = boxRef.current;
    const page = bodyRef.current;
    const bar = barRef.current;
    if (!box || !page || !bar) return;
    const track = box.closest<HTMLElement>(`.${PIN_TRACK}`);
    const stage = track?.querySelector<HTMLElement>(`.${PIN_STAGE}`) ?? null;
    // What the stage holds and centres: the case itself.
    const content = stage?.firstElementChild ?? null;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');

    // Layout, read only when something resizes (including the pin turning on or off with the media queries).
    let pinned = false;
    let stageHeight = 0;
    let boxHeight = 0;
    let headerHeight = 0;
    let bodyHeight = 0;
    // Frame state.
    let near = typeof IntersectionObserver === 'undefined';
    let raf = 0;
    // Where the case sat on screen in the last pinned frame, while it was in view.
    let shownTop: number | null = null;

    const measure = () => {
      const was = pinned;
      pinned = !!stage && getComputedStyle(stage).position === 'sticky';
      stageHeight = stage?.offsetHeight ?? 0;
      boxHeight = box.clientHeight;
      headerHeight = headerRef.current?.offsetHeight ?? 0;
      bodyHeight = page.offsetHeight;
      // The pin let go while the case was on screen (reduced motion switched on, or the window got too small)
      // and the page is 1.5 screens shorter: scroll so the case stays where it was instead of jumping away.
      // Done here because the new layout can be measured before the media query's change event arrives.
      if (was && !pinned && content && shownTop !== null) {
        const off = content.getBoundingClientRect().top - shownTop;
        if (Math.abs(off) >= 1) window.scrollTo({ top: window.scrollY + off, behavior: 'instant' });
      }
      if (!pinned) shownTop = null;
    };

    const target = () => {
      let progress: number;
      if (pinned && track) {
        const r = track.getBoundingClientRect();
        progress = pinnedProgress(r.top, r.height, stageHeight);
        const c = content?.getBoundingClientRect();
        shownTop = c && c.bottom > 0 && c.top < window.innerHeight ? c.top : null;
      } else {
        const r = box.getBoundingClientRect();
        progress = travelProgress(r.top, r.height, window.innerHeight);
        shownTop = null;
      }
      return scrubOffset(progress, bodyHeight, boxHeight, headerHeight);
    };

    const tick = () => {
      raf = 0;
      const y = target();
      const max = scrubOffset(1, bodyHeight, boxHeight, headerHeight);
      page.style.transform = `translate3d(0, ${-y}px, 0)`;
      bar.style.transform = `scaleX(${max ? y / max : 0})`;
    };

    // At most one frame per display refresh, and only while the frame is on screen or about to be.
    const wake = () => {
      if (!raf && near && !reduce.matches) raf = requestAnimationFrame(tick);
    };

    const still = () => {
      cancelAnimationFrame(raf);
      raf = 0;
      page.style.transform = '';
      bar.style.transform = 'scaleX(0)';
    };

    const onMotionChange = () => {
      // The pin follows the same media query in CSS; measure() keeps the case in place when it goes.
      measure();
      if (reduce.matches) still();
      else wake();
    };

    const resize = new ResizeObserver(() => {
      measure();
      wake();
    });
    resize.observe(box);
    resize.observe(page);
    if (track) resize.observe(track);

    // Elsewhere on the page a scroll event returns at once.
    let view: IntersectionObserver | undefined;
    if (!near) {
      view = new IntersectionObserver(
        ([entry]) => {
          near = entry.isIntersecting;
          if (near) wake();
          else shownTop = null;
        },
        { rootMargin: '25% 0px' },
      );
      view.observe(track ?? box);
    }

    window.addEventListener('scroll', wake, { passive: true });
    reduce.addEventListener('change', onMotionChange);
    if (reduce.matches) still();

    return () => {
      cancelAnimationFrame(raf);
      resize.disconnect();
      view?.disconnect();
      window.removeEventListener('scroll', wake);
      reduce.removeEventListener('change', onMotionChange);
    };
  }, []);

  return (
    <BrowserChrome url={url} className={className}>
      <div ref={boxRef} className="relative aspect-[1440/900] overflow-hidden" style={{ backgroundColor: background }}>
        {header && (
          // Part of the same screenshot as the body, so it adds nothing for screen readers.
          // eslint-disable-next-line @next/next/no-img-element
          <img
            ref={headerRef}
            src={header.src}
            alt=""
            width={header.width}
            height={header.height}
            loading="lazy"
            decoding="async"
            className="relative z-10 block h-auto w-full"
            style={{ backgroundColor: background }}
          />
        )}
        {/* A plain <picture>: the export has no image server. Phones take the lighter strip in both
            orientations, whatever their pixel density (2.3x on a 3x phone is still sharp at that size), so
            turning the phone never fetches the other file; touch screens under 500px tall are phones on
            their side. */}
        <picture>
          <source
            media="(max-width: 639px), (pointer: coarse) and (max-height: 499px)"
            srcSet={bodySmall.src}
            width={bodySmall.width}
            height={bodySmall.height}
          />
          <img
            ref={bodyRef}
            src={body.src}
            srcSet={`${bodySmall.src} ${bodySmall.width}w, ${body.src} ${body.width}w`}
            sizes={sizes}
            alt={alt}
            width={body.width}
            height={body.height}
            loading="lazy"
            decoding="async"
            className="block h-auto w-full motion-reduce:transform-none!"
          />
        </picture>
        <span
          ref={barRef}
          aria-hidden
          className="absolute inset-x-0 bottom-0 z-20 h-0.5 origin-left bg-lime motion-reduce:hidden"
          style={{ transform: 'scaleX(0)' }}
        />
      </div>
    </BrowserChrome>
  );
}
