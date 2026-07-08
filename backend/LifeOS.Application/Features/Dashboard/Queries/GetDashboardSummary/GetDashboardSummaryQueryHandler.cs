using LifeOS.Application.Common.Interfaces;
using LifeOS.Application.Features.Dashboard.DTOs;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace LifeOS.Application.Features.Dashboard.Queries.GetDashboardSummary;

public class GetDashboardSummaryQueryHandler : IRequestHandler<GetDashboardSummaryQuery, DashboardDto>
{
    private readonly IApplicationDbContext _db;
    private readonly ICurrentUserService _currentUser;

    public GetDashboardSummaryQueryHandler(IApplicationDbContext db, ICurrentUserService currentUser)
    {
        _db = db;
        _currentUser = currentUser;
    }

    public async Task<DashboardDto> Handle(GetDashboardSummaryQuery request, CancellationToken cancellationToken)
    {
        var userId = _currentUser.UserId;
        var today = DateOnly.FromDateTime(DateTime.UtcNow);

        var user = await _db.Users.AsNoTracking().FirstOrDefaultAsync(u => u.Id == userId, cancellationToken);

        var habits = await _db.Habits
            .AsNoTracking()
            .Where(h => h.UserId == userId && !h.IsArchived)
            .Include(h => h.Logs.Where(l => l.LogDate == today))
            .ToListAsync(cancellationToken);

        var tasks = await _db.Tasks
            .AsNoTracking()
            .Where(t => t.UserId == userId && !t.IsComplete)
            .OrderBy(t => t.DueAt)
            .Take(5)
            .ToListAsync(cancellationToken);

        var doneToday = habits.Count(h => h.Logs.Any(l => l.Completed));
        var book = await _db.Books
            .AsNoTracking()
            .FirstOrDefaultAsync(b => b.UserId == userId && b.IsCurrentlyReading, cancellationToken);

        var journal = await _db.JournalEntries
            .AsNoTracking()
            .Where(j => j.UserId == userId && j.EntryDate == today)
            .FirstOrDefaultAsync(cancellationToken);

        var adventureStops = await _db.AdventureStops
            .AsNoTracking()
            .Where(a => a.UserId == userId)
            .OrderBy(a => a.SortOrder)
            .ToListAsync(cancellationToken);

        var lifeAreas = await _db.LifeAreaScores
            .AsNoTracking()
            .Where(l => l.UserId == userId)
            .OrderBy(l => l.SortOrder)
            .ToListAsync(cancellationToken);

        return new DashboardDto
        {
            UserName = user?.DisplayName ?? "Explorer",
            DayCount = user is null ? 1 : today.DayNumber - user.JourneyStartDate.DayNumber + 1,
            ChapterLabel = $"Chapter {(user is null ? 1 : today.DayNumber - user.JourneyStartDate.DayNumber + 1)}",
            Quote = "Every long story starts with a single, unremarkable page.",
            // TODO: replace with a real weather provider call once the Health/Settings module stores a home location.
            WeatherSummary = "Clear",
            TemperatureC = 27,
            StreakDays = user?.StreakDays ?? 0,
            TasksDoneRatio = $"{doneToday}/{habits.Count}",
            LifeAreas = lifeAreas.Select(l => new LifeAreaScoreDto
            {
                Label = l.Label,
                Value = l.Value,
                Color = l.Value >= 80 ? "goldSoft" : l.Value >= 60 ? "gold" : "silver",
            }).ToList(),
            Habits = habits.Select(h => new HabitDto
            {
                Id = h.Id,
                Name = h.Name,
                Done = h.Logs.Any(l => l.Completed),
                Streak = h.CurrentStreak,
            }).ToList(),
            Tasks = tasks.Select(t => new TaskDto
            {
                Id = t.Id,
                Title = t.Title,
                Time = t.DueAt?.ToString("MMM d, h:mm tt") ?? "No due date",
                Priority = t.Priority.ToString().ToLowerInvariant(),
            }).ToList(),
            Book = book is null ? null : new BookDto
            {
                Title = book.Title,
                Author = book.Author,
                CurrentPage = book.CurrentPage,
                TotalPages = book.TotalPages,
            },
            Journal = journal is null ? null : new JournalEntryDto
            {
                Date = journal.EntryDate.ToString("MMMM d"),
                Text = journal.Text,
                Moods = journal.Moods,
            },
            Adventure = adventureStops.Select((a, i) => new AdventureStopDto
            {
                Name = a.Name,
                X = 20 + i * 105,
                Y = a.Visited ? 80 : 25,
                Active = !a.Visited,
            }).ToList(),
            // TODO: source these from the Health and Finance modules once built (see build order in README).
            Stats = new List<StatTileDto>
            {
                new() { Label = "Water", Value = "—", Trend = "Health module not built yet", TrendType = "flat", Icon = "drop" },
                new() { Label = "Sleep", Value = "—", Trend = "Health module not built yet", TrendType = "flat", Icon = "moon" },
                new() { Label = "Mood", Value = "—", Trend = "Journal module not built yet", TrendType = "flat", Icon = "health" },
                new() { Label = "Spend today", Value = "—", Trend = "Finance module not built yet", TrendType = "flat", Icon = "finance" },
            },
            AiInsight = "Welcome to LifeOS. There's nothing to report yet — and that's exactly right for Day One. Set up one habit and write one line in your journal today. That's all this page is asking of you.",
            Deadlines = tasks
                .Where(t => t.DueAt != null)
                .Select(t => new DeadlineDto { Date = t.DueAt!.Value.ToString("MMM d").ToUpperInvariant(), Title = t.Title })
                .ToList(),
        };
    }
}
