import Link from 'next/link';

export default function HomePage() {
  return (
    <section className="msc-card-panel">
      <h2 className="msc-title" style={{ fontSize: '1.25rem' }}>
        Vader Engine v2 — Payload data layer
      </h2>
      <p className="msc-text" style={{ marginTop: '0.75rem' }}>
        Admin UI and API run on port <strong>3001</strong>. Database file:{' '}
        <code>examples/nextjs-payload/database/payload.db</code>
      </p>
      <Link
        href="/admin"
        className="msc-button"
        style={{ display: 'inline-block', marginTop: '1rem' }}
      >
        Open Payload Admin
      </Link>
    </section>
  );
}
