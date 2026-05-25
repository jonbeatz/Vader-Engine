import type { Metadata } from 'next';
import { Rajdhani, Share_Tech_Mono } from 'next/font/google';
import './globals.css';
import './vader.css';

const rajdhani = Rajdhani({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-display',
});

const shareTechMono = Share_Tech_Mono({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-mono',
});

export const metadata: Metadata = {
  title: 'VaderLabz — Dev Lab & AI Playground',
  description:
    'Building, breaking, and learning. Full-stack AI experiments, personal projects, and new ideas forged in the dark.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${rajdhani.variable} ${shareTechMono.variable}`}>
        {children}
      </body>
    </html>
  );
}
