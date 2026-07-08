import type { IconName } from '@/components/common/IconSprite';
import { Icon } from '@/components/common/IconSprite';

interface PlaceholderPageProps {
  icon: IconName;
  title: string;
  description: string;
}

/**
 * Standard "module not built yet" screen.
 * Follow the same build order as the Dashboard module to bring these online:
 * entity -> DTO -> repository -> CQRS handler -> endpoint -> React Query hook -> page.
 */
export function PlaceholderPage({ icon, title, description }: PlaceholderPageProps) {
  return (
    <div className="card col-12 placeholder-page">
      <div className="ai-seal" style={{ background: 'var(--card-bg-alt)' }}>
        <Icon name={icon} className="icon" />
      </div>
      <h2 className="serif" style={{ fontSize: 24 }}>{title}</h2>
      <p style={{ color: 'var(--text-muted)', fontSize: 13.5, maxWidth: 460 }}>{description}</p>
    </div>
  );
}
