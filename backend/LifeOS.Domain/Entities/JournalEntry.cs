using LifeOS.Domain.Common;

namespace LifeOS.Domain.Entities;

public class JournalEntry : BaseEntity
{
    public Guid UserId { get; set; }
    public User? User { get; set; }
    public DateOnly EntryDate { get; set; }
    public string Text { get; set; } = string.Empty;
    public List<string> Moods { get; set; } = new();
}
