'use client';

import {
  Container,
  FileCode2,
  FolderKanban,
  Hexagon,
  LayoutDashboard,
  ScrollText,
  Settings,
  ShieldCheck,
  Terminal,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/', label: 'Dashboard', icon: LayoutDashboard, testId: 'nav-dashboard' },
  { href: '/projects', label: 'Projects', icon: FolderKanban, testId: 'nav-projects' },
  { href: '/templates', label: 'Templates', icon: FileCode2, testId: 'nav-templates' },
  { href: '/sandboxes', label: 'Sandboxes', icon: Container, testId: 'nav-sandboxes' },
  { href: '/integrity', label: 'Integrity', icon: ShieldCheck, testId: 'nav-integrity' },
  { href: '/operations', label: 'Operations', icon: Terminal, testId: 'nav-operations' },
  { href: '/protocols', label: 'Protocols', icon: ScrollText, testId: 'nav-protocols' },
  { href: '/settings', label: 'Settings', icon: Settings, testId: 'nav-settings' },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 z-40 flex h-screen w-[220px] flex-col border-r border-border bg-sidebar">
      {/* Logo - fixed height */}
      <div className="flex h-12 flex-shrink-0 items-center gap-2.5 border-b border-border px-4">
        <div className="flex h-7 w-7 items-center justify-center rounded-md bg-primary/10">
          <Hexagon className="h-4 w-4 text-primary" />
        </div>
        <div className="flex flex-col">
          <span className="text-sm font-semibold tracking-tight text-sidebar-foreground">
            Vader
          </span>
          <span className="text-[10px] font-medium uppercase tracking-widest text-primary">
            Engine
          </span>
        </div>
      </div>

      {/* Navigation - takes remaining space */}
      <nav className="flex-1 overflow-y-auto p-2.5">
        {navItems.map((item) => {
          const isActive =
            pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));

          return (
            <Link
              key={item.href}
              href={item.href}
              data-testid={item.testId}
              className={cn(
                'group flex items-center gap-2.5 rounded-lg px-3 py-2 text-[13px] font-medium transition-all duration-150',
                isActive
                  ? 'bg-sidebar-accent text-primary'
                  : 'text-sidebar-foreground/60 hover:bg-sidebar-accent/60 hover:text-sidebar-foreground',
              )}
            >
              <item.icon
                className={cn(
                  'h-4 w-4 transition-colors',
                  isActive
                    ? 'text-primary'
                    : 'text-sidebar-foreground/50 group-hover:text-sidebar-foreground/70',
                )}
              />
              {item.label}
              {isActive && <span className="ml-auto h-1.5 w-1.5 rounded-full bg-primary" />}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
