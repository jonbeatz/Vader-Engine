'use client';

export default function Home() {
  return (
    <main
      style={{
        padding: '2rem',
        fontFamily: 'system-ui, sans-serif',
        maxWidth: '800px',
        margin: '0 auto',
      }}
    >
      <h1 className="msc-title" style={{ color: '#3b82f6' }}>
        ✅ Boilerplate v2 Works!
      </h1>
      <p className="msc-text" style={{ fontSize: '1.125rem', marginTop: '1rem' }}>
        Your development environment is ready. The MCP servers are active.
      </p>
      <button
        className="msc-button"
        onClick={() => alert('MCP integration active')}
        style={{
          marginTop: '1.5rem',
          padding: '0.5rem 1rem',
          backgroundColor: '#3b82f6',
          color: 'white',
          border: 'none',
          borderRadius: '0.375rem',
          cursor: 'pointer',
        }}
        type="button"
      >
        Test MCP Connection
      </button>
      <footer style={{ marginTop: '2rem', fontSize: '0.75rem', color: '#666' }}>
        Powered by the MSC Media Engine
      </footer>
    </main>
  );
}
