import { useRef, useState, type ChangeEvent, type KeyboardEvent } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useBooksStore } from "@/features/library/booksStore";

const schema = z.object({
  title: z
    .string()
    .min(1, "Title is required.")
    .max(150, "Keep it under 150 characters."),
  author: z.string().max(120, "Keep it under 120 characters.").optional(),
  totalPages: z.coerce
    .number()
    .int()
    .min(1, "Must be at least 1 page.")
    .max(10000, "That seems too long."),
  status: z.enum(["reading", "wishlist", "finished"]),
});

type FormValues = z.infer<typeof schema>;

export function AddBookForm() {
  const addBook = useBooksStore((s) => s.addBook);
  const [coverImage, setCoverImage] = useState<string | null>(null);
  const [showUrlField, setShowUrlField] = useState(false);
  const [urlValue, setUrlValue] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { status: "reading", totalPages: 300 },
  });

  function handleCoverChange(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setCoverImage(reader.result as string);
    reader.readAsDataURL(file);
  }

  function submitUrl() {
    const trimmed = urlValue.trim();
    if (trimmed) {
      setCoverImage(trimmed);
      setUrlValue("");
      setShowUrlField(false);
    }
  }

  function handleUrlKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      e.preventDefault();
      submitUrl();
    }
    if (e.key === "Escape") {
      setShowUrlField(false);
      setUrlValue("");
    }
  }

  function onSubmit(values: FormValues) {
    addBook(
      values.title.trim(),
      (values.author ?? "").trim() || "Unknown",
      values.totalPages,
      values.status,
      coverImage ?? undefined,
    );
    reset({ title: "", author: "", totalPages: 300, status: "reading" });
    setCoverImage(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="book-form">
      <div className="habit-form-field task-form-title">
        <input
          {...register("title")}
          placeholder="Book title"
          className="habit-input"
          autoComplete="off"
        />
        {errors.title && (
          <div className="habit-input-error">{errors.title.message}</div>
        )}
      </div>
      <div className="habit-form-field task-form-title">
        <input
          {...register("author")}
          placeholder="Author (optional)"
          className="habit-input"
          autoComplete="off"
        />
      </div>
      <div>
        <input
          type="number"
          {...register("totalPages")}
          placeholder="Pages"
          className="task-datetime"
          style={{ width: 90 }}
        />
        {errors.totalPages && (
          <div className="habit-input-error">{errors.totalPages.message}</div>
        )}
      </div>
      <select {...register("status")} className="task-select">
        <option value="reading">Reading</option>
        <option value="wishlist">Wishlist</option>
        <option value="finished">Finished</option>
      </select>

      <div className="book-cover-picker">
        <label className="book-cover-picker-btn">
          {coverImage ? "Change cover" : "Add cover"}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleCoverChange}
            className="book-cover-input"
          />
        </label>

        {showUrlField ? (
          <div className="cover-url-row">
            <input
              type="url"
              value={urlValue}
              onChange={(e) => setUrlValue(e.target.value)}
              onKeyDown={handleUrlKeyDown}
              placeholder="Paste image URL…"
              className="cover-url-input"
              autoFocus
            />
            <button
              type="button"
              className="cover-url-save"
              onClick={submitUrl}
              aria-label="Save cover URL"
            >
              ✓
            </button>
          </div>
        ) : (
          <button
            type="button"
            className="cover-url-toggle"
            onClick={() => setShowUrlField(true)}
          >
            or paste a URL
          </button>
        )}

        {coverImage && (
          <img
            src={coverImage}
            alt="Cover preview"
            className="book-cover-preview"
          />
        )}
      </div>

      <button type="submit" className="habit-add-btn" disabled={isSubmitting}>
        Add
      </button>
    </form>
  );
}