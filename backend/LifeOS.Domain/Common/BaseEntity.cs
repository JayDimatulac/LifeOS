namespace LifeOS.Domain.Common;

/// <summary>
/// Base class for every persisted entity. Centralizes the audit and
/// soft-delete columns required by the "Database" section of the LifeOS spec.
/// </summary>
public abstract class BaseEntity
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime? UpdatedAt { get; set; }
    public bool IsDeleted { get; set; }
    public DateTime? DeletedAt { get; set; }
}
