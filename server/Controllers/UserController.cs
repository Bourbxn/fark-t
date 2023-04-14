using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using server.Models;
using server.RequestModels;

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
        var user = await _dbContext.Users.Where(users => users.UserId == id).FirstOrDefaultAsync();
        if(user is null){
          return BadRequest();
        }
        return user; 
    }

    [HttpPut("user/addcoin/{id}")]
    public async Task<ActionResult<Users?>> AddFarkCoin(Guid id, int coinAdd)
    {
      var user = await _dbContext.Users.FirstOrDefaultAsync(u => u.UserId == id);
      if(user is null){
        return BadRequest();
      }
      user.FarkCoin += coinAdd;
      await _dbContext.SaveChangesAsync();
      return NoContent();
    }

    [HttpPut("user/update/{id}")]
    public async Task<ActionResult<UpdateUserRequest?>> UpdateUser(Guid id, UpdateUserRequest user)
    {
      var userDb = await _dbContext.Users.FirstOrDefaultAsync(u => u.UserId == id);
      if(userDb is null){
        return BadRequest();
      }
      userDb.Telephone = user.Telephone;
      userDb.Password = user.Password;
      await _dbContext.SaveChangesAsync();
      return NoContent();
    }

    [HttpPost("user/create")]
    public async Task<ActionResult<Users>> CreateFark(Users user)
    {
        var allUserDb = await _dbContext.Users.ToListAsync();
        if(allUserDb is null){
          return BadRequest();
        }
        foreach(Users u in allUserDb){
          if(user.Username == u.Username){
            return BadRequest();
          }
        }
        _dbContext.Users.Add(user);
        await _dbContext.SaveChangesAsync();
        return CreatedAtAction("GetUser", new { id = user.UserId }, user);
    }

}
