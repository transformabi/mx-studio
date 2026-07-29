import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  darkMode: 'class',
  theme: {
    container: {
      center: true,
      padding: { DEFAULT: '1.25rem', sm: '1.5rem', lg: '2rem' },
      screens: { '2xl': '1280px' },
    },
    extend: {
      fontFamily: {
        sans: ['var(--font-instrument-sans)', 'system-ui', 'sans-serif'],
        display: ['var(--font-space-grotesk)', 'system-ui', 'sans-serif'],
        serif: ['var(--font-instrument-serif)', 'Georgia', 'serif'],
        mono: ['ui-monospace', 'monospace'],
      },
      fontSize: {
        'display-xl': ['clamp(3rem, 6vw + 1rem, 6.5rem)', { lineHeight: '0.98', letterSpacing: '-0.035em', fontWeight: '600' }],
        'display-lg': ['clamp(2.5rem, 4.5vw + 1rem, 4.5rem)', { lineHeight: '1.02', letterSpacing: '-0.03em', fontWeight: '600' }],
        'display-md': ['clamp(2rem, 3.5vw + 0.75rem, 3.25rem)', { lineHeight: '1.05', letterSpacing: '-0.025em', fontWeight: '600' }],
        'display-sm': ['clamp(1.625rem, 2.5vw + 0.5rem, 2.25rem)', { lineHeight: '1.15', letterSpacing: '-0.02em', fontWeight: '600' }],
      },
      spacing: {
        section: 'clamp(4rem, 8vw, 8rem)',
        'section-sm': 'clamp(3rem, 5vw, 5rem)',
      },
    },
  },
  plugins: [],
};

export default config;
