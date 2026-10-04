/**
 * Goes in the <head> of every root layout whose pages use <Reveal>: without JavaScript nothing would ever
 * fade the wrappers in, so this shows them as they are. Tailwind 4 moves them with `translate`, not `transform`.
 */
export const revealNoScriptCss = '.reveal{opacity:1!important;transform:none!important;translate:none!important}';

export function RevealNoScript() {
  return (
    <noscript>
      <style>{revealNoScriptCss}</style>
    </noscript>
  );
}
