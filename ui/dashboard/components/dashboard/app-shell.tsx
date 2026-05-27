'use client';

import { useEffect, useState } from 'react';
import { CommandBar } from '@/components/dashboard/command-bar';
import { CommandPalette } from '@/components/dashboard/command-palette';
import { Footer } from '@/components/dashboard/footer';
import { Header } from '@/components/dashboard/header';
import { Sidebar } from '@/components/dashboard/sidebar';

export function AppShell({ children }: { children: React.ReactNode }) {
  const [paletteOpen, setPaletteOpen] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const target = e.target;
      const typing =
        target instanceof HTMLInputElement ||
        target instanceof HTMLTextAreaElement ||
        (target instanceof HTMLElement && target.isContentEditable);

      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setPaletteOpen(true);
        return;
      }

      if (e.key === '/' && !typing) {
        e.preventDefault();
        setPaletteOpen(true);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <div className="msc-dashboard-wrapper min-h-screen bg-background">
      <Sidebar />
      <Header />
      <main className="ml-[220px] min-h-screen pb-28 pt-12">{children}</main>
      <CommandBar onOpenPalette={() => setPaletteOpen(true)} />
      {paletteOpen ? (
        <span data-testid="command-palette-open" className="sr-only">
          open
        </span>
      ) : null}
      <CommandPalette open={paletteOpen} onOpenChange={setPaletteOpen} />
      <Footer />
    </div>
  );
}
