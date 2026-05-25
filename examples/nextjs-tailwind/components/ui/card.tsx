import * as React from 'react';
import { mscCn } from '@/lib/msc-utils';

const MscCard = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={mscCn(
        'rounded-msc border border-msc-border bg-card text-card-foreground shadow-sm',
        className,
      )}
      {...props}
    />
  ),
);
MscCard.displayName = 'MscCard';

const MscCardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={mscCn('flex flex-col gap-msc-sm p-msc-lg', className)} {...props} />
  ),
);
MscCardHeader.displayName = 'MscCardHeader';

const MscCardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={mscCn(
      'text-2xl font-semibold leading-none tracking-tight text-msc-text-primary',
      className,
    )}
    {...props}
  />
));
MscCardTitle.displayName = 'MscCardTitle';

const MscCardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p ref={ref} className={mscCn('text-sm text-msc-text-secondary', className)} {...props} />
));
MscCardDescription.displayName = 'MscCardDescription';

const MscCardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={mscCn('p-msc-lg pt-0', className)} {...props} />
  ),
);
MscCardContent.displayName = 'MscCardContent';

export { MscCard, MscCardContent, MscCardDescription, MscCardHeader, MscCardTitle };
