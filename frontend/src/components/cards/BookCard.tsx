import { Link } from "react-router-dom";
import { Icon } from "@/components/common/IconSprite";
import { useBooksStore } from "@/features/library/booksStore";
import { progressPercent } from "@/features/library/bookLogic";

export function BookCard() {
  const books = useBooksStore((s) => s.books);
  const current = books.find((b) => b.status === "reading");

  return (
    <div className="card col-4">
      <div className="card-head">
        <div className="card-title">
          <Icon name="book" />
          Currently Reading
        </div>
        <Link to="/library" className="link-more">
          Library
        </Link>
      </div>

      {current ? (
        <div className="book-wrap">
          <div className="book-cover">
            <span className="serif">{current.title}</span>
          </div>
          <div className="book-info">
            <div className="title serif">{current.title}</div>
            <div className="author">{current.author}</div>
            <div className="progress-track">
              <div
                className="progress-fill"
                style={{ width: `${progressPercent(current)}%` }}
              />
            </div>
            <div className="progress-label">
              Page {current.currentPage} of {current.totalPages} ·{" "}
              {progressPercent(current)}%
            </div>
          </div>
        </div>
      ) : (
        <p style={{ color: "var(--text-muted)", fontSize: 13.5 }}>
          Add a book you're currently reading.
        </p>
      )}
    </div>
  );
}
