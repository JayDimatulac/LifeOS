using LifeOS.Domain.Common;

namespace LifeOS.Domain.Entities;

public class User : BaseEntity
{
    public string Email { get; set; } = string.Empty;
    public string DisplayName { get; set; } = string.Empty;
    public string PasswordHash { get; set; } = string.Empty;
    public int StreakDays { get; set; }
    public DateOnly JourneyStartDate { get; set; }

    public ICollection<Habit> Habits { get; set; } = new List<Habit>();
    public ICollection<TaskItem> Tasks { get; set; } = new List<TaskItem>();
}
