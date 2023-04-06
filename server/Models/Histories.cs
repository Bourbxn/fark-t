using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace server.Models;

public class Histories
{
   [Key]
   [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
   public Guid HistoryId { get; set; }
   public string? Role { get; set; }
   public Users User { get; set; } = null!;
   public Orders Order { get; set; } = null!;
   public Farks Fark { get; set; } = null!;
}

