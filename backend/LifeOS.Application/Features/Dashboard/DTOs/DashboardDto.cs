namespace LifeOS.Application.Features.Dashboard.DTOs;

public class DashboardDto
{
    public string UserName { get; set; } = string.Empty;
    public int DayCount { get; set; }
    public string ChapterLabel { get; set; } = string.Empty;
    public string Quote { get; set; } = string.Empty;
    public string WeatherSummary { get; set; } = string.Empty;
    public int TemperatureC { get; set; }
    public int StreakDays { get; set; }
    public string TasksDoneRatio { get; set; } = string.Empty;

    public List<LifeAreaScoreDto> LifeAreas { get; set; } = new();
    public List<HabitDto> Habits { get; set; } = new();
    public List<TaskDto> Tasks { get; set; } = new();
    public BookDto? Book { get; set; }
    public JournalEntryDto? Journal { get; set; }
    public List<AdventureStopDto> Adventure { get; set; } = new();
    public List<StatTileDto> Stats { get; set; } = new();
    public string AiInsight { get; set; } = string.Empty;
    public List<DeadlineDto> Deadlines { get; set; } = new();
}

public class LifeAreaScoreDto
{
    public string Label { get; set; } = string.Empty;
    public int Value { get; set; }
    public string Color { get; set; } = "gold";
}

public class HabitDto
{
    public Guid Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public bool Done { get; set; }
    public int Streak { get; set; }
}

public class TaskDto
{
    public Guid Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public string Time { get; set; } = string.Empty;
    public string Priority { get; set; } = "medium";
}

public class BookDto
{
    public string Title { get; set; } = string.Empty;
    public string Author { get; set; } = string.Empty;
    public int CurrentPage { get; set; }
    public int TotalPages { get; set; }
}

public class JournalEntryDto
{
    public string Date { get; set; } = string.Empty;
    public string Text { get; set; } = string.Empty;
    public List<string> Moods { get; set; } = new();
}

public class AdventureStopDto
{
    public string Name { get; set; } = string.Empty;
    public int X { get; set; }
    public int Y { get; set; }
    public bool Active { get; set; }
}

public class StatTileDto
{
    public string Label { get; set; } = string.Empty;
    public string Value { get; set; } = string.Empty;
    public string Trend { get; set; } = string.Empty;
    public string TrendType { get; set; } = "flat";
    public string Icon { get; set; } = "drop";
}

public class DeadlineDto
{
    public string Date { get; set; } = string.Empty;
    public string Title { get; set; } = string.Empty;
}
