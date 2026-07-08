import { Link } from "react-router-dom";
import { Icon } from "@/components/common/IconSprite";
import { useTasksStore } from "@/features/tasks/tasksStore";
import { formatDueDate, sortTasks } from "@/features/tasks/taskLogic";

const PRIORITY_COLOR: Record<string, string> = {
  high: "var(--burgundy)",
  medium: "var(--gold)",
  low: "var(--silver)",
};

export function TasksCard() {
  const tasks = useTasksStore((s) => s.tasks);
  const toggleDone = useTasksStore((s) => s.toggleDone);

  const active = sortTasks(tasks)
    .filter((t) => !t.done)
    .slice(0, 5);
  const doneCount = tasks.filter((t) => t.done).length;

  return (
    <div className="card col-3">
      <div className="card-head">
        <div className="card-title">
          <Icon name="task" />
          Tasks
        </div>
        <Link to="/tasks" className="link-more">
          {doneCount}/{tasks.length}
        </Link>
      </div>
      <div className="task-list">
        {active.length === 0 ? (
          <p style={{ color: "var(--text-muted)", fontSize: 12.5 }}>
            All caught up.
          </p>
        ) : (
          active.map((task) => (
            <div
              className="task-row"
              key={task.id}
              onClick={() => toggleDone(task.id)}
              style={{ cursor: "pointer" }}
            >
              <div
                className="task-dot"
                style={{ background: PRIORITY_COLOR[task.priority] }}
              />
              <div className="task-body">
                <div className="task-title">{task.title}</div>
                <div className="task-time">{formatDueDate(task.dueAt)}</div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
