import { Icon } from "@/components/common/IconSprite";
import { AddTaskForm } from "@/components/forms/AddTaskForm";
import { useTasksStore } from "./tasksStore";
import { formatDueDate, sortTasks } from "./taskLogic";

const PRIORITY_COLOR: Record<string, string> = {
  high: "var(--burgundy)",
  medium: "var(--gold)",
  low: "var(--silver)",
};

export function TasksPage() {
  const tasks = useTasksStore((s) => s.tasks);
  const toggleDone = useTasksStore((s) => s.toggleDone);
  const removeTask = useTasksStore((s) => s.removeTask);

  const sorted = sortTasks(tasks);
  const doneCount = tasks.filter((t) => t.done).length;

  return (
    <>
      <section className="hero" style={{ gridTemplateColumns: "1fr" }}>
        <div>
          <div className="hero-eyebrow">Today · Tasks</div>
          <h1 className="serif">
            What needs <em>doing</em>, today.
          </h1>
          <p className="hero-quote">
            &ldquo;The only way to do great work is to first write it
            down.&rdquo;
          </p>
        </div>
      </section>

      <div className="card" style={{ marginBottom: 20 }}>
        <div className="card-head">
          <div className="card-title">
            <Icon name="task" />
            Add a task
          </div>
        </div>
        <AddTaskForm />
      </div>

      <div className="card">
        <div className="card-head">
          <div className="card-title">
            <Icon name="task" />
            Your Tasks
          </div>
          <span className="card-sub">
            {doneCount} of {tasks.length} done
          </span>
        </div>

        {sorted.length === 0 ? (
          <p style={{ color: "var(--text-muted)", fontSize: 13.5 }}>
            No tasks yet — add your first one above.
          </p>
        ) : (
          <div className="task-full-list">
            {sorted.map((task) => (
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

                <button
                  className="habit-remove"
                  onClick={() => removeTask(task.id)}
                  aria-label={`Remove ${task.title}`}
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
