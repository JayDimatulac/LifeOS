<div align="center">

# LifeOS

**A Personal Operating System.**

*Every day is a page. Every goal is a chapter.*

![TypeScript](https://img.shields.io/badge/TypeScript-1B2A4A?style=for-the-badge&logo=typescript&logoColor=E8DCC4)
![React](https://img.shields.io/badge/React-1B2A4A?style=for-the-badge&logo=react&logoColor=C9A34E)
![Node.js](https://img.shields.io/badge/Node.js-1B2A4A?style=for-the-badge&logo=nodedotjs&logoColor=E8DCC4)
![SQLite](https://img.shields.io/badge/SQLite-1B2A4A?style=for-the-badge&logo=sqlite&logoColor=C9A34E)
![Tailwind](https://img.shields.io/badge/Tailwind-1B2A4A?style=for-the-badge&logo=tailwindcss&logoColor=6E2A3A)
![Vite](https://img.shields.io/badge/Vite-1B2A4A?style=for-the-badge&logo=vite&logoColor=E8DCC4)
![License](https://img.shields.io/badge/License-Private-1B2A4A?style=for-the-badge&logoColor=C9A34E)

</div>

LifeOS is a full-stack personal life management app with a "quiet luxury / observatory night-sky" design language — deep navy and soft gold, Fraunces serif headings, a signature Life Constellation chart, and ten connected modules that all share real, live data instead of feeling like ten separate disconnected tools.

It's built as a genuinely usable daily app, not a demo: habits carry real streaks, the calendar lets you time-travel back through your own history, and your data lives entirely in your own browser unless and until you choose to run the backend.

## Table of Contents

* [Philosophy](#philosophy)
* [Modules](#modules)
* [Design Language](#design-language)
* [Tech Stack](#tech-stack)
* [Getting Started](#getting-started)
* [Data & Privacy](#data--privacy)
* [License](#license)

<br>

## Philosophy

Most productivity apps assume your life is a backlog. LifeOS assumes your life is a story, and treats every day as a page in it.

That shows up as three quiet rules the whole app follows:

- **A habit is a vote, not a task.** Missing one day doesn't break a streak — it's just a data point. The app never shames, guilt-trips, or nags; it just keeps an honest record.
- **Nothing lives in isolation.** Complete a habit and your dashboard, calendar, analytics, and Life Constellation all update from the same underlying fact. There's one source of truth — everything else is a view onto it.
- **Calm is a feature.** If a screen adds anxiety instead of removing it, it doesn't ship. Whitespace, silence, and restraint are treated as seriously as any button or chart.

## Modules

LifeOS is organized as ten modules that read and write the same underlying data:

| Module | What it's for |
|---|---|
| **Dashboard** | Today, at a glance — priorities, momentum, and what matters right now |
| **Habits** | Daily practices tracked as honest streaks, not guilt trips |
| **Calendar** | A living timeline you can walk back through, not just a scheduler |
| **Tasks** | The short-lived, concrete things that need doing |
| **Journal** | Morning and evening reflection, in your own words |
| **Finance** | A quiet, judgment-free view of where things stand |
| **Health** | Sleep, movement, and the physical side of the pattern |
| **Library** | What you're reading, watching, and learning |
| **Adventures** | The travel, experiences, and memories worth keeping |
| **Analytics** | The shape of you over time — trends, not just totals |

Two features sit above the modules and connect them:

- **Life Constellation** — a night-sky visualization where every habit, goal, and milestone becomes a star; consistency is what makes the sky brighter over time.
- **AI Companion** — a quiet presence that notices patterns and reflects them back, gently. It never lectures, nags, or guilt-trips — it observes, and occasionally says something worth hearing.

## Design Language

LifeOS looks the way it does on purpose — closer to a leather journal in an observatory than a SaaS dashboard.

**Palette**
`Deep Navy` `Warm Cream` `Soft Gold` `Muted Burgundy`

**Typography**
- **Fraunces** — serif, for headings and moments that matter
- **Inter** — sans-serif, for everything functional
- **IBM Plex Mono** — for numbers, dates, and anything that shouldn't be interpreted, only read

**Motion**
Subtle, slow, and purposeful. Nothing bounces, flashes, or competes for attention — animation is used to confirm an action, never to decorate one.

## Tech Stack

- **React + TypeScript** — component architecture, strong typing throughout
- **Vite** — build tooling and dev server
- **Tailwind CSS** — utility-first styling, constrained to the LifeOS design tokens
- **SQLite** — local, embedded storage for the optional backend
- **Node.js** — backend runtime, only required for sync and backup

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

## Data & Privacy

- **Local-first.** Your data lives in your browser (or your own database, if you run the backend) — not on someone else's server by default.
- **No ads. No tracking. No analytics sold anywhere.** LifeOS doesn't have a business model that depends on your attention.
- **You own it.** Export your data at any time, in full, in an open format.

## License

Private — all rights reserved. This project is not currently open for external contributions or redistribution.
