using LifeOS.Application.Common.Interfaces;
using LifeOS.Infrastructure.Services;
using Microsoft.Extensions.DependencyInjection;

namespace LifeOS.Infrastructure;

/// <summary>
/// Cross-cutting services live here: JWT issuing/validation, email sending,
/// Cloudinary uploads, Hangfire jobs, Redis caching. Register each as it's
/// built — nothing here should ever "fake" auth or security.
/// </summary>
public static class DependencyInjection
{
    public static IServiceCollection AddInfrastructure(this IServiceCollection services)
    {
        services.AddSingleton<IDateTime, DateTimeService>();

        // TODO (Auth module): services.AddScoped<ITokenService, JwtTokenService>();
        // TODO (Notifications module): services.AddScoped<IEmailSender, SmtpEmailSender>();
        // TODO (Books/Journal module): services.AddScoped<IImageStorage, CloudinaryImageStorage>();

        return services;
    }
}
