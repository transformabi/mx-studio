import { PIN_STAGE, PIN_TRACK } from '@/lib/scroll-scrub';

/**
 * Goes in the <head> of every root layout whose pages use <Reveal>: without JavaScript nothing would ever
 * fade the wrappers in, so this shows them as they are. Tailwind 4 moves them with `translate`, not `transform`.
 * It also drops the pin of the client case (globals.css): with nothing scrolling inside the frame, the tall
 * pinned track would only leave a long empty scroll.
 */
export const revealNoScriptCss =
  '.reveal{opacity:1!important;transform:none!important;translate:none!important}' +
  `.${PIN_TRACK}{height:auto!important;margin-block:0!important}` +
  `.${PIN_STAGE}{position:static!important;display:block!important;height:auto!important;padding-top:0!important}`;

export function RevealNoScript() {
  return (
    <noscript>
      <style>{revealNoScriptCss}</style>
    </noscript>
  );
}
