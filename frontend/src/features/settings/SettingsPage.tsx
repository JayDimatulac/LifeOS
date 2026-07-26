import { useRef, useState, type ChangeEvent } from "react";
import { Icon } from "@/components/common/IconSprite";
import { useThemeStore } from "@/stores/themeStore";
import { useSettingsStore } from "./settingsStore";
import {
  downloadJson,
  exportAllData,
  importAllData,
  resetAllData,
} from "./settingsLogic";

export function SettingsPage() {
  const displayName = useSettingsStore((s) => s.displayName);
  const setDisplayName = useSettingsStore((s) => s.setDisplayName);
  const [nameInput, setNameInput] = useState(displayName);

  const { theme, toggleTheme } = useThemeStore();

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [importMessage, setImportMessage] = useState<string | null>(null);
  const [confirmingReset, setConfirmingReset] = useState(false);

  function saveName() {
    if (nameInput.trim()) setDisplayName(nameInput.trim());
  }

  function handleExport() {
    downloadJson(
      `lifeos-backup-${new Date().toISOString().slice(0, 10)}.json`,
      exportAllData(),
    );
  }

  function handleImportFile(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        importAllData(reader.result as string);
        setImportMessage("Imported successfully. Reloading…");
        setTimeout(() => window.location.reload(), 800);
      } catch {
        setImportMessage(
          "That file couldn't be read. Make sure it's a LifeOS export.",
        );
      }
    };
    reader.readAsText(file);
  }

  function handleReset() {
    if (!confirmingReset) {
      setConfirmingReset(true);
      return;
    }
    resetAllData();
    window.location.reload();
  }

  return (
    <>
      <section className="hero" style={{ gridTemplateColumns: "1fr" }}>
        <div>
          <div className="hero-eyebrow">System · Settings</div>
          <h1 className="serif">
            Make it <em>yours</em>.
          </h1>
          <p className="hero-quote">
            &ldquo;Simplicity is the ultimate sophistication.&rdquo;
          </p>
        </div>
      </section>

      <div className="card" style={{ marginBottom: 20 }}>
        <div className="card-head">
          <div className="card-title">
            <Icon name="settings" />
            Profile
          </div>
        </div>
        <div className="reading-controls">
          <input
            type="text"
            value={nameInput}
            onChange={(e) => setNameInput(e.target.value)}
            placeholder="Display name"
            className="habit-input"
            style={{ maxWidth: 240 }}
          />
          <button className="calendar-today-btn" onClick={saveName}>
            Save name
          </button>
        </div>
      </div>

      <div className="card" style={{ marginBottom: 20 }}>
        <div className="card-head">
          <div className="card-title">
            <Icon name="sun" />
            Appearance
          </div>
        </div>
        <div className="reading-controls">
          <span style={{ fontSize: 13.5, color: "var(--text-secondary)" }}>
            Currently in{" "}
            {theme === "dark" ? "Observatory (dark)" : "Daylight (light)"} mode
          </span>
          <button className="calendar-today-btn" onClick={toggleTheme}>
            Switch to {theme === "dark" ? "light" : "dark"}
          </button>
        </div>
      </div>

      <div className="card">
        <div className="card-head">
          <div className="card-title">
            <Icon name="settings" />
            Your Data
          </div>
        </div>
        <p
          style={{ color: "var(--text-muted)", fontSize: 13, marginBottom: 4 }}
        >
          Everything in LifeOS lives in this browser — nothing is sent anywhere.
          Back it up, move it to another browser, or start fresh.
        </p>

        <div className="settings-data-row">
          <div>
            <div className="settings-data-label">Export your data</div>
            <div className="settings-data-desc">
              Download a JSON file with every habit, task, entry, and log.
            </div>
          </div>
          <button className="calendar-today-btn" onClick={handleExport}>
            Export
          </button>
        </div>

        <div className="settings-data-row">
          <div>
            <div className="settings-data-label">Import a backup</div>
            <div className="settings-data-desc">
              Restore from a previously exported LifeOS file.
            </div>
          </div>
          <div>
            <button
              className="calendar-today-btn"
              onClick={() => fileInputRef.current?.click()}
            >
              Choose file
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="application/json"
              onChange={handleImportFile}
              className="book-cover-input"
            />
          </div>
        </div>
        {importMessage && (
          <p style={{ fontSize: 12, color: "var(--gold-soft)", marginTop: 8 }}>
            {importMessage}
          </p>
        )}

        <div className="settings-data-row settings-danger">
          <div>
            <div className="settings-data-label">Reset all data</div>
            <div className="settings-data-desc">
              Permanently erase everything and start from Day One.
            </div>
          </div>
          <button
            className={`settings-reset-btn${confirmingReset ? " confirming" : ""}`}
            onClick={handleReset}
          >
            {confirmingReset ? "Click again to confirm" : "Reset everything"}
          </button>
        </div>
      </div>
    </>
  );
}
