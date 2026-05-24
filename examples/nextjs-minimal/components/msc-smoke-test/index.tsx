import type { ReactNode } from 'react';
import './styles.css';

export interface MscSmokeTestProps {
  className?: string;
  children?: ReactNode;
}

/** Studio Dark: use var(--msc-*) tokens via msc- classes — never hardcode hex in TSX */
export function MscSmokeTest({ className, children }: MscSmokeTestProps) {
  return (
    <div className={['msc-smoke-test', className].filter(Boolean).join(' ')}>
      {children ?? 'MscSmokeTest'}
    </div>
  );
}
