import { useMemo, useState } from "react";
import { Icon } from "@/components/common/IconSprite";
import { useTasksStore } from "@/features/tasks/tasksStore";
import { useHabitsStore } from "@/features/habits/habitsStore";
import { formatDueDate } from "@/features/tasks/taskLogic";
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

  const selectedTasks = tasksOnDay(tasks, selected);
  const selectedHabitsDone = habitsDoneOnDay(habits, selected);

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
            const isToday = dateKey(day) === dateKey(today);
            const isSelected = dateKey(day) === dateKey(selected);
            const dayTasks = tasksOnDay(tasks, day);
            const habitsDone = habitsDoneOnDay(habits, day);

            return (
              <button
                key={dateKey(day)}
                className={`calendar-day${inMonth ? "" : " other-month"}${isToday ? " today" : ""}${
                  isSelected ? " selected" : ""
                }`}
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
                  {habitsDone > 0 && (
                    <Icon name="flame" className="icon cal-flame" />
                  )}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="card">
        <div className="card-head">
          <div className="card-title">
            <Icon name="calendar" />
            {selected.toLocaleDateString([], {
              weekday: "long",
              month: "long",
              day: "numeric",
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
    </>
  );
}
