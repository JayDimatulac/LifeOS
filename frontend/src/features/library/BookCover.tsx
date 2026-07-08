import { useState, type ChangeEvent, type KeyboardEvent } from "react";
import type { LibraryBook } from "./types";

interface BookCoverProps {
  book: LibraryBook;
  size?: "sm" | "lg";
  onChangeCover: (url: string) => void;
}

/**
 * Renders the cover image if present, otherwise the title-on-spine placeholder.
 * Click the cover to upload a file, or use "paste a URL" for a remote image link.
 * Either path just calls onChangeCover with a string — a data URL from a file,
 * or the URL itself — the store doesn't care which.
 */
export function BookCover({
  book,
  size = "sm",
  onChangeCover,
}: BookCoverProps) {
  const inputId = `cover-${book.id}`;
  const [showUrlField, setShowUrlField] = useState(false);
  const [urlValue, setUrlValue] = useState("");

  function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => onChangeCover(reader.result as string);
    reader.readAsDataURL(file);
  }

  function submitUrl() {
    const trimmed = urlValue.trim();
    if (trimmed) {
      onChangeCover(trimmed);
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

  return (
    <div className="book-cover-block">
      <label
        htmlFor={inputId}
        className={`book-cover book-cover-upload${size === "lg" ? " book-cover-lg" : ""}${
          book.coverImage ? " has-image" : ""
        }`}
      >
        {book.coverImage ? (
          <img src={book.coverImage} alt={`Cover of ${book.title}`} />
        ) : (
          <span className="serif">{book.title}</span>
        )}
        <span className="book-cover-edit-hint">
          {book.coverImage ? "Change cover" : "Add cover"}
        </span>
        <input
          id={inputId}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
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
    </div>
  );
}
