using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace server.Models;

public class Orders
{
   [Key]
   [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
   public Guid OrderId { get; set; }
   public string? Restaurant { get; set; }
   public string? Category { get; set; }
   public int LimitAmount { get; set; }
   public int CurrentAmount { get; set; }
   public bool Status { get; set; }
   public Users User { get; set; } = null!;
}

