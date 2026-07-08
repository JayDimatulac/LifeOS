import { Icon } from '@/components/common/IconSprite';

export function AIInsightCard({ insight }: { insight: string }) {
  return (
    <div className="card ai-card col-8">
      <div className="card-head">
        <div className="card-title">
          <Icon name="ai" />A Note From Gus
        </div>
      </div>
      <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
        <div className="ai-seal">
          <Icon name="quill" />
        </div>
        <div style={{ flex: 1 }}>
          <p className="ai-note">{insight}</p>
          <div className="ai-sign serif">— your companion</div>
        </div>
      </div>
    </div>
  );
}
