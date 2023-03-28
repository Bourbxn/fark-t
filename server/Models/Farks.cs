using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace server.Models;

public class Farks
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public Guid FarkId { get; set; }
    public Guid OrderId { get; set; }
    public Guid UserId { get; set; }
    public string? Menu { get; set; }
    public string? Location { get; set; }
}