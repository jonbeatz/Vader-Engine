import type { Config } from 'tailwindcss';
import tailwindcssAnimate from 'tailwindcss-animate';

const config: Config = {
  darkMode: 'class',
  /** Lean scan: only routes + dashboard shell + shadcn primitives this app imports (avoids Tailwind v4-only classes in unused ui/*). */
  content: [
    './app/**/*.{ts,tsx}',
    './components/dashboard/**/*.{ts,tsx}',
    './components/ui/alert-dialog.tsx',
    './components/ui/badge.tsx',
    './components/ui/button.tsx',
    './components/ui/card.tsx',
    './components/ui/command.tsx',
    './components/ui/dialog.tsx',
    './components/ui/input.tsx',
    './components/ui/kbd.tsx',
    './components/ui/label.tsx',
    './components/ui/scroll-area.tsx',
    './lib/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        border: 'var(--msc-border-color)',
        background: 'var(--msc-bg-main)',
        foreground: 'var(--msc-text-primary)',
        primary: {
          DEFAULT: 'var(--msc-accent)',
          foreground: '#ffffff',
        },
        card: {
          DEFAULT: 'var(--msc-bg-surface)',
          foreground: 'var(--msc-text-primary)',
        },
        secondary: {
          DEFAULT: 'var(--secondary)',
          foreground: 'var(--secondary-foreground)',
        },
        muted: {
          DEFAULT: 'var(--muted)',
          foreground: 'var(--muted-foreground)',
        },
        accent: {
          DEFAULT: 'var(--accent)',
          foreground: 'var(--accent-foreground)',
        },
        destructive: {
          DEFAULT: 'var(--destructive)',
          foreground: 'var(--destructive-foreground)',
        },
        popover: {
          DEFAULT: 'var(--popover)',
          foreground: 'var(--popover-foreground)',
        },
        input: 'var(--input)',
        ring: 'var(--ring)',
        success: {
          DEFAULT: 'var(--success)',
          foreground: 'var(--success-foreground)',
        },
        warning: {
          DEFAULT: 'var(--warning)',
          foreground: 'var(--warning-foreground)',
        },
        sidebar: {
          DEFAULT: 'var(--sidebar)',
          foreground: 'var(--sidebar-foreground)',
          primary: 'var(--sidebar-primary)',
          'primary-foreground': 'var(--sidebar-primary-foreground)',
          accent: 'var(--sidebar-accent)',
          'accent-foreground': 'var(--sidebar-accent-foreground)',
          border: 'var(--sidebar-border)',
          ring: 'var(--sidebar-ring)',
        },
        chart: {
          '1': 'var(--chart-1)',
          '2': 'var(--chart-2)',
          '3': 'var(--chart-3)',
          '4': 'var(--chart-4)',
          '5': 'var(--chart-5)',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
    },
  },
  plugins: [tailwindcssAnimate],
};

export default config;
