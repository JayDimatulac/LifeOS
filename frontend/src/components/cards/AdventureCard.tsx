import { Link } from "react-router-dom";
import { Icon } from "@/components/common/IconSprite";
import { useAdventuresStore } from "@/features/adventures/adventuresStore";
import { buildMapStops } from "@/features/adventures/adventureLogic";

export function AdventureCard() {
  const destinations = useAdventuresStore((s) => s.destinations);
  const stops = buildMapStops(destinations);

  return (
    <div className="card map-card col-4">
      <div className="card-head">
        <div className="card-title">
          <Icon name="compass" />
          Adventure Log
        </div>
        <Link to="/adventures" className="link-more">
          Map
        </Link>
      </div>
      {stops.length === 0 ? (
        <p style={{ color: "#8F98AE", fontSize: 13.5 }}>
          Add your first destination.
        </p>
      ) : (
        <svg className="map-svg" viewBox="0 0 260 110">
          <path
            className="map-path"
            d={stops
              .map((s, i) => `${i === 0 ? "M" : "Q"}${s.x} ${s.y}`)
              .join(" ")}
          />
          {stops.map((stop) => (
            <circle
              key={stop.name}
              className={stop.active ? "map-pin-active" : "map-pin"}
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
      )}
    </div>
  );
}
