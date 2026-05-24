import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Boilerplate v2 Example',
  description: 'Minimal Next.js example for Boilerplate-v2',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
