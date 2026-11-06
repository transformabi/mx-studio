# Cloudflare production build failure after PR #22 (2026-11-06)

## Symptom
Workers Builds on `main` (`c2d902c`, build `0d047ada-…`) failed during `npm run build`.
GitHub check duration looked instantaneous; the real log (exported from the Dash) shows
Next.js 16.3.8 Turbopack errors while compiling `src/lib/fonts.ts` → layouts:

- `Module not found: Can't resolve '@vercel/turbopack-next/internal/font/google/font'`
- `Error while looking up import map: next/font/google queries have exactly one entry`
- Import traces pointing at JetBrains Mono / `next/font/google` generated CSS modules
- ~12 errors; Node 24.22.2 / npm 10.9.2; Cloudflare restored build cache then `npm ci`

Preview of the same commit succeeded earlier; a local `npm run check` on a warm machine
also passed — consistent with a **cache/environment-sensitive Google Fonts fetch** at
build time, not with a missing Cloudflare deploy token.

## Root cause (high confidence)
Open Next.js issue: https://github.com/vercel/next.js/issues/99114

Google Fonts occasionally answers `css2` with extensionless
`fonts.gstatic.com/l/font?kit=…&skey=…` URLs. Turbopack (and sometimes webpack) cannot
parse the `&` in those URLs, so the build fails. Which family fails can vary; this
run named JetBrains Mono.

## Fix
Vendor latin `.woff2` files under `src/fonts/` and load them with `next/font/local`
(`src/lib/fonts.ts`). Same families/weight ranges; build no longer contacts Google.
Regenerate fonts with `python3 scripts/vendor-fonts.py`.

## Regression guard
`tests/unit/fonts.test.ts` asserts `src/lib/fonts.ts` does not import `next/font/google`
and that the vendored woff2 files exist.
