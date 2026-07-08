import { Icon } from '@/components/common/IconSprite';
import type { AdventureStop } from '@/types/dashboard';

export function AdventureCard({ stops }: { stops: AdventureStop[] }) {
  const pathD = stops
    .map((s, i) => `${i === 0 ? 'M' : 'Q'}${s.x} ${s.y}`)
    .join(' ');

  return (
    <div className="card map-card col-4">
      <div className="card-head">
        <div className="card-title">
          <Icon name="compass" />
          Adventure Log
        </div>
        <span className="link-more">Map</span>
      </div>
      <svg className="map-svg" viewBox="0 0 260 110">
        <path className="map-path" d={pathD} />
        {stops.map((stop) => (
          <circle
            key={stop.name}
            className={stop.active ? 'map-pin-active' : 'map-pin'}
            cx={stop.x}
            cy={stop.y}
            r={stop.active ? 5 : 4}
          />
        ))}
        {stops.map((stop) => (
          <text
            key={`${stop.name}-label`}
            className="dest-label"
            x={Math.max(4, stop.x - 30)}
            y={stop.y + 18}
          >
            {stop.name}
          </text>
        ))}
      </svg>
    </div>
  );
}
