import { Analytics } from '@vercel/analytics/next';
import type { Metadata, Viewport } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { Toaster } from 'sonner';
import { AppShell } from '@/components/dashboard/app-shell';
import { MscQueryProvider } from '@/components/providers/msc-query-provider';
import './globals.css';

const geist = Geist({
  subsets: ['latin'],
  variable: '--font-geist-sans',
});

const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-geist-mono',
});

export const metadata: Metadata = {
  title: {
    default: 'Vader Construct | Developer Operations Dashboard',
    template: '%s | Vader Construct',
  },
  description: 'Production-grade developer operations dashboard for Vader Engine v2.5.0',
  generator: 'Vader Engine',
  keywords: ['developer', 'operations', 'dashboard', 'devops', 'monitoring'],
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f8f8f8' },
    { media: '(prefers-color-scheme: dark)', color: '#1a1a1f' },
  ],
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geist.variable} ${geistMono.variable} bg-background`}>
      <body className="msc-viewport-shield msc-dashboard-container font-sans antialiased">
        <MscQueryProvider>
          <AppShell>{children}</AppShell>
          <Toaster position="bottom-right" />
          {process.env.NODE_ENV === 'production' && <Analytics />}
        </MscQueryProvider>
      </body>
    </html>
  );
}
