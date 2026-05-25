import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Boilerplate v2 Example',
  description: 'Minimal Next.js example for Boilerplate',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="msc-viewport-shield msc-shield-root">{children}</body>
    </html>
  );
}
