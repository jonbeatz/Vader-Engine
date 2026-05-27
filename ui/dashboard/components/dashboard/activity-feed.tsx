'use client';

import { Circle, Clock } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';

interface ActivityItem {
  id: string;
  type: 'deploy' | 'build' | 'error' | 'info';
  message: string;
  timestamp: Date;
  project?: string;
}

interface ActivityFeedProps {
  activities: ActivityItem[];
}

function msc_formatShortTime(date: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffMins < 1) return 'now';
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  return `${diffDays}d ago`;
}

function MscRelativeTime({ date }: { date: Date }) {
  const [mounted, setMounted] = useState(false);
  const [, setTick] = useState(0);

  useEffect(() => {
    setMounted(true);
    const intervalId = window.setInterval(() => {
      setTick((tick) => tick + 1);
    }, 60_000);
    return () => window.clearInterval(intervalId);
  }, []);

  if (!mounted) {
    return (
      <span className="msc-activity-feed__time msc-activity-feed__time--placeholder" aria-hidden>
        …
      </span>
    );
  }

  return <span className="msc-activity-feed__time">{msc_formatShortTime(date)}</span>;
}

const MSC_ACTIVITY_DOT_CLASS: Record<ActivityItem['type'], string> = {
  deploy: 'msc-activity-feed__dot--deploy',
  build: 'msc-activity-feed__dot--build',
  error: 'msc-activity-feed__dot--error',
  info: 'msc-activity-feed__dot--info',
};

export function ActivityFeed({ activities }: ActivityFeedProps) {
  return (
    <Card className="msc-activity-feed" data-testid="activity-feed">
      <CardHeader className="msc-activity-feed__header">
        <div className="msc-activity-feed__icon-wrap">
          <Clock className="msc-activity-feed__icon" aria-hidden />
        </div>
        <h2 className="msc-activity-feed__title">Activity Pulse</h2>
      </CardHeader>
      <CardContent className="msc-activity-feed__body">
        <ScrollArea className="msc-activity-feed__scroll">
          <div className="msc-activity-feed__list">
            {activities.map((activity, index) => (
              <div
                key={activity.id}
                className={
                  index !== activities.length - 1
                    ? 'msc-activity-feed__item msc-activity-feed__item--bordered'
                    : 'msc-activity-feed__item'
                }
              >
                <div className="msc-activity-feed__rail">
                  <Circle
                    className={`msc-activity-feed__dot ${MSC_ACTIVITY_DOT_CLASS[activity.type]}`}
                    aria-hidden
                  />
                  {index !== activities.length - 1 && (
                    <div className="msc-activity-feed__line" aria-hidden />
                  )}
                </div>

                <div className="msc-activity-feed__content">
                  <p className="msc-activity-feed__message">{activity.message}</p>
                  <div className="msc-activity-feed__meta">
                    {activity.project && (
                      <>
                        <span className="msc-activity-feed__project">{activity.project}</span>
                        <span className="msc-activity-feed__sep" aria-hidden>
                          •
                        </span>
                      </>
                    )}
                    <MscRelativeTime date={activity.timestamp} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
