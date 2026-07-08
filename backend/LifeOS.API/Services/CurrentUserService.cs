using LifeOS.Application.Common.Interfaces;
using LifeOS.Persistence;
using Microsoft.EntityFrameworkCore;

namespace LifeOS.API.Services;

/// <summary>
/// Temporary stand-in for real authentication: always resolves to the
/// seeded demo user. Replace with a JWT-claims-based implementation when
/// the Authentication module is built, and delete DemoUserId entirely.
/// </summary>
public class CurrentUserService : ICurrentUserService
{
    private readonly ApplicationDbContext _db;
    private Guid? _cachedUserId;

    public static readonly string DemoUserEmail = "kai@lifeos.dev";

    public CurrentUserService(ApplicationDbContext db)
    {
        _db = db;
    }

    public Guid UserId
    {
        get
        {
            _cachedUserId ??= _db.Users
                .AsNoTracking()
                .Where(u => u.Email == DemoUserEmail)
                .Select(u => (Guid?)u.Id)
                .FirstOrDefault();

            return _cachedUserId ?? Guid.Empty;
        }
    }
}
