using LifeOS.API.Services;
using LifeOS.Domain.Entities;
using LifeOS.Persistence;
using Microsoft.EntityFrameworkCore;

namespace LifeOS.API;

public static class DbSeeder
{
    public static async Task SeedAsync(ApplicationDbContext db)
    {
        await db.Database.MigrateAsync();

        if (await db.Users.AnyAsync(u => u.Email == CurrentUserService.DemoUserEmail))
        {
            return; // already seeded
        }

        var user = new User
        {
            Email = CurrentUserService.DemoUserEmail,
            DisplayName = "Jay",
            PasswordHash = "seed-only-not-a-real-hash",
            StreakDays = 0,
            JourneyStartDate = DateOnly.FromDateTime(DateTime.UtcNow),
        };
        db.Users.Add(user);

        var today = DateOnly.FromDateTime(DateTime.UtcNow);

        db.Habits.AddRange(
            new Habit { UserId = user.Id, Name = "Morning pages", CurrentStreak = 0 },
            new Habit { UserId = user.Id, Name = "30 min walk", CurrentStreak = 0 },
            new Habit { UserId = user.Id, Name = "Read 20 pages", CurrentStreak = 0 },
            new Habit { UserId = user.Id, Name = "No screens after 10pm", CurrentStreak = 0 },
            new Habit { UserId = user.Id, Name = "2L water", CurrentStreak = 0 },
            new Habit { UserId = user.Id, Name = "Practice guitar", CurrentStreak = 0 }
        );

        db.Tasks.AddRange(
            new TaskItem { UserId = user.Id, Title = "Set up your first habit", Priority = TaskPriority.Medium },
            new TaskItem { UserId = user.Id, Title = "Write your first journal entry", Priority = TaskPriority.Medium },
            new TaskItem { UserId = user.Id, Title = "Add a book you're reading", Priority = TaskPriority.Low }
        );

        // No book, journal entry, adventure stops, or life-area scores are seeded —
        // a brand-new user hasn't logged any of that yet. The Dashboard handler
        // already handles these being empty/null gracefully.
        db.LifeAreaScores.AddRange(
            new LifeAreaScore { UserId = user.Id, Label = "Learning", Value = 0, SortOrder = 1 },
            new LifeAreaScore { UserId = user.Id, Label = "Craft", Value = 0, SortOrder = 2 },
            new LifeAreaScore { UserId = user.Id, Label = "Health", Value = 0, SortOrder = 3 },
            new LifeAreaScore { UserId = user.Id, Label = "Adventure", Value = 0, SortOrder = 4 },
            new LifeAreaScore { UserId = user.Id, Label = "Stillness", Value = 0, SortOrder = 5 }
        );

        await db.SaveChangesAsync();
    }
}
