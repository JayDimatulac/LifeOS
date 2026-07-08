namespace LifeOS.Application.Common.Interfaces;

/// <summary>
/// Implemented by Infrastructure once JWT auth is wired up. For now the
/// API layer provides a stub implementation backed by a seeded demo user
/// (see LifeOS.API/Services/CurrentUserService.cs) so every other module
/// can be built against the real contract from day one.
/// </summary>
public interface ICurrentUserService
{
    Guid UserId { get; }
}
