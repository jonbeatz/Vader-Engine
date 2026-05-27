'use client';

import { useCallback, useEffect, useState } from 'react';
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { msc_fetchGrade, msc_runScript } from '@/lib/msc-api';

const COMMANDS = [
  { id: 'grade', label: 'Run structural grader', script: 'grade' },
  { id: 'lint', label: 'Run Biome lint', script: 'msc:lint' },
  { id: 'gate', label: 'Start-project gate', script: 'start-project:gate' },
  { id: 'health', label: 'Health diagnostics JSON', script: 'msc:health:json' },
  { id: 'minimal', label: 'Start minimal sandbox :3000', script: 'msc:dev:example' },
  { id: 'payload', label: 'Start Payload sandbox :3001', script: 'msc:dev:payload' },
  { id: 'tailwind', label: 'Start Tailwind sandbox :3002', script: 'msc:dev:tailwind' },
] as const;

type CommandPaletteProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function CommandPalette({ open, onOpenChange }: CommandPaletteProps) {
  const [running, setRunning] = useState(false);

  const run = useCallback(
    async (script: string) => {
      setRunning(true);
      try {
        if (script === 'grade') {
          await msc_fetchGrade();
        } else {
          await msc_runScript({ script });
        }
        onOpenChange(false);
      } finally {
        setRunning(false);
      }
    },
    [onOpenChange],
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        onOpenChange(true);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onOpenChange]);

  return (
    <CommandDialog open={open} onOpenChange={onOpenChange} data-testid="command-palette">
      <CommandInput placeholder="Search commands…" disabled={running} />
      <CommandList>
        <CommandEmpty>No commands found.</CommandEmpty>
        <CommandGroup heading="Operations">
          {COMMANDS.map((cmd) => (
            <CommandItem key={cmd.id} onSelect={() => run(cmd.script)}>
              {cmd.label}
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}
