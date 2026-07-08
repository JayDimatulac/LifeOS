import { Icon } from '@/components/common/IconSprite';
import type { StatTile } from '@/types/dashboard';

export function StatTileCard({ stat }: { stat: StatTile }) {
  return (
    <div className="card stat-tile col-3">
      <div className="stat-top">
        <Icon name={stat.icon} />
        <span className="card-sub">{stat.label}</span>
      </div>
      <div className="stat-val serif">{stat.value}</div>
      <div className={stat.trendType === 'up' ? 'trend-up' : 'trend-flat'}>{stat.trend}</div>
    </div>
  );
}
