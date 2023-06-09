using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using server.Models;
using server.RequestModels;

namespace server.Controllers;

[ApiController]
[Route("/api")]
public class UserController : ControllerBase
{
    private readonly ApplicationDbContext _dbContext;

    public UserController( ApplicationDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    [HttpGet("user/{id}")]
    [Authorize]
    public async Task<ActionResult<Users?>> GetUser(Guid id)
    {
        var user = await _dbContext.Users.Where(users => users.UserId == id).FirstOrDefaultAsync();
        if(user is null){
          return NotFound();
        }
        return user; 
    }

    [HttpGet("user/username/{username}")]
    [Authorize]
    public async Task<ActionResult<Boolean>> GetTakenUsernmae(string username){
      var user = await _dbContext.Users.Where(u => u.Username == username).FirstOrDefaultAsync();
      if(user is null){
        return false;
      }
      return true;
    }

    [HttpPut("user/addcoin/{id}")]
    [Authorize]
    public async Task<ActionResult<Users?>> AddFarkCoin(Guid id, int coinAdd)
    {
      var user = await _dbContext.Users.FirstOrDefaultAsync(u => u.UserId == id);
      if(user is null){
        return NotFound();
      }
      user.FarkCoin += coinAdd;
      await _dbContext.SaveChangesAsync();
      return NoContent();
    }

    [HttpPut("user/update/{id}")]
    [Authorize]
    public async Task<ActionResult<UpdateUserRequest?>> UpdateUser(Guid id, UpdateUserRequest user)
    {
      var userDb = await _dbContext.Users.FirstOrDefaultAsync(u => u.UserId == id);
      if(userDb is null){
        return NotFound();
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
          return NotFound();
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
