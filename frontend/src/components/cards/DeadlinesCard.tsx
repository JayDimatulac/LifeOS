import { Icon } from '@/components/common/IconSprite';
import type { Deadline } from '@/types/dashboard';

export function DeadlinesCard({ deadlines }: { deadlines: Deadline[] }) {
  return (
    <div className="card col-4">
      <div className="card-head">
        <div className="card-title">
          <Icon name="calendar" />
          Upcoming
        </div>
      </div>
      {deadlines.map((d) => (
        <div className="dl-row" key={d.title}>
          <span className="dl-date">{d.date}</span>
          {d.title}
        </div>
      ))}
    </div>
  );
}
