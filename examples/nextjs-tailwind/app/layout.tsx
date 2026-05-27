import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Vader Engine — Tailwind / shadcn Sandbox',
  description: 'Path B hybrid sandbox (MSC Shield tokens + Tailwind utilities)',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="msc-viewport-shield msc-dashboard-container min-h-screen bg-msc-bg-main text-msc-text-primary antialiased">
        {children}
      </body>
    </html>
  );
}
