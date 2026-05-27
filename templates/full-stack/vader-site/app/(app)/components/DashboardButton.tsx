'use client';

import { useState } from 'react';

const DASHBOARD_URL = 'http://localhost:3010';

export default function DashboardButton() {
  const [isChecking, setIsChecking] = useState(false);
  const [error, setError] = useState('');

  const msc_checkAndLaunch = async () => {
    setIsChecking(true);
    setError('');

    try {
      await fetch(DASHBOARD_URL, {
        method: 'HEAD',
        mode: 'no-cors',
        signal: AbortSignal.timeout(2000),
      });

      window.location.href = DASHBOARD_URL;
    } catch {
      setError('Dashboard not running. Start it with: npm run msc:dev:dashboard');
    } finally {
      setIsChecking(false);
    }
  };

  return (
    <div>
      <button
        type="button"
        onClick={msc_checkAndLaunch}
        className="vader-btn-secondary"
        disabled={isChecking}
        style={{ cursor: isChecking ? 'wait' : 'pointer' }}
      >
        {isChecking ? 'CHECKING...' : 'LAUNCH VADER CONSTRUCT DASHBOARD'}
        {isChecking && <span className="vader-loading-dots">•••</span>}
      </button>
      {error && (
        <p
          style={{
            fontSize: '0.7rem',
            color: '#e74c3c',
            marginTop: '0.5rem',
            fontFamily: 'monospace',
          }}
        >
          {'⚠ '}
          {error}
        </p>
      )}
    </div>
  );
}
