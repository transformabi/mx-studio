/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Static HTML in out/, served by Cloudflare. No server, no cookies.
  output: 'export',
  // Files in public/ are already sized WebP; there is no image server in a static export.
  images: { unoptimized: true },
  // One 404 page for every unmatched URL, across the three root layouts.
  experimental: { globalNotFound: true },
};

module.exports = nextConfig;
