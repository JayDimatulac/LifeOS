# Build Order — Adding Your Next Module

The master prompt is right about one thing above all else: **don't scaffold everything at once.** Finish one module end-to-end, in this order, before starting the next. Habits is the natural next module since its entities already exist — use it as your first rep.

## The 15-step loop (per module)

Using **Habits** as the example:

1. **Confirm the entity exists** in `LifeOS.Domain/Entities/` (Habit and HabitLog already do).
2. **Add/confirm the EF Core configuration** in `LifeOS.Persistence/Configurations/` (HabitConfiguration already exists).
3. **Write the DTOs** in `LifeOS.Application/Features/Habits/DTOs/` — shape the JSON the frontend actually needs (look at the mock data in `frontend/src/features/habits` once you create it).
4. **Write the CQRS queries/commands** in `LifeOS.Application/Features/Habits/Queries/` and `.../Commands/` — e.g. `GetHabitsQuery`, `ToggleHabitCommand`, `CreateHabitCommand`.
5. **Write the handlers** next to each query/command (copy the structure of `GetDashboardSummaryQueryHandler.cs`).
6. **Add FluentValidation validators** for any command that takes user input (e.g. `CreateHabitCommandValidator`).
7. **Add the controller** in `LifeOS.API/Controllers/HabitsController.cs` — thin, just calls `_mediator.Send(...)`.
8. **Create a migration** if you changed the schema: `dotnet ef migrations add AddHabitFields --project LifeOS.Persistence --startup-project LifeOS.API`.
9. **Write a unit test** for the handler in `tests/LifeOS.Application.Tests/Habits/` (copy `GetDashboardSummaryQueryHandlerTests.cs`).
10. **Build the frontend types** in `frontend/src/types/habits.ts`.
11. **Build the frontend service + hook** in `frontend/src/features/habits/habitsService.ts` (copy `dashboardService.ts` — same mock-fallback pattern).
12. **Replace `HabitsPage.tsx`'s placeholder** with real components (reuse `HabitsCard` from `components/cards/` if the shape fits, or build a dedicated full-page layout).
13. **Add loading/empty/error states** — `DashboardSkeleton` in `components/common/Skeleton.tsx` shows the pattern.
14. **Test it manually end-to-end**: toggle a habit in the UI, confirm it round-trips through the API and persists after a refresh.
15. **Refactor before moving on** — remove TODOs, tighten types, delete unused mock fields.

## Suggested module order

This follows the MVP list from the original spec, reordered slightly so each module can lean on entities/patterns the previous one already established:

1. **Habits** — entities exist; best first rep of the loop above.
2. **Tasks** — same shape as Habits (CRUD + a boolean state), good second rep.
3. **Authentication** — do this before anything else touches multiple real users. Replace `CurrentUserService` with real JWT-claims resolution; add Register/Login/RefreshToken endpoints; add `[Authorize]` to every existing controller.
4. **Journal** — introduces file/image handling if you want photos (Cloudinary via `LifeOS.Infrastructure`).
5. **Library (Books)** — introduces external data (optionally an ISBN lookup API).
6. **Health** (Water, Sleep, Weight) — introduces time-series data and your first real chart (Recharts) in `components/charts/`.
7. **Finance** (Expenses, Budgets) — introduces aggregation queries (sums, group-by).
8. **Calendar / Goals / Adventures / Analytics / AI Assistant / Settings** — by now the pattern is second nature; build in whatever order matches your own priorities.

## Rules that don't change per module

- Controllers never touch `ApplicationDbContext` directly — only `IApplicationDbContext` through a MediatR handler.
- Every command that mutates data gets a FluentValidation validator, even if it feels trivial.
- Every new DbSet needs a query filter consideration for soft deletes — the global filter in `ApplicationDbContext.OnModelCreating` already covers this automatically for anything extending `BaseEntity`.
- Every endpoint gets `[Authorize]` once the Auth module exists — don't ship anything reachable by an unauthenticated user other than `/auth/*`.
