using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace server.Models;

public class Farks
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public Guid FarkId { get; set; }
    public string? Menu { get; set; }
    public string? Location { get; set; }
    public Users User { get; set; } = null!;
    public Orders Order { get; set; } = null!; }