export function Skeleton({ height = 20, width = '100%', radius = 8 }: { height?: number; width?: string | number; radius?: number }) {
  return (
    <div
      style={{
        height,
        width,
        borderRadius: radius,
        background: 'var(--card-bg-alt)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent)',
          animation: 'shimmer 1.4s infinite',
        }}
      />
      <style>{`@keyframes shimmer { 0% { transform: translateX(-100%); } 100% { transform: translateX(100%); } }`}</style>
    </div>
  );
}

export function DashboardSkeleton() {
  return (
    <div className="grid">
      <div className="card col-5"><Skeleton height={150} /></div>
      <div className="card col-4"><Skeleton height={150} /></div>
      <div className="card col-3"><Skeleton height={150} /></div>
      <div className="card col-4"><Skeleton height={110} /></div>
      <div className="card col-4"><Skeleton height={110} /></div>
      <div className="card col-4"><Skeleton height={110} /></div>
    </div>
  );
}
