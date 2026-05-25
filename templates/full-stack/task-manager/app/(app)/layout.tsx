import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '{{PROJECT_NAME}}',
  description: '{{PROJECT_NAME}} — Task Manager powered by Payload CMS',
};

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body style={{ margin: 0, fontFamily: 'system-ui, sans-serif' }}>
        <div
          style={{
            minHeight: '100vh',
            backgroundColor: '{{VADER_BG}}',
            color: '#ffffff',
            padding: '1.5rem',
          }}
        >
          <header
            style={{
              marginBottom: '1.5rem',
              padding: '1rem',
              backgroundColor: '{{VADER_SURFACE}}',
              borderRadius: '8px',
            }}
          >
            <h1 style={{ margin: 0, fontSize: '1.5rem' }}>{{PROJECT_NAME}}</h1>
            <p style={{ margin: '0.5rem 0 0', opacity: 0.8, fontSize: '0.9rem' }}>
              Task Manager · Port {{PORT}} · SQLite under database/
            </p>
          </header>
          <main>{children}</main>
        </div>
      </body>
    </html>
  );
}
