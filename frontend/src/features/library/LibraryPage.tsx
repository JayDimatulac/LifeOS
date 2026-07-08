import { Icon } from "@/components/common/IconSprite";
import { AddBookForm } from "@/components/forms/AddBookForm";
import { useBooksStore } from "./booksStore";
import { progressPercent } from "./bookLogic";

export function LibraryPage() {
  const books = useBooksStore((s) => s.books);
  const updateProgress = useBooksStore((s) => s.updateProgress);
  const setStatus = useBooksStore((s) => s.setStatus);
  const removeBook = useBooksStore((s) => s.removeBook);

  const reading = books.filter((b) => b.status === "reading");
  const wishlist = books.filter((b) => b.status === "wishlist");
  const finished = books.filter((b) => b.status === "finished");

  return (
    <>
      <section className="hero" style={{ gridTemplateColumns: "1fr" }}>
        <div>
          <div className="hero-eyebrow">Chapters · Library</div>
          <h1 className="serif">
            A quiet room, <em>full of books</em>.
          </h1>
          <p className="hero-quote">
            &ldquo;A room without books is like a body without a soul.&rdquo;
          </p>
        </div>
      </section>

      <div className="card" style={{ marginBottom: 20 }}>
        <div className="card-head">
          <div className="card-title">
            <Icon name="book" />
            Add a book
          </div>
        </div>
        <AddBookForm />
      </div>

      <div className="card" style={{ marginBottom: 20 }}>
        <div className="card-head">
          <div className="card-title">
            <Icon name="book" />
            Currently Reading
          </div>
          <span className="card-sub">{reading.length}</span>
        </div>
        {reading.length === 0 ? (
          <p style={{ color: "var(--text-muted)", fontSize: 13.5 }}>
            Nothing in progress — add a book above.
          </p>
        ) : (
          <div className="reading-list">
            {reading.map((book) => {
              const percent = progressPercent(book);
              return (
                <div className="reading-row" key={book.id}>
                  <div className="book-cover book-cover-lg">
                    <span className="serif">{book.title}</span>
                  </div>
                  <div className="reading-info">
                    <div className="title serif">{book.title}</div>
                    <div className="author">{book.author}</div>
                    <div className="progress-track">
                      <div
                        className="progress-fill"
                        style={{ width: `${percent}%` }}
                      />
                    </div>
                    <div className="progress-label">
                      Page {book.currentPage} of {book.totalPages} · {percent}%
                    </div>
                    <div className="reading-controls">
                      <input
                        type="number"
                        min={0}
                        max={book.totalPages}
                        value={book.currentPage}
                        onChange={(e) =>
                          updateProgress(book.id, Number(e.target.value))
                        }
                        className="task-datetime"
                        style={{ width: 90 }}
                        aria-label={`Current page for ${book.title}`}
                      />
                      <button
                        className="calendar-today-btn"
                        onClick={() => setStatus(book.id, "finished")}
                      >
                        Mark finished
                      </button>
                      <button
                        className="habit-remove"
                        onClick={() => removeBook(book.id)}
                        aria-label={`Remove ${book.title}`}
                      >
                        ×
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <div className="card" style={{ marginBottom: 20 }}>
        <div className="card-head">
          <div className="card-title">
            <Icon name="book" />
            Wishlist
          </div>
          <span className="card-sub">{wishlist.length}</span>
        </div>
        {wishlist.length === 0 ? (
          <p style={{ color: "var(--text-muted)", fontSize: 13.5 }}>
            Nothing on the wishlist yet.
          </p>
        ) : (
          <div className="shelf-grid">
            {wishlist.map((book) => (
              <div className="shelf-item" key={book.id}>
                <div className="book-cover">
                  <span className="serif">{book.title}</span>
                </div>
                <div className="shelf-title">{book.title}</div>
                <div className="shelf-author">{book.author}</div>
                <div className="shelf-actions">
                  <button
                    className="calendar-today-btn"
                    onClick={() => setStatus(book.id, "reading")}
                  >
                    Start reading
                  </button>
                  <button
                    className="habit-remove"
                    onClick={() => removeBook(book.id)}
                    aria-label={`Remove ${book.title}`}
                  >
                    ×
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="card">
        <div className="card-head">
          <div className="card-title">
            <Icon name="book" />
            Finished
          </div>
          <span className="card-sub">{finished.length}</span>
        </div>
        {finished.length === 0 ? (
          <p style={{ color: "var(--text-muted)", fontSize: 13.5 }}>
            Nothing finished yet.
          </p>
        ) : (
          <div className="shelf-grid">
            {finished.map((book) => (
              <div className="shelf-item" key={book.id}>
                <div className="book-cover">
                  <span className="serif">{book.title}</span>
                </div>
                <div className="shelf-title">{book.title}</div>
                <div className="shelf-author">{book.author}</div>
                <div className="shelf-actions">
                  <button
                    className="habit-remove"
                    onClick={() => removeBook(book.id)}
                    aria-label={`Remove ${book.title}`}
                  >
                    ×
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
