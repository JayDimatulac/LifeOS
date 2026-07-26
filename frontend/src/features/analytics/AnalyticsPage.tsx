import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Icon } from "@/components/common/IconSprite";
import { lastNDays } from "@/features/habits/habitLogic";
import { useHabitsStore } from "@/features/habits/habitsStore";
import { useTasksStore } from "@/features/tasks/tasksStore";
import { useJournalStore } from "@/features/journal/journalStore";
import { useBooksStore } from "@/features/library/booksStore";
import { useAdventuresStore } from "@/features/adventures/adventuresStore";
import { useFinanceStore } from "@/features/finance/financeStore";
import {
  currentMonthPrefix,
  formatCurrency,
  totalForMonth,
} from "@/features/finance/financeLogic";
import { useHealthStore } from "@/features/health/healthStore";
import {
  habitConsistency,
  healthTrend,
  moodFrequency,
  spendByCategory,
} from "./analyticsLogic";

const PIE_COLORS = [
  "#CBA057",
  "#E4C888",
  "#8D96A8",
  "#8C3B45",
  "#28355A",
  "#4B1D24",
  "#1B2540",
];
const TOOLTIP_STYLE = {
  background: "#121A2C",
  border: "1px solid rgba(203,160,87,0.2)",
  borderRadius: 10,
  fontSize: 12,
};
const AXIS_TICK = { fill: "#8D96A8", fontSize: 10 };

