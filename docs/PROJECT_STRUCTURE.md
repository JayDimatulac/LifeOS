# Project Structure

```
LifeOS/
├── .vscode/                 # Tasks, recommended extensions, workspace settings
├── docs/                    # This documentation
├── frontend/                # React + TypeScript + Vite
│   ├── src/
│   │   ├── app/              # (reserved for app-wide providers/bootstrapping as it grows)
│   │   ├── components/
│   │   │   ├── common/        # IconSprite, Skeleton, PlaceholderPage — used everywhere
│   │   │   ├── ui/             # Design-system primitives (buttons, inputs, etc. — add here)
│   │   │   ├── layout/         # Sidebar, TopBar, AppShell
│   │   │   ├── navigation/     # NavItem and future nav pieces
│   │   │   ├── cards/          # Dashboard card components (one file per card)
│   │   │   ├── charts/         # (reserved) Recharts wrappers for Analytics
│   │   │   ├── dialogs/        # (reserved) modal/dialog primitives
│   │   │   └── forms/          # (reserved) React Hook Form + Zod field components
│   │   ├── features/           # One folder per module — see below
│   │   │   ├── dashboard/       # ✅ fully built: page, service, types, mock data
│   │   │   ├── habits/          # 🚧 placeholder page only
│   │   │   ├── tasks/           # 🚧 placeholder page only
│   │   │   └── ... (calendar, journal, library, adventures, finance, health,
│   │   │            analytics, ai, settings — all placeholders for now)
│   │   ├── hooks/               # Shared React hooks
│   │   ├── services/            # api.ts — the shared Axios instance
│   │   ├── routes/              # AppRoutes.tsx — the route table
│   │   ├── stores/              # Zustand stores (themeStore.ts)
│   │   ├── lib/                 # queryClient.ts, other library setup
│   │   ├── types/                # Shared TypeScript types (dashboard.ts)
│   │   └── styles/               # globals.css — design tokens + component visuals
│   └── ...config files (vite, tailwind, tsconfig)
│
└── backend/
    ├── LifeOS.Domain/            # Entities only. No dependencies on anything.
    │   ├── Common/BaseEntity.cs   # Id, CreatedAt, UpdatedAt, soft-delete
    │   └── Entities/               # User, Habit, HabitLog, TaskItem, JournalEntry,
    │                                # Book, AdventureStop, LifeAreaScore
    ├── LifeOS.Application/        # Business logic. CQRS handlers live here.
    │   ├── Common/Interfaces/      # IApplicationDbContext, ICurrentUserService, IDateTime
    │   ├── Common/Mappings/         # AutoMapper profiles (add as needed)
    │   ├── Features/Dashboard/      # ✅ the reference module: DTOs + Query + Handler
    │   └── DependencyInjection.cs
    ├── LifeOS.Infrastructure/     # Cross-cutting services: clock, (future) JWT, email, storage
    ├── LifeOS.Persistence/        # EF Core: DbContext, entity configurations, migrations
    │   ├── ApplicationDbContext.cs
    │   ├── Configurations/          # Fluent API config, one file per entity (or grouped)
    │   └── DependencyInjection.cs
    ├── LifeOS.API/                # ASP.NET Core host: controllers, Program.cs, appsettings
    │   ├── Controllers/DashboardController.cs
    │   ├── Services/CurrentUserService.cs   # stub until Auth module exists
    │   └── DbSeeder.cs                       # dev-only demo data
    ├── LifeOS.Shared/             # Result<T>, exceptions — used by every layer
    ├── tests/LifeOS.Application.Tests/  # Unit tests for CQRS handlers
    └── docker-compose.yml         # Local PostgreSQL for anyone without it installed
```

## Why this shape?

- **Domain has zero dependencies.** It never references EF Core, ASP.NET, or anything else — this is what makes the architecture "clean." Business rules don't know or care how they're persisted or served.
- **Application depends only on Domain (+ the `IApplicationDbContext` abstraction).** It defines *what* the app does (queries/commands) without knowing *how* data gets stored.
- **Persistence and Infrastructure implement Application's interfaces.** This is Dependency Inversion in practice: Application defines the contract, outer layers fulfill it.
- **API is the thin outer shell.** Controllers do almost nothing except translate HTTP requests into MediatR calls and return the result.
- **Frontend features/ mirrors backend Features/.** The `dashboard` feature exists in both `frontend/src/features/dashboard` and `backend/LifeOS.Application/Features/Dashboard` — when you build the next module, you'll create matching folders in both places.
