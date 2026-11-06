# Vendored site fonts (latin)

Self-hosted latin `.woff2` files for `next/font/local`.

**Why:** Next.js 16.3.x Turbopack/`next/font/google` fails in CI when Google Fonts
returns extensionless `/l/font?kit=…&skey=…` URLs (`Can't resolve
@vercel/turbopack-next/internal/font/google/font`, `queries have exactly one entry`).
See https://github.com/vercel/next.js/issues/99114.

Regenerate with: `python3 scripts/vendor-fonts.py`
