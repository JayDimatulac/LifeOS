import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useFinanceStore } from "@/features/finance/financeStore";

const schema = z.object({
  name: z
    .string()
    .min(1, "Give the goal a name.")
    .max(80, "Keep it under 80 characters."),
  targetAmount: z.coerce
    .number()
    .positive("Must be greater than 0.")
    .max(10000000, "That seems too large."),
});

type FormValues = z.infer<typeof schema>;

export function AddGoalForm() {
  const addGoal = useFinanceStore((s) => s.addGoal);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  function onSubmit(values: FormValues) {
    addGoal(values.name.trim(), values.targetAmount);
    reset({ name: "", targetAmount: undefined });
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="book-form">
      <div className="habit-form-field task-form-title">
        <input
          {...register("name")}
          placeholder="What are you saving for?"
          className="habit-input"
          autoComplete="off"
        />
        {errors.name && (
          <div className="habit-input-error">{errors.name.message}</div>
        )}
      </div>
      <div>
        <input
          type="number"
          step="0.01"
          {...register("targetAmount")}
          placeholder="Target amount"
          className="task-datetime"
          style={{ width: 130 }}
        />
        {errors.targetAmount && (
          <div className="habit-input-error">{errors.targetAmount.message}</div>
        )}
      </div>
      <button type="submit" className="habit-add-btn" disabled={isSubmitting}>
        Add goal
      </button>
    </form>
  );
}