import { Link } from 'react-router-dom';
import { Icon } from '@/components/common/IconSprite';
import { useJournalStore } from '@/features/journal/journalStore';
import { formatEntryDate, sortedEntries } from '@/features/journal/journalLogic';
import { dateKey } from '@/utils/date';

export function JournalCard() {
  const entries = useJournalStore((s) => s.entries);
  const today = dateKey(new Date());
  const todayEntry = entries[today];
  const latest = todayEntry ?? sortedEntries(entries)[0];

  return (
    <div className="card journal-card col-4">
      <div className="card-head">
        <div className="card-title">
          <Icon name="quill" />
          Journal
        </div>
        <Link to="/journal" className="link-more">
          Write
        </Link>
      </div>

      {latest ? (
        <>
          <div className="journal-date">{formatEntryDate(latest.date)}</div>
          <div className="journal-text">{latest.text}</div>
          {latest.moods.length > 0 && (
            <div className="mood-row">
              {latest.moods.map((m) => (
                <span key={m} className="mood-pill">
                  {m}
                </span>
              ))}
            </div>
          )}
        </>
      ) : (
        <p style={{ color: 'var(--text-muted)', fontSize: 13.5 }}>
          Nothing written yet — this is where your first entry will appear.
        </p>
      )}
    </div>
  );
}