import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useTasksStore } from '@/features/tasks/tasksStore';

const schema = z.object({
  title: z.string().min(2, 'Give it a short title.').max(120, 'Keep it under 120 characters.'),
  priority: z.enum(['low', 'medium', 'high']),
  dueAt: z.string().optional(),
});

type FormValues = z.infer<typeof schema>;

export function AddTaskForm() {
  const addTask = useTasksStore((s) => s.addTask);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { priority: 'medium', dueAt: '' },
  });

  function onSubmit(values: FormValues) {
    const dueIso = values.dueAt ? new Date(values.dueAt).toISOString() : null;
    addTask(values.title.trim(), values.priority, dueIso);
    reset({ title: '', priority: 'medium', dueAt: '' });
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="task-form">
      <div className="habit-form-field task-form-title">
        <input
          {...register('title')}
          placeholder="Add a task… e.g. Reply to mentor email"
          className="habit-input"
          autoComplete="off"
        />
        {errors.title && <div className="habit-input-error">{errors.title.message}</div>}
      </div>
      <select {...register('priority')} className="task-select">
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
      <input type="datetime-local" {...register('dueAt')} className="task-datetime" />
      <button type="submit" className="habit-add-btn" disabled={isSubmitting}>
        Add
      </button>
    </form>
  );
}