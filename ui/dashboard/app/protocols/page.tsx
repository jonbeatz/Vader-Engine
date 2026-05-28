'use client';

import { CheckCircle2, FileCode2, Palette, Shield, Terminal } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';

const protocols = [
  {
    name: 'Naming Convention',
    description: 'Strict msc_ prefix for functions/scripts, msc- for CSS classes',
    status: 'enforced',
    icon: FileCode2,
    details: ['msc_ function prefix', 'msc- CSS class prefix', 'No generic naming'],
  },
  {
    name: 'Aesthetic Protocol',
    description: 'Studio Dark palette with high-contrast, mono-spaced system labels',
    status: 'active',
    icon: Palette,
    details: ['BG: #121212', 'Surface: #1c1c1c', 'Accent: #e02b20'],
  },
  {
    name: 'Integrity Gate',
    description: 'Mandatory 61/61 integrity score before declaring baseline green',
    status: 'active',
    icon: Shield,
    details: ['npm run grade', '61-point structural grader', 'CI enforcement'],
  },
  {
    name: 'Zero-Leak Security',
    description: 'No live credentials in committed files; use .env.local only',
    status: 'enforced',
    icon: Shield,
    details: ['.env.example as contract', '.env.local gitignored', 'MCP placeholder validation'],
  },
  {
    name: 'Hydration Pattern',
    description: 'Client relative-time UI uses mounted-state pattern',
    status: 'implemented',
    icon: Terminal,
    details: ['MscRelativeTime component', 'TicketTime component', 'SSR-safe placeholders'],
  },
];

const statusColors = {
  enforced: 'bg-green-500/10 text-green-500 border-green-500/20',
  active: 'bg-blue-500/10 text-blue-500 border-blue-500/20',
  implemented: 'bg-purple-500/10 text-purple-500 border-purple-500/20',
};

export default function ProtocolsPage() {
  return (
    <div className="mx-auto max-w-[1400px] space-y-6 p-6">
      <div>
        <h1 className="text-xl font-semibold tracking-tight">Protocols</h1>
        <p className="text-sm text-muted-foreground">
          Vader Engine governance and compliance standards
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {protocols.map((protocol) => {
          const Icon = protocol.icon;
          return (
            <Card
              key={protocol.name}
              className="card-glass-gleam transition-all hover:border-border"
            >
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Icon className="h-4 w-4 text-primary" aria-hidden />
                    <CardTitle className="text-sm font-semibold">{protocol.name}</CardTitle>
                  </div>
                  <Badge
                    variant="outline"
                    className={statusColors[protocol.status as keyof typeof statusColors]}
                  >
                    {protocol.status}
                  </Badge>
                </div>
                <CardDescription className="text-xs">{protocol.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-auto">
                  <ul className="space-y-1">
                    {protocol.details.map((detail) => (
                      <li
                        key={detail}
                        className="flex items-center gap-2 text-xs text-muted-foreground"
                      >
                        <CheckCircle2 className="h-3 w-3 text-success" aria-hidden />
                        {detail}
                      </li>
                    ))}
                  </ul>
                </ScrollArea>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
