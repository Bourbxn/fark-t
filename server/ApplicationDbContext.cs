using Microsoft.EntityFrameworkCore;
using server.Models;

namespace server;

public class ApplicationDbContext : DbContext
{
    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder.UseMySQL("Host=localhost;Port=3306;Database=farkt;User ID=root;Password=Boss2546");
    }

    public DbSet<Users> Users { get; set; }
    public DbSet<Orders> Orders { get; set; }
    public DbSet<Farks> Farks { get; set; }
}
