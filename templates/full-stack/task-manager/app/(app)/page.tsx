import Link from 'next/link';

export default function HomePage() {
  return (
    <section
      style={{
        padding: '1rem',
        backgroundColor: '{{VADER_SURFACE}}',
        borderRadius: '8px',
      }}
    >
      <h2 style={{ marginTop: 0, fontSize: '1.25rem' }}>Task &amp; Client Vault</h2>
      <p style={{ marginTop: '0.75rem', lineHeight: 1.5 }}>
        Manage <strong>msc-clients</strong> and <strong>msc-tasks</strong> in Payload Admin on port{' '}
        <strong>{{PORT}}</strong>.
      </p>
      <Link
        href="/admin"
        style={{
          display: 'inline-block',
          marginTop: '1rem',
          padding: '0.5rem 1rem',
          backgroundColor: '#e02b20',
          color: '#fff',
          textDecoration: 'none',
          borderRadius: '6px',
        }}
      >
        Open Payload Admin
      </Link>
    </section>
  );
}
