import { useState } from "react";
import { Icon } from "@/components/common/IconSprite";
import { lastNDays, todayKey } from "@/features/habits/habitLogic";
import { useHealthStore } from "./healthStore";
import { WeekBars } from "./WeekBars";
import {
  averageThisWeek,
  bmiCategory,
  computeBmi,
  sortedWeightEntries,
} from "./healthLogic";

export function HealthPage() {
  const waterLog = useHealthStore((s) => s.waterLog);
  const waterGoal = useHealthStore((s) => s.waterGoal);
  const addWaterGlass = useHealthStore((s) => s.addWaterGlass);
  const removeWaterGlass = useHealthStore((s) => s.removeWaterGlass);
  const setWaterGoal = useHealthStore((s) => s.setWaterGoal);

  const sleepLog = useHealthStore((s) => s.sleepLog);
  const setSleepHours = useHealthStore((s) => s.setSleepHours);

  const weightLog = useHealthStore((s) => s.weightLog);
  const heightCm = useHealthStore((s) => s.heightCm);
  const setWeight = useHealthStore((s) => s.setWeight);
  const setHeight = useHealthStore((s) => s.setHeight);
  const removeWeightEntry = useHealthStore((s) => s.removeWeightEntry);

  const today = todayKey();
  const days = lastNDays(7);

  const [goalInput, setGoalInput] = useState(String(waterGoal));
  const [sleepInput, setSleepInput] = useState(String(sleepLog[today] ?? ""));
  const [weightInput, setWeightInput] = useState(
    String(weightLog[today] ?? ""),
  );
  const [heightInput, setHeightInput] = useState(String(heightCm || ""));

  const todayWater = waterLog[today] ?? 0;
  const avgSleep = averageThisWeek(sleepLog, days);
  const latestWeight = sortedWeightEntries(weightLog)[0]?.kg ?? 0;
  const bmi = computeBmi(latestWeight, heightCm);

  function saveGoal() {
    const v = Number(goalInput);
    if (v > 0) setWaterGoal(v);
  }
  function saveSleep() {
    const v = Number(sleepInput);
    if (!Number.isNaN(v) && v >= 0) setSleepHours(today, v);
  }
  function saveWeight() {
    const v = Number(weightInput);
    if (v > 0) setWeight(today, v);
  }
  function saveHeight() {
    const v = Number(heightInput);
    if (v > 0) setHeight(v);
  }

  return (
    <>
      <section className="hero" style={{ gridTemplateColumns: "1fr" }}>
        <div>
          <div className="hero-eyebrow">Chapters · Health</div>
          <h1 className="serif">
            Take care of <em>the vessel</em>.
          </h1>
          <p className="hero-quote">
            &ldquo;Take care of your body. It's the only place you have to
            live.&rdquo;
          </p>
        </div>
      </section>

      <div className="card" style={{ marginBottom: 20 }}>
        <div className="card-head">
          <div className="card-title">
            <Icon name="drop" />
            Water
          </div>
          <span className="card-sub">
            {todayWater} of {waterGoal} glasses
          </span>
        </div>
        <div className="progress-track" style={{ height: 8, marginBottom: 14 }}>
          <div
            className="progress-fill"
            style={{
              width: `${Math.min(100, Math.round((todayWater / waterGoal) * 100))}%`,
            }}
          />
        </div>
        <div className="reading-controls" style={{ marginBottom: 6 }}>
          <button
            className="calendar-today-btn"
            onClick={() => removeWaterGlass(today)}
          >
            − Glass
          </button>
          <button
            className="calendar-today-btn"
            onClick={() => addWaterGlass(today)}
          >
            + Glass
          </button>
          <input
            type="number"
            value={goalInput}
            onChange={(e) => setGoalInput(e.target.value)}
            className="task-datetime"
            style={{ width: 80 }}
          />
          <button className="calendar-today-btn" onClick={saveGoal}>
            Set goal
          </button>
        </div>
        <WeekBars data={waterLog} goal={waterGoal} />
      </div>

      <div className="card" style={{ marginBottom: 20 }}>
        <div className="card-head">
          <div className="card-title">
            <Icon name="moon" />
            Sleep
          </div>
          <span className="card-sub">Avg {avgSleep}h this week</span>
        </div>
        <div className="reading-controls" style={{ marginBottom: 6 }}>
          <input
            type="number"
            step="0.5"
            value={sleepInput}
            onChange={(e) => setSleepInput(e.target.value)}
            placeholder="Hours slept"
            className="task-datetime"
            style={{ width: 110 }}
          />
          <button className="calendar-today-btn" onClick={saveSleep}>
            Log last night
          </button>
        </div>
        <WeekBars data={sleepLog} goal={8} />
      </div>

      <div className="card">
        <div className="card-head">
          <div className="card-title">
            <Icon name="health" />
            Weight &amp; BMI
          </div>
          {bmi !== null && (
            <span className="card-sub">
              {bmi} · {bmiCategory(bmi)}
            </span>
          )}
        </div>

        <div
          className="reading-controls"
          style={{ marginBottom: 14, flexWrap: "wrap" }}
        >
          <input
            type="number"
            value={heightInput}
            onChange={(e) => setHeightInput(e.target.value)}
            placeholder="Height (cm)"
            className="task-datetime"
            style={{ width: 130 }}
          />
          <button className="calendar-today-btn" onClick={saveHeight}>
            Save height
          </button>
          <input
            type="number"
            step="0.1"
            value={weightInput}
            onChange={(e) => setWeightInput(e.target.value)}
            placeholder="Today's weight (kg)"
            className="task-datetime"
            style={{ width: 150 }}
          />
          <button className="calendar-today-btn" onClick={saveWeight}>
            Log weight
          </button>
        </div>

        {sortedWeightEntries(weightLog).length === 0 ? (
          <p style={{ color: "var(--text-muted)", fontSize: 13.5 }}>
            No weight logged yet.
          </p>
        ) : (
          <div>
            {sortedWeightEntries(weightLog).map((entry) => (
              <div className="dl-row" key={entry.date}>
                <span className="dl-date">{entry.date.slice(5)}</span>
                {entry.kg} kg
                <button
                  className="habit-remove"
                  style={{ marginLeft: "auto" }}
                  onClick={() => removeWeightEntry(entry.date)}
                  aria-label={`Remove weight entry from ${entry.date}`}
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
