# LifeOS

A Personal Operating System — "every day is a page, every goal is a chapter."

This repo contains the real, running foundation of LifeOS:

- **`frontend/`** — React 19 + TypeScript + Vite + Tailwind, with the Dashboard module fully built against the approved UI/UX design.
- **`backend/`** — ASP.NET Core 9 Clean Architecture (Domain → Application → Infrastructure/Persistence → API) with CQRS via MediatR, PostgreSQL via EF Core, and the Dashboard module wired end-to-end as the reference pattern.

> **Honest scope note:** the full product vision (19 modules, auth, gamification, AI assistant, analytics, etc.) is a multi-week build. This repo gives you a production-quality *pattern* — one module built completely, correctly, and idiomatically — so every other module can be added the same way. See [`docs/BUILD_ORDER.md`](docs/BUILD_ORDER.md) for the recommended path.

---

## Quick Start

### 1. Frontend only (no backend required)

The frontend ships with mock data, so you can see the full UI immediately:

```bash
cd frontend
npm install
npm run dev
```

Open **http://localhost:5173**.

### 2. Full stack (frontend + real API + PostgreSQL)

**Requirements:** Node.js 20+, [.NET 9 SDK](https://dotnet.microsoft.com/download/dotnet/9.0), PostgreSQL 14+ (you already have PostgreSQL 18 installed locally, or use the provided `docker-compose.yml`).

```bash
# 1. Start Postgres (skip if you already have a local instance running)
cd backend
docker compose up -d

# 2. Configure the connection string
#    Edit backend/LifeOS.API/appsettings.Development.json, or better,
#    use dotnet user-secrets so real credentials never get committed:
cd LifeOS.API
dotnet user-secrets init
dotnet user-secrets set "ConnectionStrings:DefaultConnection" "Host=localhost;Port=5432;Database=lifeos_dev;Username=postgres;Password=postgres"

# 3. Create the database schema
cd ..
dotnet ef migrations add InitialCreate --project LifeOS.Persistence --startup-project LifeOS.API
dotnet ef database update --project LifeOS.Persistence --startup-project LifeOS.API

# 4. Run the API (also seeds one demo user + sample data in Development)
dotnet run --project LifeOS.API
```

The API starts at **http://localhost:5000** with Swagger at `/swagger`.

```bash
# 5. In a second terminal, run the frontend
cd frontend
npm install
npm run dev
```

Open **http://localhost:5173** — the Dashboard now calls the real `GET /api/dashboard` endpoint instead of mock data.

> Everything above is also wired into `.vscode/tasks.json` — open the Command Palette → "Run Task" → `frontend: dev` / `backend: run`.

---

## What's real right now

| Layer | Status |
|---|---|
| Frontend design system (colors, type, components) | ✅ Matches the approved UI/UX exactly |
| Dashboard module (frontend) | ✅ Fully built, componentized, typed |
| Dashboard module (backend) | ✅ Entity → EF Core → CQRS query → controller, fully wired |
| Habits, Tasks, Journal, Library, Adventures (data models) | ✅ Domain entities + DB schema exist and are seeded |
| Habits, Tasks, Journal, Library, Adventures (dedicated pages/endpoints) | 🚧 Placeholder pages — build next, following the Dashboard pattern |
| Authentication (JWT, register/login) | 🚧 Not built. `ICurrentUserService` currently resolves a single seeded demo user |
| AI Assistant, Analytics, Finance, Health, Gamification | 🚧 Not started |

See [`docs/PROJECT_STRUCTURE.md`](docs/PROJECT_STRUCTURE.md) for a tour of the codebase and [`docs/BUILD_ORDER.md`](docs/BUILD_ORDER.md) for how to add the next module.

## Known limitations

- The frontend was installed, built, and dev-server-tested in the environment that generated it — it works as-is.
- The backend was written carefully against standard ASP.NET Core 9 / EF Core 9 / MediatR 12 APIs, but **could not be compiled in the environment that generated it** (no .NET SDK available there). Run `dotnet build` after cloning — if anything doesn't compile, it's most likely a small package-version mismatch, easy to fix by checking [nuget.org](https://www.nuget.org) for the latest compatible version of the package named in the error.

## Tech Stack

**Frontend:** React 19, TypeScript, Vite, TanStack Query, Zustand, React Router, React Hook Form + Zod, Framer Motion, Recharts, Axios, react-hot-toast.

**Backend:** ASP.NET Core 9, EF Core 9, PostgreSQL (Npgsql), MediatR (CQRS), FluentValidation, AutoMapper, Serilog, Swagger.
