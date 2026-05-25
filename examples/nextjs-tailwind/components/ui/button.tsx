import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';
import { mscCn } from '@/lib/msc-utils';

const mscButtonVariants = cva(
  'inline-flex items-center justify-center gap-msc-sm whitespace-nowrap rounded-msc text-sm font-medium transition-[var(--msc-transition)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-msc-accent disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-msc-accent-hover',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-msc-surface-hover',
        outline: 'border border-msc-border bg-transparent hover:bg-msc-surface',
        ghost: 'hover:bg-msc-surface',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 rounded-md px-3',
        lg: 'h-11 rounded-md px-8',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

export interface MscButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof mscButtonVariants> {
  asChild?: boolean;
}

const MscButton = React.forwardRef<HTMLButtonElement, MscButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={mscCn(mscButtonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
MscButton.displayName = 'MscButton';

export { MscButton, mscButtonVariants };
