# LifeOS

**A Personal Operating System.**
*Every day is a page. Every goal is a chapter.*

LifeOS is a full-stack personal life management app with a "quiet luxury / observatory night-sky" design language — deep navy and soft gold, Fraunces serif headings, a signature Life Constellation chart, and ten connected modules that all share real, live data instead of feeling like ten separate disconnected tools.

It's built as a genuinely usable daily app, not a demo: habits carry real streaks, the calendar lets you time-travel back through your own history, and your data lives entirely in your own browser unless and until you choose to run the backend.

---

## Table of Contents

- [Philosophy](#philosophy)
- [Modules](#modules)
- [Design System](#design-system)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Data & Privacy](#data--privacy)
- [Backend](#backend)
- [Roadmap](#roadmap)
- [Documentation](#documentation)
- [License](#license)

---

## Philosophy

LifeOS is built around one idea: productivity software doesn't have to feel like a spreadsheet. It can feel like keeping a beautifully made journal — calm, unhurried, and personal.

A few principles guide every screen:

- **Every module is real, not decorative.** Nothing on the Dashboard is hardcoded demo data — every stat tile, every card, every chart reads from the same live stores the full pages use. Check off a habit on the Dashboard and it's checked on `/habits` too, instantly.
- **Zero-state, not fake data.** A brand-new install starts genuinely empty — Day One, zero streaks, no pre-filled demo content — the way a real personal app should.
- **One shared source of truth per domain.** Habits, Tasks, Journal, Library, Adventures, Finance, and Health each own a single Zustand store. The Dashboard, the Calendar, and Analytics all read from those same stores rather than maintaining their own copies.
- **Local-first.** Everything currently lives in your browser's `localStorage`. Nothing is sent anywhere. You can export a full backup, move it to another browser, or wipe it and start over, all from Settings.

---

## Modules

| Module | What it does |
|---|---|
| **Dashboard** | The daily control center — hero greeting with a live clock, real streak, real task ratio, the Life Constellation chart, and live-wired stat tiles for Water, Sleep, Mood, and Spend Today. |
| **Habits** | Add habits, check them off daily, see a 7-day weekly grid and a running streak per habit (with a grace period so today doesn't "break" your streak before the day is over). |
| **Tasks** | Priority levels (low/medium/high), optional due dates, sorted automatically by urgency, synced live with the Dashboard and Calendar. |
| **Calendar** | A full month view. Every day shows dots for tasks due, a flame for habit completions, and a quill for journal entries — click any date, past or future, to see everything that happened that day: journal entry, habits completed, tasks, and expenses. |
| **Journal** | A daily entry editor with toggleable mood tags, a running list of past entries, and a mood-frequency breakdown in Analytics. Today's mood also powers the Dashboard's Mood tile automatically. |
| **Library** | Currently Reading / Wishlist / Finished shelves with real reading-progress bars, and book covers you can upload as a file *or* paste as an image URL. |
| **Adventures** | A dream-destinations list and a visited "passport stamp" collection, plotted on an abstract journey map that also shows up (mini-sized) on the Dashboard. |
| **Finance** | Expense logging by category, a monthly budget with a live progress bar, and savings goals you can top up over time. Powers the Dashboard's "Spend Today" tile. |
| **Health** | Water intake (with a daily goal and a 7-day bar chart), sleep logging, and a weight tracker that computes BMI once you've entered your height. |
| **Analytics** | The module that ties everything together — real charts (via Recharts) for habit consistency, spending by category, water/sleep trends, plus a stat grid pulling totals from every other module. |
| **Settings** | Your display name (used across the whole app), a theme toggle, and full data management: export a JSON backup, import one, or reset everything back to Day One. |

Two more spots are wired into navigation but intentionally left as placeholders for now — **AI Companion** and a couple of System-tier pages — since they need either a real AI backend or further design work to do properly rather than half-build them.

---

## Design System

- **Palette** — Deep navy / near-black backgrounds (`#080C15` → `#121A2C`) in dark mode, warm cream (`#F7F2E7`) in light mode. Soft gold (`#CBA057`) as the single accent color, with a muted burgundy (`#8C3B45`) used sparingly. No green, no neon, no gradients-for-the-sake-of-it.
- **Typography** — [Fraunces](https://fonts.google.com/specimen/Fraunces) (serif) for headings, journal text, and the live clock; [Inter](https://fonts.google.com/specimen/Inter) for UI chrome; [IBM Plex Mono](https://fonts.google.com/specimen/IBM+Plex+Mono) for data, timestamps, and streak counters.
- **Signature element — the Life Constellation.** Five life areas (Learning, Craft, Health, Adventure, Stillness) plotted as stars connected into a constellation, twinkling gently. It stays night-themed even in light mode — a small window into the observatory regardless of time of day.
- **Motion** — subtle, short transitions (hover states, theme toggle, sidebar collapse). Nothing distracting, no motion for motion's sake.
- **Dark & light mode**, both fully supported, toggleable from the top bar or Settings.

---

## Tech Stack

**Frontend**
- React 19 + TypeScript + Vite
- Tailwind CSS (design tokens) + hand-authored CSS for the core design system
- [Zustand](https://github.com/pmndrs/zustand) + `persist` middleware — the state layer for every module, backed by `localStorage`
- [TanStack Query](https://tanstack.com/query) — used by the Dashboard to eventually talk to the real backend, with a graceful mock-data fallback today
- React Router
- React Hook Form + Zod — every add/edit form in the app
- [Recharts](https://recharts.org/) — Analytics charts
- Axios, react-hot-toast

**Backend** *(scaffolded, partially wired — see [Backend](#backend))*
- ASP.NET Core 9 Web API, Clean Architecture (Domain → Application → Infrastructure/Persistence → API)
- Entity Framework Core 9 + PostgreSQL
- MediatR (CQRS), FluentValidation, AutoMapper, Serilog, Swagger

---

## Architecture

### State: one store per domain

Every module — Habits, Tasks, Journal, Library, Adventures, Finance, Health, Settings — has its own Zustand store under `frontend/src/features/<module>/`, persisted to a dedicated `localStorage` key (`lifeos-habits`, `lifeos-tasks`, etc.). Components never hold their own copy of this data — the Dashboard's cards, the Calendar's day panel, and the Analytics charts all subscribe directly to the same stores the full pages use. Toggle a habit anywhere, and every screen showing that habit updates instantly.

### Frontend structure mirrors the backend

`frontend/src/features/<module>/` and `backend/LifeOS.Application/Features/<Module>/` are named identically on purpose — the Dashboard module is fully built end-to-end on both sides as the reference pattern for how every other module should eventually connect to the real API.

### Backend as a target, not (yet) a dependency

The frontend is fully usable today without the backend running at all — every store falls back gracefully. The backend exists as a correctly-architected, production-pattern target to migrate each store toward, one module at a time, following [`docs/BUILD_ORDER.md`](docs/BUILD_ORDER.md).

---

## Getting Started

### Just the frontend (fastest way to see it)

```bash
cd frontend
npm install
npm run dev
```

Open **http://localhost:5173**. The app works fully standalone — everything is stored in your browser.

### Full stack (frontend + real API + PostgreSQL)

**Requirements:** Node.js 20+, [.NET 9 SDK](https://dotnet.microsoft.com/download/dotnet/9.0), PostgreSQL 14+.

```bash
# 1. Start Postgres (skip if you already have a local instance)
cd backend
docker compose up -d

# 2. Configure the connection string via user-secrets (keeps credentials out of git)
cd LifeOS.API
dotnet user-secrets init
dotnet user-secrets set "ConnectionStrings:DefaultConnection" "Host=localhost;Port=5432;Database=lifeos_dev;Username=postgres;Password=postgres"

# 3. Create the schema
cd ..
dotnet ef migrations add InitialCreate --project LifeOS.Persistence --startup-project LifeOS.API
dotnet ef database update --project LifeOS.Persistence --startup-project LifeOS.API

# 4. Run the API (seeds one demo user in Development)
dotnet run --project LifeOS.API
```

API runs at **http://localhost:5000**, Swagger docs at `/swagger`.

```bash
# 5. In a second terminal
cd frontend
npm install
npm run dev
```

The Dashboard now calls the real `GET /api/dashboard` endpoint instead of falling back to mock data. Every other module still runs on its local store until it's migrated following the build-order guide.

> Everything above is also wired into `.vscode/tasks.json` — open the Command Palette → "Run Task" → `frontend: dev` / `backend: run`.

---

## Project Structure

```
LifeOS/
├── .vscode/                  # Tasks, recommended extensions, workspace settings
├── docs/                     # PROJECT_STRUCTURE.md, BUILD_ORDER.md
├── frontend/
│   └── src/
│       ├── components/
│       │   ├── common/         # IconSprite, Skeleton, PlaceholderPage
│       │   ├── layout/         # Sidebar, TopBar, AppShell
│       │   ├── cards/          # Dashboard cards (one file per card)
│       │   └── forms/          # React Hook Form + Zod forms, one per "add X" action
│       ├── features/
│       │   ├── dashboard/       # Dashboard page + query + mock fallback
│       │   ├── habits/          # Store, logic, page
│       │   ├── tasks/           # Store, logic, page
│       │   ├── calendar/        # Cross-module day-browser logic + page
│       │   ├── journal/         # Store, logic, page
│       │   ├── library/         # Store, logic, cover-upload component, page
│       │   ├── adventures/      # Store, journey-map logic, page
│       │   ├── finance/         # Store, logic, page
│       │   ├── health/          # Store, logic, weekly bar chart, page
│       │   ├── analytics/       # Cross-module aggregation logic + page
│       │   └── settings/        # Profile + data export/import/reset
│       ├── stores/              # App-wide stores (theme)
│       ├── routes/              # Route table
│       └── styles/              # globals.css — the whole design system
│
└── backend/
    ├── LifeOS.Domain/           # Entities only, zero dependencies
    ├── LifeOS.Application/      # CQRS handlers (Dashboard module fully built)
    ├── LifeOS.Infrastructure/   # Cross-cutting services (clock, future JWT/email)
    ├── LifeOS.Persistence/      # EF Core DbContext + configurations
    ├── LifeOS.API/               # Controllers, Program.cs, dev-time seeding
    ├── LifeOS.Shared/            # Result<T>, shared exceptions
    ├── tests/                    # Unit tests for CQRS handlers
    └── docker-compose.yml        # Local PostgreSQL
```

See [`docs/PROJECT_STRUCTURE.md`](docs/PROJECT_STRUCTURE.md) for the full annotated tour.

---

## Data & Privacy

Every module's data lives in your browser's `localStorage` — nothing is transmitted anywhere unless you're running the backend and it's actively connected. From **Settings** you can:

- **Export** a complete JSON snapshot of everything (habits, tasks, journal entries, library, adventures, finance, health logs)
- **Import** a previous export to restore or migrate to another browser
- **Reset everything** back to a genuine Day One state

There's no account system yet, no analytics, no tracking — it's just you and your browser's storage.

---

## Backend

The backend is a real, correctly-architected ASP.NET Core 9 project — not a stub. The **Dashboard module** is built completely end-to-end (entity → EF Core configuration → CQRS query/handler → controller → seeded demo data) as the reference implementation. Every other module has its domain entities and database schema already defined, but still runs on its frontend-only Zustand store day-to-day.

Migrating a module to the real backend means following the same 15-step loop the Dashboard module already demonstrates — documented in [`docs/BUILD_ORDER.md`](docs/BUILD_ORDER.md). Authentication (JWT, register/login) is the natural next step before wiring up any module that needs to support more than one real user.

---

## Roadmap

Roughly in priority order:

- [ ] **Authentication** — real JWT-based login, replacing the current single-seeded-demo-user stand-in
- [ ] Migrate Habits and Tasks to the real backend (closest in shape to the Dashboard reference pattern)
- [ ] **AI Companion** — the "Gus" note on the Dashboard becomes a real conversational assistant
- [ ] Real weather + a rotating daily quote (currently the only still-hardcoded pieces of the Dashboard hero)
- [ ] Cloudinary-backed image uploads for book covers and journal photos, replacing the current localStorage data-URL approach
- [ ] Push/reminder notifications for habits and tasks
- [ ] Mobile-responsive pass beyond the current breakpoint handling

---

## Documentation

- [`docs/PROJECT_STRUCTURE.md`](docs/PROJECT_STRUCTURE.md) — annotated tour of every folder and why it's shaped that way
- [`docs/BUILD_ORDER.md`](docs/BUILD_ORDER.md) — the repeatable 15-step loop for migrating a module from local-only to the real backend, plus the recommended module order

---

## License

MIT — see [`LICENSE`](LICENSE).

---

*LifeOS · A Personal Operating System · Every day is a page.*
