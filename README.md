<div align="center">

# LifeOS

**A Personal Operating System.**

*Every day is a page. Every goal is a chapter. Every setback is simply another data point.*

![TypeScript](https://img.shields.io/badge/TypeScript-1B2A4A?style=for-the-badge&logo=typescript&logoColor=E8DCC4)
![React](https://img.shields.io/badge/React-1B2A4A?style=for-the-badge&logo=react&logoColor=C9A34E)
![Node.js](https://img.shields.io/badge/Node.js-1B2A4A?style=for-the-badge&logo=nodedotjs&logoColor=E8DCC4)
![SQLite](https://img.shields.io/badge/SQLite-1B2A4A?style=for-the-badge&logo=sqlite&logoColor=C9A34E)
![Tailwind](https://img.shields.io/badge/Tailwind-1B2A4A?style=for-the-badge&logo=tailwindcss&logoColor=6E2A3A)
![Vite](https://img.shields.io/badge/Vite-1B2A4A?style=for-the-badge&logo=vite&logoColor=E8DCC4)
![Zustand](https://img.shields.io/badge/Zustand-1B2A4A?style=for-the-badge&logoColor=E8DCC4)
![License](https://img.shields.io/badge/License-Private-1B2A4A?style=for-the-badge&logoColor=C9A34E)

**◈ ───────────────────────────────────────────── ◈**

</div>

<br>

LifeOS is a full-stack personal life management app with a **"quiet luxury / observatory night-sky"** design language — deep navy and soft gold, Fraunces serif headings, a signature Life Constellation chart, and ten connected modules that all share real, live data instead of feeling like ten separate disconnected tools.

It's built as a genuinely usable daily app, not a demo: habits carry real streaks, the calendar lets you time-travel back through your own history, and your data lives entirely in your own browser unless and until you choose to run the backend.

Most software asks what you're going to do today. LifeOS asks who you're becoming, and quietly keeps the receipts.

<br>

## Table of Contents

* [Philosophy](#philosophy)
* [The Shape of the System](#the-shape-of-the-system)
* [Modules](#modules)
* [Life Constellation](#life-constellation)
* [AI Companion](#ai-companion)
* [Rituals](#rituals)
* [Design Language](#design-language)
* [Architecture](#architecture)
* [Tech Stack](#tech-stack)
* [Getting Started](#getting-started)
* [Project Structure](#project-structure)
* [Data & Privacy](#data--privacy)
* [Roadmap](#roadmap)
* [FAQ](#faq)
* [License](#license)

<br>

## Philosophy

Most productivity apps assume your life is a backlog. LifeOS assumes your life is a story, and treats every day as a page in it.

That shows up as a few quiet rules the whole app follows, without exception:

- **A habit is a vote, not a task.** Missing one day doesn't break a streak — it's just a data point. The app never shames, guilt-trips, or nags; it just keeps an honest record, the way a good friend would.
- **Nothing lives in isolation.** Complete a habit and your dashboard, calendar, analytics, and Life Constellation all update from the same underlying fact. There is one source of truth — everything else is a *view* onto it, never a copy of it.
- **Calm is a feature, not a vibe.** If a screen adds anxiety instead of removing it, it doesn't ship, no matter how useful it seems on paper. Whitespace, silence, and restraint are treated as seriously as any button or chart.
- **You own it.** No ads, no engagement metrics, no server that gets to decide when you lose access to your own history.

If a feature can't survive the question *"does this make the user's life feel calmer, or just fuller?"* — it doesn't belong in LifeOS.

<br>

## The Shape of the System

LifeOS is not ten screens stitched together. It's one nervous system with many senses, all reporting into the same place.

```
                                ╭───────────────────────╮
                                │   Life Constellation   │
                                │  (every star is a fact) │
                                ╰───────────┬───────────╯
                                            │
                     ╭──────────────────────┼──────────────────────╮
                     │                      │                      │
              ╭──────┴──────╮       ╭───────┴───────╮       ╭──────┴──────╮
              │   Habits    │       │  AI Companion  │       │  Analytics  │
              │ (a vote,    │◄──────┤   (notices,    ├──────►│ (the shape  │
              │ cast daily) │       │   never nags)  │       │  of you,    │
              ╰──────┬──────╯       ╰───────┬───────╯       │  over time) │
                     │                      │                ╰──────┬──────╯
                     ▼                      ▼                       ▼
              ╭─────────────────────────────────────────────────────────╮
              │   Calendar · Journal · Finance · Health · Library ·      │
              │           Tasks · Adventures                            │
              ╰─────────────────────────────────────┬───────────────────╯
                                                      │
                                                      ▼
                                            ╭───────────────────╮
                                            │  Today's Dashboard │
                                            │   (where you land) │
                                            ╰───────────────────╯
```

Touch one star and the whole sky shifts. Nothing is asked for twice. Nothing updates on its own schedule — everything updates because something true just happened.

<br>

## Modules

| Module | What it's for | Feeds |
|---|---|---|
| 🌅 **Dashboard** | Today, at a glance — priorities, momentum, and what actually matters right now | reads from everything |
| ✓ **Habits** | Daily practices tracked as honest streaks, not guilt trips | Constellation, Analytics, AI Companion |
| 📅 **Calendar** | A living timeline you can walk back through, not just a scheduler | Dashboard, Journal |
| ☑ **Tasks** | The short-lived, concrete things that need doing today | Dashboard, Calendar |
| 📖 **Journal** | Morning and evening reflection, in your own words | AI Companion, Analytics |
| 💰 **Finance** | A quiet, judgment-free view of where things stand | Dashboard, Analytics |
| 🫀 **Health** | Sleep, movement, and the physical side of the pattern | Habits, Analytics |
| 📚 **Library** | What you're reading, watching, and learning | Journal, Constellation |
| 🧭 **Adventures** | The travel, experiences, and memories worth keeping | Constellation, Journal |
| 📊 **Analytics** | The shape of you over time — trends, not just totals | reads from everything |

Every module speaks the same underlying language of *events* — a habit completed, an entry written, a task closed — so nothing has to be manually kept in sync. Sync isn't a feature LifeOS has. It's a problem LifeOS refuses to have.

<br>

## Life Constellation

The most distinctive surface in LifeOS: your habits, goals, and milestones rendered as a living night sky, unique to you.

- Every consistent habit becomes a **star** — the longer the streak, the brighter it burns.
- Related efforts (a habit that supports a goal, a goal that belongs to a season of your life) are drawn together as **constellations**, not scattered as unrelated icons.
- Time moves the sky. Looking back at last year doesn't show you a spreadsheet of old rows — it shows you the sky as it actually looked then.
- Nothing is invented to make the chart *look* impressive. An empty sky is an honest sky, and LifeOS would rather show you that than fake a constellation you haven't earned.

It exists because "88% habit completion" is a statistic, and a sky slowly filling with light is a feeling — and LifeOS is emotional software before it's anything else.

<br>

## AI Companion

The Companion is not a chatbot bolted onto a productivity app. It's a quiet presence with one job: **notice, and reflect, gently.**

What it does:
- Observes patterns across modules — a habit that tends to slip on weekends, a journal mood that shifts after poor sleep, a spending pattern the week before a big goal.
- Celebrates consistency in specific, earned language — never generic praise, never a canned "Great job! 🎉"
- Surfaces a single, quiet observation at a time, usually on the Dashboard or in the Evening Reflection ritual — never as a popup, never as a red badge.

What it will never do:
- Lecture. Nag. Guilt-trip. Gamify your shame.
- Interrupt you mid-task with a "check-in."
- Pretend to know more about you than the data actually supports.

If the Companion ever starts to feel like ChatGPT wearing a LifeOS skin, that's a bug, not a feature.

<br>

## Rituals

LifeOS doesn't have "sessions." It has rituals — small, expected returns at the edges of the day and the year.

| Ritual | When | What happens |
|---|---|---|
| **Morning** | On first open each day | A greeting, today's priorities, and a glance at momentum — nothing more |
| **Evening Reflection** | End of day | A few gentle prompts, and the Companion's one observation, if it has one |
| **Weekly Reset** | Sunday (configurable) | A calm look back, and space to set intention for the week ahead |
| **Monthly Review** | First of the month | Analytics surfaces the shape of the month, not just the totals |
| **Yearly Evolution** | Your chosen date | The Constellation replays the year, star by star |

<br>

## Design Language

LifeOS looks the way it does on purpose — closer to a leather journal inside an observatory than a SaaS dashboard.

**Palette**

`#1B2A4A` Deep Navy · `#E8DCC4` Warm Cream · `#C9A34E` Soft Gold · `#6E2A3A` Muted Burgundy

**Typography**
- **Fraunces** — serif, for headings and moments that matter
- **Inter** — sans-serif, for everything functional
- **IBM Plex Mono** — for numbers, dates, and anything that shouldn't be interpreted, only read

**Motion**
Subtle, slow, and purposeful. Nothing bounces, flashes, or competes for attention. Animation exists to confirm an action, never to decorate one — 200–400ms eases, never a spring that overshoots.

**Influences, honestly named**
Apple Human Interface Guidelines · Linear · Raycast · Arc Browser · Japanese minimalism · museum-quality editorial typography — and deliberately *not* cyberpunk, glassmorphism, gamified dashboards, or startup-neon.

<br>

## Architecture

LifeOS follows Clean Architecture with a strict one-way dependency rule: **UI depends on domain, never the reverse.**

```
┌─────────────────────────────────────────────┐
│                 Presentation                 │  React components, screens, the Constellation renderer
├─────────────────────────────────────────────┤
│                  Application                 │  Use cases: CompleteHabit, WriteJournalEntry, ...
├─────────────────────────────────────────────┤
│                    Domain                    │  Entities, value objects, business rules — framework-free
├─────────────────────────────────────────────┤
│                 Infrastructure                │  Local storage adapter, SQLite adapter, sync (optional)
└─────────────────────────────────────────────┘
```

- **One source of truth.** Domain events (`HabitCompleted`, `JournalEntryWritten`) are the only way state changes; every module subscribes rather than mutating shared state directly.
- **CQRS where it earns its keep** — reads for Analytics and the Constellation are denormalized projections, kept separate from the write path that owns the real data.
- **Local-first by construction.** The domain and application layers never assume a network exists. The optional backend is an adapter, not a dependency.

<br>

## Tech Stack

- **React + TypeScript** — component architecture, strong typing end to end
- **Vite** — build tooling and dev server
- **Tailwind CSS** — utility-first styling, constrained to the LifeOS design tokens
- **Zustand** — small, explicit state management for cross-module reactivity
- **SQLite** — local, embedded storage for the optional backend
- **Node.js** — backend runtime, required only for sync and backup

<br>

## Getting Started

```bash
# clone the repository
git clone https://github.com/<your-username>/lifeos.git
cd lifeos

# install dependencies
npm install

# run the app locally
npm run dev
```

The app runs entirely in your browser by default — no backend or account required. Running the optional Node/SQLite backend enables backups and cross-device sync.

<br>

## Project Structure

```
lifeos/
├── src/
│   ├── domain/           # entities, value objects, domain events — no framework code
│   ├── application/      # use cases (CompleteHabit, WriteJournalEntry, ...)
│   ├── infrastructure/   # storage adapters: local, SQLite, sync
│   ├── modules/          # dashboard/ habits/ calendar/ journal/ finance/ health/ ...
│   ├── constellation/    # Life Constellation rendering + layout engine
│   ├── companion/        # AI Companion pattern-detection and reflections
│   └── design-system/    # tokens, typography, motion primitives
├── server/                # optional Node/SQLite sync backend
└── README.md
```

<br>

## Data & Privacy

- **Local-first.** Your data lives in your browser (or your own database, if you run the backend) — not on someone else's server by default.
- **No ads. No tracking. No analytics sold anywhere.** LifeOS doesn't have a business model that depends on your attention.
- **You own it.** Export your full history at any time, in an open format, no questions asked.

<br>

## Roadmap

- [ ] Mobile companion app (same local-first model, native feel)
- [ ] Desktop app (menu-bar quick-log, no browser tab required)
- [ ] End-to-end encrypted cloud sync (opt-in, never required)
- [ ] Deeper Companion pattern recognition (cross-module, longer time horizons)
- [ ] Yearly "Evolution" cinematic replay of your Constellation

<br>

## FAQ

**Is my data sent anywhere?**
Not unless you turn on sync. By default, everything stays in your browser.

**Can I lose my streaks by missing a day?**
No. A missed day is recorded honestly — it is never erased, punished, or hidden.

**Why isn't there a points/XP system?**
Because gamifying a life turns growth into a scoreboard. LifeOS measures consistency, not score.

<br>

## License

Private — all rights reserved. This project is not currently open for external contributions or redistribution.

<br>

<div align="center">

**◈ ───────────────────────────────────────────── ◈**

*Built quietly. Meant to last.*

</div>
