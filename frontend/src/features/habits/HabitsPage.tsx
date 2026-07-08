import { Icon } from '@/components/common/IconSprite';
import { AddHabitForm } from '@/components/forms/AddHabitForm';
import { useHabitsStore } from './habitsStore';
import { computeStreak, isDoneToday, lastNDays, todayKey } from './habitLogic';

const WEEKDAY_LABELS = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

export function HabitsPage() {
  const habits = useHabitsStore((s) => s.habits);
  const toggleToday = useHabitsStore((s) => s.toggleToday);
  const removeHabit = useHabitsStore((s) => s.removeHabit);

  const days = lastNDays(7);
  const doneCount = habits.filter(isDoneToday).length;

  return (
    <>
      <section className="hero" style={{ gridTemplateColumns: '1fr' }}>
        <div>
          <div className="hero-eyebrow">Chapters · Habits</div>
          <h1 className="serif">
            Small things, <em>repeated</em>.
          </h1>
          <p className="hero-quote">
            &ldquo;You do not rise to the level of your goals. You fall to the level of your systems.&rdquo;
          </p>
        </div>
      </section>

      <div className="card" style={{ marginBottom: 20 }}>
        <div className="card-head">
          <div className="card-title">
            <Icon name="habit" />
            Add a habit
          </div>
        </div>
        <AddHabitForm />
      </div>

      <div className="card">
        <div className="card-head">
          <div className="card-title">
            <Icon name="habit" />
            Your Habits
          </div>
          <span className="card-sub">
            {doneCount} of {habits.length} today
          </span>
        </div>

        {habits.length === 0 ? (
          <p style={{ color: 'var(--text-muted)', fontSize: 13.5 }}>No habits yet — add your first one above.</p>
        ) : (
          <>
            <div className="habit-full-head-row">
              <span className="habit-full-head-name">Habit</span>
              <div className="week-grid week-grid-labels">
                {WEEKDAY_LABELS.map((label, i) => (
                  <span key={`${label}-${i}`} className="week-dot-label">
                    {label}
                  </span>
                ))}
              </div>
              <span className="habit-full-head-streak">Streak</span>
              <span />
            </div>

            <div className="habit-full-list">
              {habits.map((habit) => {
                const done = isDoneToday(habit);
                const streak = computeStreak(habit);

                return (
                  <div className="habit-full-row" key={habit.id}>
                    <button
                      className={`habit-check${done ? ' done' : ''}`}
                      onClick={() => toggleToday(habit.id)}
                      aria-pressed={done}
                      aria-label={`Mark ${habit.name} ${done ? 'incomplete' : 'complete'} for today`}
                    >
                      <Icon name="check" />
                    </button>

                    <div className="habit-full-name">{habit.name}</div>

                    <div className="week-grid">
                      {days.map((day) => (
                        <span
                          key={day}
                          className={`week-dot${habit.history[day] ? ' filled' : ''}${
                            day === todayKey() ? ' today' : ''
                          }`}
                          title={day}
                        />
                      ))}
                    </div>

                    <div className="streak-tag" style={{ opacity: streak > 0 ? 1 : 0.35 }}>
                      <Icon name="flame" />
                      {streak}
                    </div>

                    <button
                      className="habit-remove"
                      onClick={() => removeHabit(habit.id)}
                      aria-label={`Remove ${habit.name}`}
                    >
                      ×
                    </button>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
    </>
  );
}
