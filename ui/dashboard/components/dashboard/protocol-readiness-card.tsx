import { Shield } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

type ProtocolReadinessCardProps = {
  title: string;
  description: string;
};

export function ProtocolReadinessCard({ title, description }: ProtocolReadinessCardProps) {
  return (
    <Card className="card-glass-gleam border-border/60" data-testid="protocol-readiness-card">
      <CardHeader className="flex flex-row items-center gap-3 pb-2">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
          <Shield className="h-4 w-4 text-primary" aria-hidden />
        </div>
        <CardTitle className="text-base font-semibold">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">{description}</p>
        <p className="mt-3 text-xs font-medium uppercase tracking-wide text-primary">
          Protocol readiness · Phase 2 metrics pending
        </p>
      </CardContent>
    </Card>
  );
}
