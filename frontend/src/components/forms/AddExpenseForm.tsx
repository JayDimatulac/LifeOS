import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useFinanceStore } from "@/features/finance/financeStore";
import { EXPENSE_CATEGORIES } from "@/features/finance/types";
import { dateKey } from "@/utils/date";

const schema = z.object({
  description: z
    .string()
    .min(1, "Add a short description.")
    .max(100, "Keep it under 100 characters."),
  amount: z.coerce
    .number()
    .positive("Must be greater than 0.")
    .max(1000000, "That seems too large."),
  category: z.string(),
  date: z.string().min(1, "Pick a date."),
});

type FormValues = z.infer<typeof schema>;

export function AddExpenseForm() {
  const addExpense = useFinanceStore((s) => s.addExpense);
  const today = dateKey(new Date());

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { category: EXPENSE_CATEGORIES[0], date: today },
  });

  function onSubmit(values: FormValues) {
    addExpense(
      values.description.trim(),
      values.amount,
      values.category,
      values.date,
    );
    reset({
      description: "",
      amount: undefined,
      category: EXPENSE_CATEGORIES[0],
      date: today,
    });
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="book-form">
      <div className="habit-form-field task-form-title">
        <input
          {...register("description")}
          placeholder="What was it for?"
          className="habit-input"
          autoComplete="off"
        />
        {errors.description && (
          <div className="habit-input-error">{errors.description.message}</div>
        )}
      </div>
      <div>
        <input
          type="number"
          step="0.01"
          {...register("amount")}
          placeholder="Amount"
          className="task-datetime"
          style={{ width: 110 }}
        />
        {errors.amount && (
          <div className="habit-input-error">{errors.amount.message}</div>
        )}
      </div>
      <select {...register("category")} className="task-select">
        {EXPENSE_CATEGORIES.map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>
      <input type="date" {...register("date")} className="task-datetime" />
      <button type="submit" className="habit-add-btn" disabled={isSubmitting}>
        Add
      </button>
    </form>
  );
}
