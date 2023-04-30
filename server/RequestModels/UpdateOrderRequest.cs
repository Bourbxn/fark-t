namespace server.RequestModels;

public class UpdateOrderRequest
{
  public string? Restaurant { get; set; }
  public string? Category { get; set; }
  public int LimitAmount { get; set; }
}
