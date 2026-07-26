import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import toast from "react-hot-toast";
import { useJournalStore } from "@/features/journal/journalStore";

const MOOD_OPTIONS = [
  "Calm",
  "Focused",
  "Grateful",
  "Excited",
  "Tired",
  "Anxious",
  "Restless",
  "Content",
];

const schema = z.object({
  text: z
    .string()
    .min(1, "Write at least a little something.")
    .max(2000, "Keep it under 2000 characters."),
});

type FormValues = z.infer<typeof schema>;

interface JournalEntryFormProps {
  dateKeyValue: string;
  initialText?: string;
  initialMoods?: string[];
}

export function JournalEntryForm({
  dateKeyValue,
  initialText = "",
  initialMoods = [],
}: JournalEntryFormProps) {
  const saveEntry = useJournalStore((s) => s.saveEntry);
  const [moods, setMoods] = useState<string[]>(initialMoods);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { text: initialText },
  });

  useEffect(() => {
    reset({ text: initialText });
    setMoods(initialMoods);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dateKeyValue]);

  function toggleMood(mood: string) {
    setMoods((prev) =>
      prev.includes(mood) ? prev.filter((m) => m !== mood) : [...prev, mood],
    );
  }

  function onSubmit(values: FormValues) {
    saveEntry(dateKeyValue, values.text.trim(), moods);
    toast.success("Entry saved");
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="journal-form">
      <textarea
        {...register("text")}
        placeholder="What happened today? What are you grateful for?"
        className="journal-textarea"
        rows={5}
      />
      {errors.text && (
        <div className="habit-input-error">{errors.text.message}</div>
      )}

      <div className="mood-picker">
        {MOOD_OPTIONS.map((mood) => (
          <button
            type="button"
            key={mood}
            className={`mood-pill mood-pill-btn${moods.includes(mood) ? " active" : ""}`}
            onClick={() => toggleMood(mood)}
          >
            {mood}
          </button>
        ))}
      </div>

      <button
        type="submit"
        className="habit-add-btn"
        disabled={isSubmitting}
        style={{ alignSelf: "flex-end" }}
      >
        Save entry
      </button>
    </form>
  );
}
