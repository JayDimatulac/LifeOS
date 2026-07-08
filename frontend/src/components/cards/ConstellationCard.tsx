import { Icon } from '@/components/common/IconSprite';
import type { LifeAreaScore } from '@/types/dashboard';

const COLOR_MAP: Record<LifeAreaScore['color'], string> = {
  gold: '#CBA057',
  goldSoft: '#E4C888',
  silver: '#8D96A8',
};

// Fixed hexagonal layout for up to 6 life areas — deliberately geometric,
// like a hand-charted constellation rather than a generic radar chart.
const POSITIONS: Array<[number, number]> = [
  [90, 20],
  [150, 65],
  [130, 140],
  [55, 150],
  [25, 80],
  [90, 90],
];

interface ConstellationCardProps {
  areas: LifeAreaScore[];
}

export function ConstellationCard({ areas }: ConstellationCardProps) {
  const points = areas.slice(0, 6).map((area, i) => ({ ...area, pos: POSITIONS[i] }));

  return (
    <div className="card constellation-card col-5">
      <div className="card-head">
        <div className="card-title">
          <Icon name="ai" />
          Life Constellation
        </div>
        <span className="link-more">Full chart</span>
      </div>
      <div className="const-wrap">
        <svg viewBox="0 0 180 180" width="150" height="150">
          <g className="const-line">
            {points.map((p, i) => {
              const next = points[(i + 1) % points.length];
              return (
                <line
                  key={p.label}
                  x1={p.pos[0]}
                  y1={p.pos[1]}
                  x2={next.pos[0]}
                  y2={next.pos[1]}
                />
              );
            })}
          </g>
          {points.map((p) => (
            <circle
              key={p.label}
              className="star"
              cx={p.pos[0]}
              cy={p.pos[1]}
              r={3 + p.value / 40}
              fill={COLOR_MAP[p.color]}
            />
          ))}
        </svg>
        <div className="const-legend">
          {points.map((p) => (
            <div className="row" key={p.label}>
              <span className="dot" style={{ color: COLOR_MAP[p.color], background: COLOR_MAP[p.color] }} />
              {p.label}
              <span className="val">{p.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
