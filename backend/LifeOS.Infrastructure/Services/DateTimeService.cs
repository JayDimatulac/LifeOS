using LifeOS.Application.Common.Interfaces;

namespace LifeOS.Infrastructure.Services;

public class DateTimeService : IDateTime
{
    public DateTime UtcNow => DateTime.UtcNow;
}
