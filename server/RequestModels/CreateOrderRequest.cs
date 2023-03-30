namespace server.RequestModels;

public class CreateOrderRequest
{
   public Guid UserId { get; set; }
   public string? Restaurant { get; set; }
   public string? Category { get; set; }
   public int LimitAmount { get; set; }
   public int CurrentAmount { get; set; }
   public bool Status { get; set; }
}