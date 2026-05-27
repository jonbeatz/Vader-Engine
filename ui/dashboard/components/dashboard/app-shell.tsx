'use client';

import { useState } from 'react';
import { CommandBar } from '@/components/dashboard/command-bar';
import { CommandPalette } from '@/components/dashboard/command-palette';
import { Footer } from '@/components/dashboard/footer';
import { Header } from '@/components/dashboard/header';
import { Sidebar } from '@/components/dashboard/sidebar';

export function AppShell({ children }: { children: React.ReactNode }) {
  const [paletteOpen, setPaletteOpen] = useState(false);

  return (
    <div className="msc-dashboard-wrapper min-h-screen bg-background">
      <Sidebar />
      <Header />
      <main className="ml-[220px] min-h-screen pb-28 pt-12">{children}</main>
      <CommandBar onOpenPalette={() => setPaletteOpen(true)} />
      <CommandPalette open={paletteOpen} onOpenChange={setPaletteOpen} />
      <Footer />
    </div>
  );
}
