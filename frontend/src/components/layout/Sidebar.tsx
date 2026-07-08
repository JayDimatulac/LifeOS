import { Icon } from '@/components/common/IconSprite';
import { NavItem } from '@/components/navigation/NavItem';
import { useThemeStore } from '@/stores/themeStore';

export function Sidebar() {
  const { sidebarCollapsed, toggleSidebar } = useThemeStore();

  return (
    <aside className={`sidebar${sidebarCollapsed ? ' collapsed' : ''}`}>
      <button className="side-toggle" onClick={toggleSidebar} aria-label="Toggle sidebar">
        <Icon name="chev" />
      </button>

      <div className="brand">
        <svg className="brand-mark" viewBox="0 0 34 34">
          <circle cx="17" cy="17" r="15.5" fill="none" stroke="#CBA057" strokeWidth="1" />
          <circle cx="17" cy="9" r="1.4" fill="#CBA057" />
          <circle cx="24" cy="14" r="1" fill="#8D96A8" />
          <circle cx="23" cy="23" r="1.4" fill="#CBA057" />
          <circle cx="12" cy="24" r="1" fill="#8D96A8" />
          <circle cx="9" cy="13" r="1.4" fill="#CBA057" />
          <path d="M17 9 24 14 23 23 12 24 9 13Z" fill="none" stroke="#CBA057" strokeWidth="0.6" opacity="0.6" />
        </svg>
        <div className="brand-text">
          <div className="t1 serif">LifeOS</div>
          <div className="t2">Personal Edition</div>
        </div>
      </div>

      <nav className="nav-group">
        <div className="nav-eyebrow">Today</div>
        <NavItem to="/" icon="home" label="Dashboard" />
        <NavItem to="/habits" icon="habit" label="Habits" />
        <NavItem to="/tasks" icon="task" label="Tasks" />
        <NavItem to="/calendar" icon="calendar" label="Calendar" />
      </nav>

      <nav className="nav-group">
        <div className="nav-eyebrow">Chapters</div>
        <NavItem to="/journal" icon="journal" label="Journal" />
        <NavItem to="/library" icon="book" label="Library" />
        <NavItem to="/adventures" icon="compass" label="Adventures" />
        <NavItem to="/finance" icon="finance" label="Finance" />
        <NavItem to="/health" icon="health" label="Health" />
      </nav>

      <nav className="nav-group">
        <div className="nav-eyebrow">System</div>
        <NavItem to="/analytics" icon="analytics" label="Analytics" />
        <NavItem to="/ai" icon="ai" label="Companion" />
        <NavItem to="/settings" icon="settings" label="Settings" />
      </nav>

      <div className="side-foot">
        <div className="side-avatar serif">K</div>
        <div className="side-foot-text">
          <div className="n">Kai Reyes</div>
          <div className="r">Day 1 of the journey</div>
        </div>
      </div>
    </aside>
  );
}
