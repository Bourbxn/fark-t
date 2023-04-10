namespace server.RequestModels;

public class CreateHistoryRequest 
{
  public DateTime Date { get; set; }
   public string? Role { get; set; }
   public int CoinSpending { get; set; }
   public string? Restaurant { get; set; }
   public string? Category { get; set; }
   public string? Owner { get; set; }
   public string? Menu { get; set; }
   public string? Location { get; set; }
   public Guid UserId { get; set; }
}
