import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useHabitsStore } from '@/features/habits/habitsStore';

const schema = z.object({
  name: z
    .string()
    .min(2, 'Give it a short name.')
    .max(60, 'Keep it under 60 characters.'),
});

type FormValues = z.infer<typeof schema>;

export function AddHabitForm() {
  const addHabit = useHabitsStore((s) => s.addHabit);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  function onSubmit(values: FormValues) {
    addHabit(values.name.trim());
    reset();
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="habit-form">
      <div className="habit-form-field">
        <input
          {...register('name')}
          placeholder="Add a new habit… e.g. Stretch for 5 minutes"
          className="habit-input"
          autoComplete="off"
        />
        {errors.name && <div className="habit-input-error">{errors.name.message}</div>}
      </div>
      <button type="submit" className="habit-add-btn" disabled={isSubmitting}>
        Add
      </button>
    </form>
  );
}
