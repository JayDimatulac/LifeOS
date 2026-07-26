import { useMemo, useState } from "react";
import { Icon } from "@/components/common/IconSprite";
import { useTasksStore } from "@/features/tasks/tasksStore";
import { useHabitsStore } from "@/features/habits/habitsStore";
import { useJournalStore } from "@/features/journal/journalStore";
import { useFinanceStore } from "@/features/finance/financeStore";
import { formatDueDate } from "@/features/tasks/taskLogic";
import { formatCurrency } from "@/features/finance/financeLogic";
import { buildMonthGrid, dateKey, isSameMonth } from "@/utils/date";
import { habitsDoneOnDay, tasksOnDay } from "./calendarLogic";

const WEEKDAY_LABELS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const PRIORITY_COLOR: Record<string, string> = {
  high: "var(--burgundy)",
  medium: "var(--gold)",
  low: "var(--silver)",
};

export function CalendarPage() {
  const tasks = useTasksStore((s) => s.tasks);
  const habits = useHabitsStore((s) => s.habits);
  const toggleDone = useTasksStore((s) => s.toggleDone);
  const journalEntries = useJournalStore((s) => s.entries);
  const expenses = useFinanceStore((s) => s.expenses);

  const today = useMemo(() => new Date(), []);
  const [cursor, setCursor] = useState(
    () => new Date(today.getFullYear(), today.getMonth(), 1),
  );
  const [selected, setSelected] = useState(today);

  const days = useMemo(
    () => buildMonthGrid(cursor.getFullYear(), cursor.getMonth()),
    [cursor],
  );
  const monthLabel = cursor.toLocaleDateString([], {
    month: "long",
    year: "numeric",
  });

  function goToMonth(offset: number) {
    setCursor(new Date(cursor.getFullYear(), cursor.getMonth() + offset, 1));
  }
  function goToToday() {
    const now = new Date();
    setCursor(new Date(now.getFullYear(), now.getMonth(), 1));
    setSelected(now);
  }

  const selectedKey = dateKey(selected);
  const selectedTasks = tasksOnDay(tasks, selected);
  const selectedHabitsDone = habitsDoneOnDay(habits, selected);
  const selectedHabitsList = habits.filter((h) => h.history[selectedKey]);
  const selectedJournal = journalEntries[selectedKey];
  const selectedExpenses = expenses.filter((e) => e.date === selectedKey);
  const selectedExpenseTotal = selectedExpenses.reduce(
    (sum, e) => sum + e.amount,
    0,
  );
  const isToday = selectedKey === dateKey(today);

  return (
    <>
      <section className="hero" style={{ gridTemplateColumns: "1fr" }}>
        <div>
          <div className="hero-eyebrow">Today · Calendar</div>
          <h1 className="serif">
            Your days, <em>laid out</em>.
          </h1>
          <p className="hero-quote">
            &ldquo;Time is the substance from which I am made.&rdquo;
          </p>
        </div>
      </section>

      <div className="card" style={{ marginBottom: 20 }}>
        <div className="calendar-head">
          <div className="calendar-title serif">{monthLabel}</div>
          <div className="calendar-nav">
            <button
              className="icon-btn"
              onClick={() => goToMonth(-1)}
              aria-label="Previous month"
            >
              <Icon name="chev" />
            </button>
            <button className="calendar-today-btn" onClick={goToToday}>
              Today
            </button>
            <button
              className="icon-btn"
              onClick={() => goToMonth(1)}
              aria-label="Next month"
              style={{ transform: "scaleX(-1)" }}
            >
              <Icon name="chev" />
            </button>
          </div>
        </div>

        <div className="calendar-grid calendar-weekdays">
          {WEEKDAY_LABELS.map((d) => (
            <div key={d} className="calendar-weekday">
              {d}
            </div>
          ))}
        </div>

        <div className="calendar-grid">
          {days.map((day) => {
            const inMonth = isSameMonth(day, cursor);
            const dayKey = dateKey(day);
            const isTodayCell = dayKey === dateKey(today);
            const isSelected = dayKey === selectedKey;
            const dayTasks = tasksOnDay(tasks, day);
            const habitsDoneCount = habitsDoneOnDay(habits, day);
            const hasJournal = !!journalEntries[dayKey];

            return (
              <button
                key={dayKey}
                className={`calendar-day${inMonth ? "" : " other-month"}${isTodayCell ? " today" : ""}${isSelected ? " selected" : ""}`}
                onClick={() => setSelected(day)}
              >
                <span className="calendar-day-num">{day.getDate()}</span>
                <span className="calendar-day-dots">
                  {dayTasks.slice(0, 3).map((t) => (
                    <span
                      key={t.id}
                      className="cal-dot"
                      style={{ background: PRIORITY_COLOR[t.priority] }}
                    />
                  ))}
                  {habitsDoneCount > 0 && (
                    <Icon name="flame" className="icon cal-flame" />
                  )}
                  {hasJournal && (
                    <Icon name="quill" className="icon cal-flame" />
                  )}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="card" style={{ marginBottom: 20 }}>
        <div className="card-head">
          <div className="card-title">
            <Icon name="calendar" />
            {isToday
              ? "Today"
              : selected.toLocaleDateString([], {
                  weekday: "long",
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
          </div>
          {selectedHabitsDone > 0 && (
            <span className="card-sub">
              {selectedHabitsDone} habit{selectedHabitsDone === 1 ? "" : "s"}{" "}
              done
            </span>
          )}
        </div>
        {selectedTasks.length === 0 ? (
          <p style={{ color: "var(--text-muted)", fontSize: 13.5 }}>
            Nothing due this day.
          </p>
        ) : (
          <div className="task-full-list">
            {selectedTasks.map((task) => (
              <div className="task-full-row" key={task.id}>
                <button
                  className={`habit-check${task.done ? " done" : ""}`}
                  onClick={() => toggleDone(task.id)}
                  aria-pressed={task.done}
                  aria-label={`Mark ${task.title} ${task.done ? "incomplete" : "complete"}`}
                >
                  <Icon name="check" />
                </button>
                <div className="task-full-body">
                  <div className={`task-full-title${task.done ? " done" : ""}`}>
                    {task.title}
                  </div>
                  <div className="task-time">{formatDueDate(task.dueAt)}</div>
                </div>
                <div
                  className="task-dot"
                  style={{ background: PRIORITY_COLOR[task.priority] }}
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {selectedJournal && (
        <div className="card journal-card" style={{ marginBottom: 20 }}>
          <div className="card-head">
            <div className="card-title">
              <Icon name="quill" />
              Journal
            </div>
          </div>
          <div className="journal-text">{selectedJournal.text}</div>
          {selectedJournal.moods.length > 0 && (
            <div className="mood-row">
              {selectedJournal.moods.map((m) => (
                <span key={m} className="mood-pill">
                  {m}
                </span>
              ))}
            </div>
          )}
        </div>
      )}

      {selectedHabitsList.length > 0 && (
        <div className="card" style={{ marginBottom: 20 }}>
          <div className="card-head">
            <div className="card-title">
              <Icon name="habit" />
              Habits Completed
            </div>
          </div>
          <div className="habit-list">
            {selectedHabitsList.map((h) => (
              <div className="habit-row" key={h.id}>
                <div className="habit-check done">
                  <Icon name="check" />
                </div>
                <div className="habit-name">{h.name}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {selectedExpenses.length > 0 && (
        <div className="card">
          <div className="card-head">
            <div className="card-title">
              <Icon name="finance" />
              Expenses
            </div>
            <span className="card-sub">
              {formatCurrency(selectedExpenseTotal)}
            </span>
          </div>
          <div className="task-full-list">
            {selectedExpenses.map((e) => (
              <div className="task-full-row" key={e.id}>
                <div className="expense-category">{e.category}</div>
                <div className="task-full-body">
                  <div className="task-full-title">{e.description}</div>
                </div>
                <div className="expense-amount">{formatCurrency(e.amount)}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
