using LifeOS.Domain.Common;

namespace LifeOS.Domain.Entities;

/// <summary>
/// A single scored dimension of the user's life (Learning, Craft, Health, etc.)
/// shown as one star in the Dashboard's Life Constellation.
/// </summary>
public class LifeAreaScore : BaseEntity
{
    public Guid UserId { get; set; }
    public User? User { get; set; }
    public string Label { get; set; } = string.Empty;
    public int Value { get; set; } // 0-100
    public int SortOrder { get; set; }
}
