using FluentAssertions;
using LifeOS.Application.Common.Interfaces;
using LifeOS.Application.Features.Dashboard.Queries.GetDashboardSummary;
using LifeOS.Domain.Entities;
using LifeOS.Persistence;
using Microsoft.EntityFrameworkCore;
using Xunit;

namespace LifeOS.Application.Tests.Dashboard;

public class GetDashboardSummaryQueryHandlerTests
{
    private static ApplicationDbContext CreateContext()
    {
        var options = new DbContextOptionsBuilder<ApplicationDbContext>()
            .UseInMemoryDatabase(Guid.NewGuid().ToString())
            .Options;
        return new ApplicationDbContext(options);
    }

    private class FakeCurrentUser : ICurrentUserService
    {
        public FakeCurrentUser(Guid userId) => UserId = userId;
        public Guid UserId { get; }
    }

    [Fact]
    public async Task Handle_ReturnsHabitsAndTasksForTheCurrentUser()
    {
        // Arrange
        await using var db = CreateContext();
        var user = new User
        {
            Email = "test@lifeos.dev",
            DisplayName = "Tester",
            StreakDays = 5,
            JourneyStartDate = DateOnly.FromDateTime(DateTime.UtcNow).AddDays(-10),
        };
        db.Users.Add(user);

        var today = DateOnly.FromDateTime(DateTime.UtcNow);
        db.Habits.Add(new Habit
        {
            UserId = user.Id,
            Name = "Read",
            CurrentStreak = 3,
            Logs = { new HabitLog { LogDate = today, Completed = true } },
        });
        db.Tasks.Add(new TaskItem { UserId = user.Id, Title = "Write report", DueAt = DateTime.UtcNow.AddHours(2) });
        await db.SaveChangesAsync();

        var handler = new GetDashboardSummaryQueryHandler(db, new FakeCurrentUser(user.Id));

        // Act
        var result = await handler.Handle(new GetDashboardSummaryQuery(), CancellationToken.None);

        // Assert
        result.UserName.Should().Be("Tester");
        result.Habits.Should().ContainSingle(h => h.Name == "Read" && h.Done);
        result.Tasks.Should().ContainSingle(t => t.Title == "Write report");
    }
}
