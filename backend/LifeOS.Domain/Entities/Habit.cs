using LifeOS.Domain.Common;

namespace LifeOS.Domain.Entities;

public class Habit : BaseEntity
{
    public Guid UserId { get; set; }
    public User? User { get; set; }
    public string Name { get; set; } = string.Empty;
    public int CurrentStreak { get; set; }
    public bool IsArchived { get; set; }

    public ICollection<HabitLog> Logs { get; set; } = new List<HabitLog>();
}

/// <summary>One completion record for a habit on a given day.</summary>
public class HabitLog : BaseEntity
{
    public Guid HabitId { get; set; }
    public Habit? Habit { get; set; }
    public DateOnly LogDate { get; set; }
    public bool Completed { get; set; }
}
