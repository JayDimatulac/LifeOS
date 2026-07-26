import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useAdventuresStore } from "@/features/adventures/adventuresStore";

const schema = z.object({
  name: z
    .string()
    .min(1, "Give it a name.")
    .max(100, "Keep it under 100 characters."),
  status: z.enum(["dream", "visited"]),
  notes: z.string().max(300, "Keep notes under 300 characters.").optional(),
});

type FormValues = z.infer<typeof schema>;

export function AddDestinationForm() {
  const addDestination = useAdventuresStore((s) => s.addDestination);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { status: "dream" },
  });

  function onSubmit(values: FormValues) {
    addDestination(
      values.name.trim(),
      values.status,
      values.notes?.trim() || undefined,
    );
    reset({ name: "", status: "dream", notes: "" });
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="book-form">
      <div className="habit-form-field task-form-title">
        <input
          {...register("name")}
          placeholder="Where to?"
          className="habit-input"
          autoComplete="off"
        />
        {errors.name && (
          <div className="habit-input-error">{errors.name.message}</div>
        )}
      </div>
      <select {...register("status")} className="task-select">
        <option value="dream">Dream destination</option>
        <option value="visited">Already visited</option>
      </select>
      <div className="habit-form-field task-form-title">
        <input
          {...register("notes")}
          placeholder="A note (optional)"
          className="habit-input"
          autoComplete="off"
        />
      </div>
      <button type="submit" className="habit-add-btn" disabled={isSubmitting}>
        Add
      </button>
    </form>
  );
}
