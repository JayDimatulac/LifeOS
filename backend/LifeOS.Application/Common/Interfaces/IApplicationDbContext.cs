using LifeOS.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace LifeOS.Application.Common.Interfaces;

/// <summary>
/// The Application layer depends on this interface, never on the concrete
/// EF Core DbContext. LifeOS.Persistence provides the real implementation,
/// which keeps Application free of any dependency on PostgreSQL/Npgsql.
/// </summary>
public interface IApplicationDbContext
{
    DbSet<User> Users { get; }
    DbSet<Habit> Habits { get; }
    DbSet<HabitLog> HabitLogs { get; }
    DbSet<TaskItem> Tasks { get; }
    DbSet<JournalEntry> JournalEntries { get; }
    DbSet<Book> Books { get; }
    DbSet<AdventureStop> AdventureStops { get; }
    DbSet<LifeAreaScore> LifeAreaScores { get; }

    Task<int> SaveChangesAsync(CancellationToken cancellationToken = default);
}
