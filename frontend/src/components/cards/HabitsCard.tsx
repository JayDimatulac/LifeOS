import { Link } from 'react-router-dom';
import { Icon } from '@/components/common/IconSprite';
import { useHabitsStore } from '@/features/habits/habitsStore';
import toast from 'react-hot-toast';
import { computeStreak, isDoneToday, overallStreak } from '@/features/habits/habitLogic';
/**
 * Reads directly from the shared habits store (not props) so this card and
 * the full Habits page (/habits) always show the same state — toggling a
 * habit here updates its streak and weekly grid there, instantly.
 */
export function HabitsCard() {
  const habits = useHabitsStore((s) => s.habits);
  const toggleToday = useHabitsStore((s) => s.toggleToday);
  const doneCount = habits.filter(isDoneToday).length;

  return (
    <div className="card col-4">
      <div className="card-head">
        <div className="card-title">
          <Icon name="habit" />
          Today's Habits
        </div>
        <Link to="/habits" className="link-more">
          {doneCount} of {habits.length}
        </Link>
      </div>
      <div className="habit-list">
        {habits.map((habit) => {
          const done = isDoneToday(habit);
          const streak = computeStreak(habit);
          return (
            <div className="habit-row" key={habit.id}>
              <button
                className={`habit-check${done ? ' done' : ''}`}
                onClick={() => {
                  const wasIncomplete = !isDoneToday(habit);
                  toggleToday(habit.id);
                  if (wasIncomplete) toast.success(`${habit.name} ✓`);
                }}
                aria-pressed={done}
                aria-label={`Mark ${habit.name} ${done ? 'incomplete' : 'complete'}`}
              >
                <Icon name="check" />
              </button>
              <div className={`habit-name${done ? ' done' : ''}`}>{habit.name}</div>
              {streak > 0 && (
                <div className="streak-tag">
                  <Icon name="flame" />
                  {streak}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
