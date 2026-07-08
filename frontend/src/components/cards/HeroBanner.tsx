import { useEffect, useState } from 'react';
import { Icon } from '@/components/common/IconSprite';

interface HeroBannerProps {
  userName: string;
  chapterLabel: string;
  quote: string;
  weatherSummary: string;
  temperatureC: number;
  streakDays: number;
  tasksDoneRatio: string;
}

function useClock() {
  const [now, setNow] = useState(new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 30_000);
    return () => clearInterval(id);
  }, []);
  return now;
}

export function HeroBanner({
  userName,
  chapterLabel,
  quote,
  weatherSummary,
  temperatureC,
  streakDays,
  tasksDoneRatio,
}: HeroBannerProps) {
  const now = useClock();
  const hours = now.getHours();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  const displayHour = hours % 12 || 12;
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const days = ['SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY'];
  const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
  const dateLine = `${days[now.getDay()]} · ${months[now.getMonth()]} ${now.getDate()}`;
  const greeting = hours < 12 ? 'Good morning' : hours < 18 ? 'Good afternoon' : 'Good evening';

  return (
    <section className="hero">
      <div>
        <div className="hero-eyebrow">{chapterLabel}</div>
        <h1 className="serif">
          {greeting}, <em>{userName}</em>.<br />
          The page is yours.
        </h1>
        <p className="hero-quote">&ldquo;{quote}&rdquo;</p>
      </div>
      <div className="hero-meta">
        <div className="date-line mono">{dateLine}</div>
        <div className="clock serif">
          {displayHour}:{minutes}
          <span className="ampm">{ampm}</span>
        </div>
        <div className="meta-row">
          <div className="chip">
            <Icon name="cloud" />
            {weatherSummary} · <b>{temperatureC}°C</b>
          </div>
          <div className="chip">
            <Icon name="flame" />
            <b>{streakDays}</b>-day streak
          </div>
          <div className="chip">
            <Icon name="check" />
            <b>{tasksDoneRatio}</b> tasks done
          </div>
        </div>
      </div>
    </section>
  );
}
