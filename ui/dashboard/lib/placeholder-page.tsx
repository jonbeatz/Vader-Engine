import { ProtocolReadinessCard } from '@/components/dashboard/protocol-readiness-card';

export function MscPlaceholderPage({ title, description }: { title: string; description: string }) {
  return (
    <div className="mx-auto max-w-2xl p-6">
      <ProtocolReadinessCard title={title} description={description} />
    </div>
  );
}
