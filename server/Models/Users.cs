using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace server.Models 
{
  public class Users
  {
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public Guid UserId { get; set; }
    public string? Username { get; set; }
    public string? Password { get; set; }
    public string? Telephone { get; set; }
    public int FarkCoin { get; set; }
  }
}
