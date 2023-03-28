using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace server.Models;

public class Orders
{
   [Key]
   [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
   public Guid OrderId { get; set; }
   public Guid OwnerId { get; set; }
   public string? Restaurant { get; set; }
   public string? Category { get; set; }
   public int LimitAmount { get; set; }
}

