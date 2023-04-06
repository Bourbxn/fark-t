using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using server.Models;

namespace server.Controllers;

[ApiController]
[Route("/api")]
public class UserController : ControllerBase
{
    private readonly ILogger<UserController> _logger;
    private readonly ApplicationDbContext _dbContext;

    public UserController(ILogger<UserController> logger, ApplicationDbContext dbContext)
    {
        _logger = logger;
        _dbContext = dbContext;
    }

    [HttpGet("user/{id}")]
    public async Task<ActionResult<Users?>> GetUser(Guid id)
    {
        return await _dbContext.Users.Where(users => users.UserId == id).FirstOrDefaultAsync();
    }


    [HttpPost("user/create")]
    public async Task<ActionResult<Users>> CreateFark(Users user)
    {
        _dbContext.Users.Add(user);
        await _dbContext.SaveChangesAsync();
        return CreatedAtAction("GetUser", new { id = user.UserId }, user);
    }

}
