import { useMemo } from "react";
import { Icon } from "@/components/common/IconSprite";
import { JournalEntryForm } from "@/components/forms/JournalEntryForm";
import { dateKey } from "@/utils/date";
import { useJournalStore } from "./journalStore";
import { formatEntryDate, sortedEntries } from "./journalLogic";

export function JournalPage() {
  const entries = useJournalStore((s) => s.entries);
  const deleteEntry = useJournalStore((s) => s.deleteEntry);

  const today = useMemo(() => dateKey(new Date()), []);
  const todayEntry = entries[today];
  const past = sortedEntries(entries).filter((e) => e.date !== today);

  return (
    <>
      <section className="hero" style={{ gridTemplateColumns: "1fr" }}>
        <div>
          <div className="hero-eyebrow">Chapters · Journal</div>
          <h1 className="serif">
            Write it down <em>before it fades</em>.
          </h1>
          <p className="hero-quote">
            &ldquo;We write to taste life twice, in the moment and in
            retrospect.&rdquo;
          </p>
        </div>
      </section>

      <div className="card journal-card" style={{ marginBottom: 20 }}>
        <div className="card-head">
          <div className="card-title">
            <Icon name="quill" />
            Today's Entry
          </div>
          <span className="journal-date">{formatEntryDate(today)}</span>
        </div>
        <JournalEntryForm
          dateKeyValue={today}
          initialText={todayEntry?.text}
          initialMoods={todayEntry?.moods}
        />
      </div>

      <div className="card">
        <div className="card-head">
          <div className="card-title">
            <Icon name="journal" />
            Past Entries
          </div>
          <span className="card-sub">
            {past.length} {past.length === 1 ? "entry" : "entries"}
          </span>
        </div>

        {past.length === 0 ? (
          <p style={{ color: "var(--text-muted)", fontSize: 13.5 }}>
            Your written days will appear here.
          </p>
        ) : (
          <div className="journal-entry-list">
            {past.map((entry) => (
              <div className="journal-entry-row" key={entry.date}>
                <div className="journal-entry-head">
                  <span className="journal-date">
                    {formatEntryDate(entry.date)}
                  </span>
                  <button
                    className="habit-remove"
                    onClick={() => deleteEntry(entry.date)}
                    aria-label={`Delete entry from ${formatEntryDate(entry.date)}`}
                  >
                    ×
                  </button>
                </div>
                <p className="journal-text">{entry.text}</p>
                {entry.moods.length > 0 && (
                  <div className="mood-row">
                    {entry.moods.map((m) => (
                      <span key={m} className="mood-pill">
                        {m}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
