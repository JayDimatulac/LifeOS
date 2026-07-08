import { HeroBanner } from "@/components/cards/HeroBanner";
import { ConstellationCard } from "@/components/cards/ConstellationCard";
import { HabitsCard } from "@/components/cards/HabitsCard";
import { TasksCard } from "@/components/cards/TasksCard";
import { BookCard } from "@/components/cards/BookCard";
import { JournalCard } from "@/components/cards/JournalCard";
import { AdventureCard } from "@/components/cards/AdventureCard";
import { StatTileCard } from "@/components/cards/StatTileCard";
import { AIInsightCard } from "@/components/cards/AIInsightCard";
import { DeadlinesCard } from "@/components/cards/DeadlinesCard";
import { DashboardSkeleton } from "@/components/common/Skeleton";
import { useDashboard } from "./dashboardService";

export function DashboardPage() {
  const { data, isLoading, isError } = useDashboard();

  if (isLoading || !data) {
    return (
      <>
        <div className="card" style={{ marginBottom: 26, padding: 40 }}>
          <DashboardSkeleton />
        </div>
      </>
    );
  }

  if (isError) {
    return (
      <div className="card col-12" style={{ textAlign: "center", padding: 60 }}>
        <p className="serif" style={{ fontSize: 20, marginBottom: 8 }}>
          The page didn't load.
        </p>
        <p style={{ color: "var(--text-muted)", fontSize: 13 }}>
          Couldn't reach the dashboard service. Check that the API is running
          and try again.
        </p>
      </div>
    );
  }

  return (
    <>
      <HeroBanner
        userName={data.userName}
        chapterLabel={data.chapterLabel}
        quote={data.quote}
        weatherSummary={data.weatherSummary}
        temperatureC={data.temperatureC}
        streakDays={data.streakDays}
        tasksDoneRatio={data.tasksDoneRatio}
      />

      <div className="grid">
        <ConstellationCard areas={data.lifeAreas} />
        <HabitsCard />
        <TasksCard />
        <BookCard />
        <JournalCard />
        <AdventureCard stops={data.adventure} />

        {data.stats.map((stat) => (
          <StatTileCard stat={stat} key={stat.label} />
        ))}

        <AIInsightCard insight={data.aiInsight} />
        <DeadlinesCard deadlines={data.deadlines} />
      </div>
    </>
  );
}
