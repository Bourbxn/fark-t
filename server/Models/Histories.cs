using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace server.Models;

public class Histories
{
   [Key]
   [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
   public Guid HistoryId { get; set; }
   public DateTime Date { get; set; }
   public string? Role { get; set; }
   public int CoinSpending { get; set; }
   public string? Restaurant { get; set; }
   public string? Category { get; set; }
   public string? Owner { get; set; }
   public string? Menu { get; set; }
   public string? Location { get; set; }
   public Users User { get; set; } = null!;
   public Guid OrderFarkId { get; set; }
}

