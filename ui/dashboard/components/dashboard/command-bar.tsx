'use client';

import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';

type CommandBarProps = {
  onOpenPalette: () => void;
};

export function CommandBar({ onOpenPalette }: CommandBarProps) {
  return (
    <div className="fixed bottom-10 left-[220px] right-0 z-20 flex justify-center px-4 pb-2">
      <Button
        type="button"
        variant="outline"
        className="h-9 w-full max-w-xl justify-start gap-2 border-border/80 bg-card/90 text-muted-foreground shadow-sm"
        data-testid="command-palette-trigger"
        onClick={onOpenPalette}
      >
        <Search className="h-4 w-4 shrink-0" aria-hidden />
        Type / for commands
      </Button>
    </div>
  );
}
