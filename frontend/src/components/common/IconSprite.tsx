/**
 * IconSprite
 * Renders once at the app root. Defines every custom thin-line icon used
 * across LifeOS as an SVG <symbol>, referenced elsewhere via <Icon name="..." />.
 * Keeping icons as hand-drawn symbols (rather than a third-party icon font)
 * keeps the "quiet luxury" line weight consistent everywhere.
 */
export function IconSprite() {
  return (
    <svg style={{ display: 'none' }} aria-hidden="true">
      <symbol id="i-home" viewBox="0 0 24 24">
        <path d="M4 11.5 12 4l8 7.5M6 10v9a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1v-9" />
      </symbol>
      <symbol id="i-habit" viewBox="0 0 24 24">
        <path d="M12 3c2 3-1 4-1 7a4 4 0 1 0 8 0c0-1-.5-2-1-3 1 4-1 5-2 5 1-3-1-5-4-9Z" />
      </symbol>
      <symbol id="i-task" viewBox="0 0 24 24">
        <path d="M9 11l2 2 4-4" />
        <rect x="4" y="4" width="16" height="16" rx="4" />
      </symbol>
      <symbol id="i-calendar" viewBox="0 0 24 24">
        <rect x="4" y="5" width="16" height="15" rx="2" />
        <path d="M4 9.5h16M8 3v4M16 3v4" />
      </symbol>
      <symbol id="i-journal" viewBox="0 0 24 24">
        <path d="M6 4h11a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H8a2 2 0 0 1-2-2V4Z" />
        <path d="M6 4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2" />
        <path d="M9 9h6M9 12.5h6" />
      </symbol>
      <symbol id="i-book" viewBox="0 0 24 24">
        <path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H13v18H6.5A2.5 2.5 0 0 1 4 18.5Z" />
        <path d="M13 3h4.5A2.5 2.5 0 0 1 20 5.5v13a2.5 2.5 0 0 1-2.5 2.5H13" />
      </symbol>
      <symbol id="i-compass" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="8.5" />
        <path d="M14.8 9.2 13 13l-3.8 1.8L11 11Z" />
      </symbol>
      <symbol id="i-finance" viewBox="0 0 24 24">
        <path d="M4 18V9M9 18v-6M14 18v-9M19 18V6" />
      </symbol>
      <symbol id="i-health" viewBox="0 0 24 24">
        <path d="M12 20s-7-4.6-9.3-9C1 7.6 3 4 6.5 4c2 0 3.2 1.1 3.9 2 .7-.9 1.9-2 3.9-2 3.5 0 5.5 3.6 3.8 7-2.3 4.4-9.3 9-9.3 9Z" />
      </symbol>
      <symbol id="i-analytics" viewBox="0 0 24 24">
        <path d="M4 20V10M11 20V4M18 20v-7" />
      </symbol>
      <symbol id="i-settings" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="3" />
        <path d="M12 2v3M12 19v3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M2 12h3M19 12h3M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1" />
      </symbol>
      <symbol id="i-ai" viewBox="0 0 24 24">
        <path d="M12 3l1.6 5.4L19 10l-5.4 1.6L12 17l-1.6-5.4L5 10l5.4-1.6Z" />
      </symbol>
      <symbol id="i-sun" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
      </symbol>
      <symbol id="i-moon" viewBox="0 0 24 24">
        <path d="M20 14.5A8.5 8.5 0 1 1 9.5 4a6.8 6.8 0 0 0 10.5 10.5Z" />
      </symbol>
      <symbol id="i-cloud" viewBox="0 0 24 24">
        <path d="M7 18h10a4 4 0 0 0 .5-8 5.5 5.5 0 0 0-10.6 1.7A3.5 3.5 0 0 0 7 18Z" />
      </symbol>
      <symbol id="i-flame" viewBox="0 0 24 24">
        <path d="M12 2c1 4-3 5-3 9a3 3 0 1 0 6 0c0-1-.3-1.7-.7-2.3 1 3-.5 3.8-1.3 3.8 1-2-1-3.5-1-10.5Z" />
      </symbol>
      <symbol id="i-drop" viewBox="0 0 24 24">
        <path d="M12 3s6 7 6 11a6 6 0 1 1-12 0c0-4 6-11 6-11Z" />
      </symbol>
      <symbol id="i-check" viewBox="0 0 24 24">
        <path d="M5 12l4 4 10-10" />
      </symbol>
      <symbol id="i-chev" viewBox="0 0 24 24">
        <path d="M15 5l-7 7 7 7" />
      </symbol>
      <symbol id="i-quill" viewBox="0 0 24 24">
        <path d="M20 4c-6 0-13 4-15 12l3-1c8-1 12-6 12-11Z" />
        <path d="M5 19l3-3" />
      </symbol>
    </svg>
  );
}

export type IconName =
  | 'home' | 'habit' | 'task' | 'calendar' | 'journal' | 'book' | 'compass'
  | 'finance' | 'health' | 'analytics' | 'settings' | 'ai' | 'sun' | 'moon'
  | 'cloud' | 'flame' | 'drop' | 'check' | 'chev' | 'quill';

export function Icon({ name, className = 'icon' }: { name: IconName; className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24">
      <use href={`#i-${name}`} />
    </svg>
  );
}
