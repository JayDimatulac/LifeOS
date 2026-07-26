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
import { useFinanceStore } from "@/features/finance/financeStore";
import { totalForDay } from "@/features/finance/financeLogic";
import { useHealthStore } from "@/features/health/healthStore";
import { useJournalStore } from "@/features/journal/journalStore";
import { dateKey } from "@/utils/date";
import type { StatTile } from "@/types/dashboard";
import { useDashboard } from "./dashboardService";
import { useSettingsStore } from '@/features/settings/settingsStore';
import { useHabitsStore } from '@/features/habits/habitsStore';
import { overallStreak } from '@/features/habits/habitLogic';
import { useTasksStore } from '@/features/tasks/tasksStore';
import { daysSince } from '@/utils/date';

export function DashboardPage() {
  const { data, isLoading, isError } = useDashboard();
  const expenses = useFinanceStore((s) => s.expenses);
  const monthlyBudget = useFinanceStore((s) => s.monthlyBudget);
  const waterLog = useHealthStore((s) => s.waterLog);
  const waterGoal = useHealthStore((s) => s.waterGoal);
  const sleepLog = useHealthStore((s) => s.sleepLog);
  const journalEntries = useJournalStore((s) => s.entries);
  const displayName = useSettingsStore((s) => s.displayName);
const habits = useHabitsStore((s) => s.habits);
const tasks = useTasksStore((s) => s.tasks);
const journeyStartDate = useSettingsStore((s) => s.journeyStartDate);

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

  const today = dateKey(new Date());

  const dailySpend = totalForDay(expenses, today);
  const dailyBudget = monthlyBudget > 0 ? monthlyBudget / 30 : 0;
  const spendPercent =
    dailyBudget > 0 ? Math.round((dailySpend / dailyBudget) * 100) : null;
  const financeStat: StatTile = {
    label: "Spend today",
    value: dailySpend > 0 ? `₱${dailySpend.toLocaleString()}` : "₱0",
    trend:
      spendPercent !== null
        ? `${spendPercent}% of daily budget`
        : "Set a budget on Finance page",
    trendType: "flat",
    icon: "finance",
  };

  const todayWater = waterLog[today] ?? 0;
  const litersToday = Math.round(todayWater * 0.25 * 10) / 10;
  const waterStat: StatTile = {
    label: "Water",
    value: `${litersToday}L`,
    trend:
      todayWater > 0
        ? `${todayWater} of ${waterGoal} glasses`
        : "Log your first glass",
    trendType: todayWater > 0 ? "up" : "flat",
    icon: "drop",
  };

  const todaySleep = sleepLog[today];
  const sleepStat: StatTile = {
    label: "Sleep",
    value: todaySleep !== undefined ? `${todaySleep}h` : "—",
    trend: todaySleep !== undefined ? "Logged for today" : "No data yet",
    trendType: "flat",
    icon: "moon",
  };

  const todayMood = journalEntries[today]?.moods?.[0];
  const moodStat: StatTile = {
    label: "Mood",
    value: todayMood ?? "—",
    trend: todayMood
      ? "From today's journal entry"
      : "Write today's entry to log mood",
    trendType: "flat",
    icon: "health",
  };

  const stats = data.stats.map((stat) => {
    if (stat.icon === "finance") return financeStat;
    if (stat.icon === "drop") return waterStat;
    if (stat.icon === "moon") return sleepStat;
    if (stat.icon === "health") return moodStat;
    return stat;
  });
  
  const dayCount = daysSince(journeyStartDate);
  const chapterLabel = `Chapter ${dayCount}`;
  const streakDays = overallStreak(habits);
  const doneTasks = tasks.filter((t) => t.done).length;
  const tasksDoneRatio = `${doneTasks}/${tasks.length}`;
  
  return (
    <>
      <HeroBanner
        
  userName={displayName}
  chapterLabel={chapterLabel}
  quote={data.quote}
  weatherSummary={data.weatherSummary}
  temperatureC={data.temperatureC}
  streakDays={streakDays}
  tasksDoneRatio={tasksDoneRatio}
/>
  

      <div className="grid">
        <ConstellationCard areas={data.lifeAreas} />
        <HabitsCard />
        <TasksCard />
        <BookCard />
        <JournalCard />
        <AdventureCard />

        {stats.map((stat) => (
          <StatTileCard stat={stat} key={stat.label} />
        ))}

        <AIInsightCard insight={data.aiInsight} />
        <DeadlinesCard deadlines={data.deadlines} />
      </div>
    </>
  );
}
