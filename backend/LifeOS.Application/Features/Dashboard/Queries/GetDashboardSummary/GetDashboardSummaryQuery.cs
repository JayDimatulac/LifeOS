using LifeOS.Application.Features.Dashboard.DTOs;
using MediatR;

namespace LifeOS.Application.Features.Dashboard.Queries.GetDashboardSummary;

/// <summary>CQRS query: assembles the single-screen summary shown on the Dashboard.</summary>
public record GetDashboardSummaryQuery : IRequest<DashboardDto>;
