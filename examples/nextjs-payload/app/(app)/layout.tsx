import type { Metadata } from 'next'
import '../../../../ui/studio-dark-shield.css'

export const metadata: Metadata = {
  title: 'MSC Payload Example',
  description: 'Isolated full-stack Payload + Next.js sandbox on port 3001',
}

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="msc-shield-root">
        <div
          className="msc-dashboard-container"
          style={{
            minHeight: '100vh',
            backgroundColor: '#121212',
            color: '#ffffff',
          }}
        >
          <header className="msc-card-panel" style={{ marginBottom: '1.5rem' }}>
            <h1 className="msc-title">MSC Payload Sandbox</h1>
            <p className="msc-text">Full-stack example · Port 3001 · SQLite isolated under database/</p>
          </header>
          <main>{children}</main>
          <footer className="msc-text" style={{ marginTop: '2rem', fontSize: '0.75rem', opacity: 0.7 }}>
            Powered by the MSC Media Engine
          </footer>
        </div>
      </body>
    </html>
  )
}
