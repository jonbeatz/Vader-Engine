'use client';

export default function Home() {
  return (
    <main className="msc-home-main">
      <h1 className="msc-title">✅ Boilerplate v2 Works!</h1>
      <p className="msc-text msc-home-sub">
        Your development environment is ready. The MCP servers are active.
      </p>
      <button
        className="msc-button msc-home-button"
        onClick={() => alert('MCP integration active')}
        type="button"
      >
        Test MCP Connection
      </button>
      <footer className="msc-text msc-home-footer">Powered by the MSC Media Engine</footer>
    </main>
  );
}
