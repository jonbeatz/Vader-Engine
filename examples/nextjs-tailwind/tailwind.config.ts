import type { Config } from 'tailwindcss';
import tailwindcssAnimate from 'tailwindcss-animate';

/**
 * Path B bridge — token SSoT remains ../../../ui/msc-shield.css (Vader Protocol).
 * Do not hardcode hex here; extend only via var(--msc-*).
 *
 * Utility examples: bg-msc-bg-main · bg-msc-surface · text-msc-text-primary ·
 * bg-msc-accent · hover:bg-msc-accent-hover
 */
const mscVaderColors = {
  'msc-bg-main': 'var(--msc-bg-main)',
  'msc-bg-surface': 'var(--msc-bg-surface)',
  'msc-bg-surface-hover': 'var(--msc-bg-surface-hover)',
  'msc-surface': 'var(--msc-bg-surface)',
  'msc-text-primary': 'var(--msc-text-primary)',
  'msc-text-secondary': 'var(--msc-text-secondary)',
  'msc-accent': 'var(--msc-accent)',
  'msc-accent-hover': 'var(--msc-accent-hover)',
  'msc-border': 'var(--msc-border-color)',
} as const;

const config: Config = {
  darkMode: ['class'],
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ...mscVaderColors,
        msc: {
          main: 'var(--msc-bg-main)',
          surface: 'var(--msc-bg-surface)',
          'surface-hover': 'var(--msc-bg-surface-hover)',
          accent: 'var(--msc-accent)',
          'accent-hover': 'var(--msc-accent-hover)',
          'text-primary': 'var(--msc-text-primary)',
          'text-secondary': 'var(--msc-text-secondary)',
          border: 'var(--msc-border-color)',
        },
        background: 'var(--msc-bg-main)',
        foreground: 'var(--msc-text-primary)',
        primary: {
          DEFAULT: 'var(--msc-accent)',
          foreground: 'var(--msc-text-primary)',
        },
        secondary: {
          DEFAULT: 'var(--msc-bg-surface)',
          foreground: 'var(--msc-text-secondary)',
        },
        card: {
          DEFAULT: 'var(--msc-bg-surface)',
          foreground: 'var(--msc-text-primary)',
        },
        border: 'var(--msc-border-color)',
      },
      borderRadius: {
        msc: 'var(--msc-radius)',
        lg: 'var(--msc-radius)',
        md: 'calc(var(--msc-radius) - 2px)',
        sm: 'calc(var(--msc-radius) - 4px)',
      },
      spacing: {
        'msc-sm': 'var(--msc-gap-sm)',
        'msc-md': 'var(--msc-gap-md)',
        'msc-lg': 'var(--msc-gap-lg)',
      },
    },
  },
  plugins: [tailwindcssAnimate],
};

export default config;
