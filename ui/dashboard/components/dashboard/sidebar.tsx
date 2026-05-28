'use client';

import {
  Activity,
  BarChart3,
  ChevronDown,
  ChevronRight,
  Container,
  Database,
  FileCode2,
  FileText,
  FolderKanban,
  Hexagon,
  LayoutDashboard,
  ScrollText,
  Server,
  Settings,
  ShieldCheck,
  Terminal,
  Wrench,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

const primaryNavItems = [
  { href: '/', label: 'Dashboard', icon: LayoutDashboard, testId: 'nav-dashboard' },
  { href: '/projects', label: 'Projects', icon: FolderKanban, testId: 'nav-projects' },
  { href: '/templates', label: 'Templates', icon: FileCode2, testId: 'nav-templates' },
  { href: '/sandboxes', label: 'Sandboxes', icon: Container, testId: 'nav-sandboxes' },
  { href: '/integrity', label: 'Integrity', icon: ShieldCheck, testId: 'nav-integrity' },
];

const operationsSubItems = [
  { href: '/operations/ports', label: 'Ports', icon: Server, testId: 'nav-operations-ports' },
  { href: '/operations/env', label: 'Environment', icon: Terminal, testId: 'nav-operations-env' },
  { href: '/operations/scripts', label: 'Scripts', icon: Wrench, testId: 'nav-operations-scripts' },
  {
    href: '/operations/processes',
    label: 'Processes',
    icon: Activity,
    testId: 'nav-operations-processes',
  },
  { href: '/operations/jobs', label: 'Jobs', icon: FileText, testId: 'nav-operations-jobs' },
  {
    href: '/operations/metrics',
    label: 'Metrics',
    icon: BarChart3,
    testId: 'nav-operations-metrics',
  },
  { href: '/operations/logs', label: 'Logs', icon: FileText, testId: 'nav-operations-logs' },
  {
    href: '/operations/database',
    label: 'Database',
    icon: Database,
    testId: 'nav-operations-database',
  },
];

const trailingNavItems = [
  { href: '/protocols', label: 'Protocols', icon: ScrollText, testId: 'nav-protocols' },
  { href: '/settings', label: 'Settings', icon: Settings, testId: 'nav-settings' },
];

function msc_isActive(pathname: string, href: string) {
  return pathname === href || (href !== '/' && pathname.startsWith(href));
}

export function Sidebar() {
  const pathname = usePathname();
  const operationsActive = pathname.startsWith('/operations');
  const [operationsOpen, setOperationsOpen] = useState(operationsActive);

  useEffect(() => {
    if (operationsActive) setOperationsOpen(true);
  }, [operationsActive]);

  return (
    <aside className="fixed left-0 top-0 z-40 flex h-screen w-[220px] flex-col border-r border-border bg-sidebar">
      <div className="flex h-12 flex-shrink-0 items-center gap-2.5 border-b border-border px-4">
        <div className="flex h-7 w-7 items-center justify-center rounded-md bg-primary/10">
          <Hexagon className="h-4 w-4 text-primary" aria-hidden />
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

      <nav className="flex-1 overflow-y-auto p-2.5">
        {primaryNavItems.map((item) => {
          const isActive = msc_isActive(pathname, item.href);
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
                aria-hidden
              />
              {item.label}
              {isActive && <span className="ml-auto h-1.5 w-1.5 rounded-full bg-primary" />}
            </Link>
          );
        })}

        <div className="mt-1">
          <div className="flex items-center gap-0.5">
            <Link
              href="/operations"
              data-testid="nav-operations"
              className={cn(
                'group flex flex-1 items-center gap-2.5 rounded-lg px-3 py-2 text-[13px] font-medium transition-all duration-150',
                operationsActive
                  ? 'bg-sidebar-accent text-primary'
                  : 'text-sidebar-foreground/60 hover:bg-sidebar-accent/60 hover:text-sidebar-foreground',
              )}
            >
              <Terminal
                className={cn(
                  'h-4 w-4 transition-colors',
                  operationsActive
                    ? 'text-primary'
                    : 'text-sidebar-foreground/50 group-hover:text-sidebar-foreground/70',
                )}
                aria-hidden
              />
              Operations
              {pathname === '/operations' && (
                <span className="ml-auto h-1.5 w-1.5 rounded-full bg-primary" />
              )}
            </Link>
            <button
              type="button"
              aria-expanded={operationsOpen}
              aria-label={operationsOpen ? 'Collapse operations menu' : 'Expand operations menu'}
              onClick={() => setOperationsOpen((open) => !open)}
              className="rounded-md p-2 text-sidebar-foreground/50 hover:bg-sidebar-accent/60 hover:text-sidebar-foreground"
            >
              {operationsOpen ? (
                <ChevronDown className="h-3.5 w-3.5" aria-hidden />
              ) : (
                <ChevronRight className="h-3.5 w-3.5" aria-hidden />
              )}
            </button>
          </div>

          {operationsOpen ? (
            <div className="ml-2 mt-0.5 space-y-0.5 border-l border-border/60 pl-2">
              {operationsSubItems.map((item) => {
                const isActive = msc_isActive(pathname, item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    data-testid={item.testId}
                    className={cn(
                      'group flex items-center gap-2 rounded-lg px-2.5 py-1.5 text-[12px] font-medium transition-all duration-150',
                      isActive
                        ? 'bg-sidebar-accent text-primary'
                        : 'text-sidebar-foreground/55 hover:bg-sidebar-accent/60 hover:text-sidebar-foreground',
                    )}
                  >
                    <item.icon
                      className={cn(
                        'h-3.5 w-3.5',
                        isActive ? 'text-primary' : 'text-sidebar-foreground/45',
                      )}
                      aria-hidden
                    />
                    {item.label}
                  </Link>
                );
              })}
            </div>
          ) : null}
        </div>

        {trailingNavItems.map((item) => {
          const isActive = msc_isActive(pathname, item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              data-testid={item.testId}
              className={cn(
                'group mt-1 flex items-center gap-2.5 rounded-lg px-3 py-2 text-[13px] font-medium transition-all duration-150',
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
                aria-hidden
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
