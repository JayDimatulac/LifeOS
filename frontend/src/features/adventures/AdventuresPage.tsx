import { Icon } from '@/components/common/IconSprite';
import { AddDestinationForm } from '@/components/forms/AddDestinationForm';
import { useAdventuresStore } from './adventuresStore';
import { buildMapStops } from './adventureLogic';

export function AdventuresPage() {
  const destinations = useAdventuresStore((s) => s.destinations);
  const markVisited = useAdventuresStore((s) => s.markVisited);
  const removeDestination = useAdventuresStore((s) => s.removeDestination);

  const visited = destinations
    .filter((d) => d.status === 'visited')
    .sort((a, b) => (b.visitedDate ?? '').localeCompare(a.visitedDate ?? ''));
  const dreams = destinations.filter((d) => d.status === 'dream');
  const mapStops = buildMapStops(destinations, 700);

  return (
    <>
      <section className="hero" style={{ gridTemplateColumns: '1fr' }}>
        <div>
          <div className="hero-eyebrow">Chapters · Adventures</div>
          <h1 className="serif">
            Somewhere, <em>always calling</em>.
          </h1>
          <p className="hero-quote">&ldquo;Not all those who wander are lost.&rdquo;</p>
        </div>
      </section>

      <div className="card" style={{ marginBottom: 20 }}>
        <div className="card-head">
          <div className="card-title">
            <Icon name="compass" />
            Add a destination
          </div>
        </div>
        <AddDestinationForm />
      </div>

      <div className="card map-card" style={{ marginBottom: 20 }}>
        <div className="card-head">
          <div className="card-title">
            <Icon name="compass" />
            Journey Map
          </div>
        </div>
        {mapStops.length === 0 ? (
          <p style={{ color: '#8F98AE', fontSize: 13.5 }}>
            Your journey will appear here once you add a destination.
          </p>
        ) : (
          <svg className="map-svg" viewBox="0 0 700 110" style={{ marginTop: 8 }}>
            <path
              className="map-path"
              d={mapStops.map((s, i) => `${i === 0 ? 'M' : 'Q'}${s.x} ${s.y}`).join(' ')}
            />
            {mapStops.map((stop) => (
              <circle
                key={stop.name}
                className={stop.active ? 'map-pin-active' : 'map-pin'}
                cx={stop.x}
                cy={stop.y}
                r={stop.active ? 6 : 5}
              />
            ))}
            {mapStops.map((stop) => (
              <text key={`${stop.name}-label`} className="dest-label" x={Math.max(4, stop.x - 30)} y={stop.y + 20}>
                {stop.name}
              </text>
            ))}
          </svg>
        )}
      </div>

      <div className="card" style={{ marginBottom: 20 }}>
        <div className="card-head">
          <div className="card-title">
            <Icon name="compass" />
            Visited
          </div>
          <span className="card-sub">{visited.length}</span>
        </div>
        {visited.length === 0 ? (
          <p style={{ color: 'var(--text-muted)', fontSize: 13.5 }}>Nowhere yet — your first stamp goes here.</p>
        ) : (
          <div className="stamp-grid">
            {visited.map((d) => (
              <div className="stamp-item" key={d.id}>
                <div className="stamp-badge">
                  <span className="stamp-name serif">{d.name}</span>
                  <span className="stamp-label">VISITED</span>
                </div>
                <div className="stamp-date">{d.visitedDate}</div>
                <button
                  className="habit-remove"
                  onClick={() => removeDestination(d.id)}
                  aria-label={`Remove ${d.name}`}
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="card">
        <div className="card-head">
          <div className="card-title">
            <Icon name="compass" />
            Dream Destinations
          </div>
          <span className="card-sub">{dreams.length}</span>
        </div>
        {dreams.length === 0 ? (
          <p style={{ color: 'var(--text-muted)', fontSize: 13.5 }}>Nothing on the list yet.</p>
        ) : (
          <div className="dream-list">
            {dreams.map((d) => (
              <div className="dream-row" key={d.id}>
                <div className="dream-body">
                  <div className="dream-name">{d.name}</div>
                  {d.notes && <div className="dream-notes">{d.notes}</div>}
                </div>
                <button className="calendar-today-btn" onClick={() => markVisited(d.id)}>
                  Mark visited
                </button>
                <button
                  className="habit-remove"
                  onClick={() => removeDestination(d.id)}
                  aria-label={`Remove ${d.name}`}
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}