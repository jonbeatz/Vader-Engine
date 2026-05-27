'use client';

import { useEffect, useState } from 'react';
import { msc_fetchGrade, msc_fetchHealth } from '@/lib/msc-api';

export function Header() {
  const [velocity, setVelocity] = useState('—');
  const [capacity, setCapacity] = useState('—');
  const [integrity, setIntegrity] = useState('—');

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const [health, grade] = await Promise.all([msc_fetchHealth(), msc_fetchGrade()]);
        if (cancelled) return;
        const ports = health.diagnostics?.ports ?? [];
        const occupied = ports.filter((p) => p.status === 'OCCUPIED').length;
        setCapacity(`${occupied}/${ports.length || 5} ports active`);
        setIntegrity(`${grade.parsed.passed}/${grade.parsed.total}`);
        setVelocity(grade.ok ? 'Optimal' : 'Degraded');
      } catch {
        if (!cancelled) {
          setVelocity('Offline');
          setCapacity('—');
          setIntegrity('—');
        }
      }
    }

    load();
    const id = window.setInterval(load, 5000);
    return () => {
      cancelled = true;
      window.clearInterval(id);
    };
  }, []);

  return (
    <header className="fixed left-[220px] right-0 top-0 z-30 flex h-12 items-center border-b border-border bg-background/95 px-6 backdrop-blur">
      <div className="flex w-full items-center justify-between gap-4 text-xs font-medium uppercase tracking-wide text-muted-foreground">
        <span>
          Vader Velocity: <span className="text-foreground">{velocity}</span>
        </span>
        <span>
          Engine Capacity: <span className="text-foreground">{capacity}</span>
        </span>
        <span>
          Integrity Score: <span className="text-primary">{integrity}</span>
        </span>
      </div>
    </header>
  );
}
