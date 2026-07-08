namespace LifeOS.Application.Common.Interfaces;

/// <summary>Abstraction over the system clock so handlers stay unit-testable.</summary>
public interface IDateTime
{
    DateTime UtcNow { get; }
}
