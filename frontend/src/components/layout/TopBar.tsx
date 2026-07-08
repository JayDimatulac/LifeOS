import { Icon } from '@/components/common/IconSprite';
import { useThemeStore } from '@/stores/themeStore';

interface TopBarProps {
  breadcrumb: string;
}

export function TopBar({ breadcrumb }: TopBarProps) {
  const { theme, toggleTheme } = useThemeStore();

  return (
    <div className="topbar">
      <div className="breadcrumb">{breadcrumb}</div>
      <div className="top-actions">
        <button className="icon-btn" aria-label="Settings">
          <Icon name="settings" />
        </button>
        <button className="theme-switch" onClick={toggleTheme} aria-label="Toggle theme">
          <span className="knob">
            <Icon name={theme === 'dark' ? 'moon' : 'sun'} />
          </span>
        </button>
      </div>
    </div>
  );
}
