import { lastNDays, todayKey } from "@/features/habits/habitLogic";

interface WeekBarsProps {
  data: Record<string, number>;
  goal?: number;
}

export function WeekBars({ data, goal }: WeekBarsProps) {
  const days = lastNDays(7);
  const max = goal ?? Math.max(1, ...days.map((d) => data[d] ?? 0));

  return (
    <div className="week-bars">
      {days.map((day) => {
        const value = data[day] ?? 0;
        const pct = Math.min(100, Math.round((value / max) * 100));
        return (
          <div className="week-bar-col" key={day}>
            <div className="week-bar-track">
              <div
                className={`week-bar-fill${day === todayKey() ? " today" : ""}`}
                style={{ height: `${pct}%` }}
              />
            </div>
            <div className="week-bar-label">
              {new Date(`${day}T00:00:00`).toLocaleDateString([], {
                weekday: "narrow",
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
