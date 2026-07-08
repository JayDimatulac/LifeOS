using LifeOS.Domain.Common;

namespace LifeOS.Domain.Entities;

public class AdventureStop : BaseEntity
{
    public Guid UserId { get; set; }
    public User? User { get; set; }
    public string Name { get; set; } = string.Empty;
    public bool Visited { get; set; }
    public int SortOrder { get; set; }
}
