namespace server.RequestModels;

public class CreateFarkRequest
{
    public Guid OrderId { get; set; }
    public Guid UserId { get; set; }
    public string? Menu { get; set; }
    public string? Location { get; set; }
}