using LifeOS.Domain.Common;

namespace LifeOS.Domain.Entities;

public class Book : BaseEntity
{
    public Guid UserId { get; set; }
    public User? User { get; set; }
    public string Title { get; set; } = string.Empty;
    public string Author { get; set; } = string.Empty;
    public int TotalPages { get; set; }
    public int CurrentPage { get; set; }
    public bool IsCurrentlyReading { get; set; }
}
