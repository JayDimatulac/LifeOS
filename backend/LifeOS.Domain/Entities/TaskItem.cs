using LifeOS.Domain.Common;

namespace LifeOS.Domain.Entities;

public enum TaskPriority { Low, Medium, High }

public class TaskItem : BaseEntity
{
    public Guid UserId { get; set; }
    public User? User { get; set; }
    public string Title { get; set; } = string.Empty;
    public DateTime? DueAt { get; set; }
    public TaskPriority Priority { get; set; } = TaskPriority.Medium;
    public bool IsComplete { get; set; }
}