export function AnalyticsPage() {
  const habits = useHabitsStore((s) => s.habits);
  const tasks = useTasksStore((s) => s.tasks);
  const journalEntries = useJournalStore((s) => s.entries);
  const books = useBooksStore((s) => s.books);
  const destinations = useAdventuresStore((s) => s.destinations);
  const expenses = useFinanceStore((s) => s.expenses);
  const goals = useFinanceStore((s) => s.goals);
  const waterLog = useHealthStore((s) => s.waterLog);
  const sleepLog = useHealthStore((s) => s.sleepLog);

  const days = lastNDays(7);
  const monthPrefix = currentMonthPrefix();

  const consistencyData = habitConsistency(habits, days);
  const categoryData = spendByCategory(expenses, monthPrefix);
  const healthData = healthTrend(waterLog, sleepLog, days);
  const moodData = moodFrequency(journalEntries);

  const tasksCompleted = tasks.filter((t) => t.done).length;
  const journalCountThisMonth = Object.values(journalEntries).filter((e) =>
    e.date.startsWith(monthPrefix),
  ).length;
  const booksFinished = books.filter((b) => b.status === "finished").length;
  const destinationsVisited = destinations.filter(
    (d) => d.status === "visited",
  ).length;
  const totalSaved = goals.reduce((sum, g) => sum + g.savedAmount, 0);
  const spentThisMonth = totalForMonth(expenses, monthPrefix);

  return (
    <>
      <section className="hero" style={{ gridTemplateColumns: "1fr" }}>
        <div>
          <div className="hero-eyebrow">System · Analytics</div>
          <h1 className="serif">
            The shape of your <em>month</em>.
          </h1>
          <p className="hero-quote">
            &ldquo;What gets measured gets managed.&rdquo;
          </p>
        </div>
      </section>

      <div className="analytics-stat-grid">
        <div className="card stat-tile">
          <div className="stat-top">
            <Icon name="task" />
            <span className="card-sub">Tasks Done</span>
          </div>
          <div className="stat-val serif">{tasksCompleted}</div>
        </div>
        <div className="card stat-tile">
          <div className="stat-top">
            <Icon name="journal" />
            <span className="card-sub">Entries This Month</span>
          </div>
          <div className="stat-val serif">{journalCountThisMonth}</div>
        </div>
        <div className="card stat-tile">
          <div className="stat-top">
            <Icon name="book" />
            <span className="card-sub">Books Finished</span>
          </div>
          <div className="stat-val serif">{booksFinished}</div>
        </div>
        <div className="card stat-tile">
          <div className="stat-top">
            <Icon name="compass" />
            <span className="card-sub">Places Visited</span>
          </div>
          <div className="stat-val serif">{destinationsVisited}</div>
        </div>
        <div className="card stat-tile">
          <div className="stat-top">
            <Icon name="finance" />
            <span className="card-sub">Spent This Month</span>
          </div>
          <div className="stat-val serif">{formatCurrency(spentThisMonth)}</div>
        </div>
        <div className="card stat-tile">
          <div className="stat-top">
            <Icon name="finance" />
            <span className="card-sub">Saved Toward Goals</span>
          </div>
          <div className="stat-val serif">{formatCurrency(totalSaved)}</div>
        </div>
      </div>

      <div className="card" style={{ marginBottom: 20 }}>
        <div className="card-head">
          <div className="card-title">
            <Icon name="analytics" />
            Habit Consistency
          </div>
          <span className="card-sub">Last 7 days</span>
        </div>
        {habits.length === 0 ? (
          <p style={{ color: "var(--text-muted)", fontSize: 13.5 }}>
            Add a habit to see your consistency here.
          </p>
        ) : (
          <div style={{ width: "100%", height: 220 }}>
            <ResponsiveContainer>
              <BarChart
                data={consistencyData}
                margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="rgba(255,255,255,0.06)"
                  vertical={false}
                />
                <XAxis
                  dataKey="day"
                  tick={AXIS_TICK}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tick={AXIS_TICK}
                  axisLine={false}
                  tickLine={false}
                  unit="%"
                />
                <Tooltip
                  contentStyle={TOOLTIP_STYLE}
                  labelStyle={{ color: "#E4C888" }}
                />
                <Bar dataKey="percent" radius={[6, 6, 0, 0]} fill="#CBA057" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>

      <div className="card" style={{ marginBottom: 20 }}>
        <div className="card-head">
          <div className="card-title">
            <Icon name="finance" />
            Spending by Category
          </div>
          <span className="card-sub">This month</span>
        </div>
        {categoryData.length === 0 ? (
          <p style={{ color: "var(--text-muted)", fontSize: 13.5 }}>
            No expenses logged this month.
          </p>
        ) : (
          <div
            style={{
              width: "100%",
              height: 240,
              display: "flex",
              alignItems: "center",
              gap: 20,
              flexWrap: "wrap",
            }}
          >
            <div style={{ flex: "1 1 220px", height: "100%", minWidth: 200 }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    dataKey="amount"
                    nameKey="category"
                    innerRadius={55}
                    outerRadius={85}
                    paddingAngle={3}
                  >
                    {categoryData.map((entry, i) => (
                      <Cell
                        key={entry.category}
                        fill={PIE_COLORS[i % PIE_COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={TOOLTIP_STYLE}
                    formatter={(value: number) => formatCurrency(value)}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div
              style={{
                flex: "1 1 180px",
                display: "flex",
                flexDirection: "column",
                gap: 8,
              }}
            >
              {categoryData.map((entry, i) => (
                <div
                  key={entry.category}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    fontSize: 12.5,
                  }}
                >
                  <span
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: "50%",
                      background: PIE_COLORS[i % PIE_COLORS.length],
                      flexShrink: 0,
                    }}
                  />
                  {entry.category}
                  <span
                    style={{
                      marginLeft: "auto",
                      color: "var(--text-muted)",
                      fontFamily: "'IBM Plex Mono', monospace",
                    }}
                  >
                    {formatCurrency(entry.amount)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="card" style={{ marginBottom: 20 }}>
        <div className="card-head">
          <div className="card-title">
            <Icon name="health" />
            Water &amp; Sleep
          </div>
          <span className="card-sub">Last 7 days</span>
        </div>
        <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
          <div style={{ flex: "1 1 220px", height: 180 }}>
            <div className="chart-subtitle">Water (L)</div>
            <ResponsiveContainer width="100%" height="88%">
              <LineChart
                data={healthData}
                margin={{ top: 5, right: 10, left: -20, bottom: 0 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="rgba(255,255,255,0.06)"
                  vertical={false}
                />
                <XAxis
                  dataKey="day"
                  tick={AXIS_TICK}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis tick={AXIS_TICK} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={TOOLTIP_STYLE} />
                <Line
                  type="monotone"
                  dataKey="water"
                  stroke="#CBA057"
                  strokeWidth={2}
                  dot={{ r: 3 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div style={{ flex: "1 1 220px", height: 180 }}>
            <div className="chart-subtitle">Sleep (h)</div>
            <ResponsiveContainer width="100%" height="88%">
              <LineChart
                data={healthData}
                margin={{ top: 5, right: 10, left: -20, bottom: 0 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="rgba(255,255,255,0.06)"
                  vertical={false}
                />
                <XAxis
                  dataKey="day"
                  tick={AXIS_TICK}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis tick={AXIS_TICK} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={TOOLTIP_STYLE} />
                <Line
                  type="monotone"
                  dataKey="sleep"
                  stroke="#8AA97C"
                  strokeWidth={2}
                  dot={{ r: 3 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-head">
          <div className="card-title">
            <Icon name="journal" />
            Mood Frequency
          </div>
          <span className="card-sub">All entries</span>
        </div>
        {moodData.length === 0 ? (
          <p style={{ color: "var(--text-muted)", fontSize: 13.5 }}>
            Write a few journal entries to see this.
          </p>
        ) : (
          <div className="mood-freq-list">
            {moodData.map((m) => {
              const percent = Math.round((m.count / moodData[0].count) * 100);
              return (
                <div className="mood-freq-row" key={m.mood}>
                  <span className="mood-freq-label">{m.mood}</span>
                  <div className="mood-freq-track">
                    <div
                      className="mood-freq-fill"
                      style={{ width: `${percent}%` }}
                    />
                  </div>
                  <span className="mood-freq-count">{m.count}</span>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
}
