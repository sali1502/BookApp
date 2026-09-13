namespace Backend.DTOs;

public class CreateQuoteDto
{
    public string Text { get; set; } = string.Empty;
    public string Author { get; set; } = string.Empty;
}

public class UpdateQuoteDto
{
    public string Text { get; set; } = string.Empty;
    public string Author { get; set; } = string.Empty;
}
