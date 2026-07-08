namespace LifeOS.Shared;

/// <summary>
/// Wraps a handler's outcome so controllers never have to guess whether
/// a null return means "not found" or "no data yet".
/// </summary>
public class Result<T>
{
    public bool Succeeded { get; }
    public T? Value { get; }
    public string? Error { get; }

    private Result(bool succeeded, T? value, string? error)
    {
        Succeeded = succeeded;
        Value = value;
        Error = error;
    }

    public static Result<T> Success(T value) => new(true, value, null);
    public static Result<T> Failure(string error) => new(false, default, error);
}
