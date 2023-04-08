using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using server.Models;
using server.RequestModels;

namespace server.Controllers;

[ApiController]
[Route("/api")]
public class FarkController : ControllerBase
{
    private readonly ILogger<FarkController> _logger;
    private readonly ApplicationDbContext _dbContext;

    public FarkController(ILogger<FarkController> logger, ApplicationDbContext dbContext)
    {
        _logger = logger;
        _dbContext = dbContext;
    }

    [HttpGet("fark")]
    public async Task<ActionResult<List<Farks>>> GetFarks()
    {
        return await _dbContext.Farks.Include(f => f.User).Include(f=>f.Order).ThenInclude(f=>f.User).ToListAsync();
    }

    [HttpGet("fark/{id}")]
    public async Task<ActionResult<Farks?>> GetFark(Guid id)
    {
        return await _dbContext.Farks.Include(f => f.User).Include(f=>f.Order).ThenInclude(f=>f.User).FirstOrDefaultAsync(farks => farks.FarkId == id);
    }
    
    [HttpGet("fark/myfark/{userId}")]
    public async Task<ActionResult<List<Farks>>> GetMyFark(Guid userId)
    {
        return await _dbContext.Farks.Where(farks=>farks.User.UserId == userId).Include(f => f.User).Include(f=>f.Order).ThenInclude(f=>f.User).ToListAsync();
    }

    [HttpGet("fark/myorder/{orderId}")]
    public async Task<ActionResult<List<Farks>>> GetFarkOrders(Guid orderId){
      return await _dbContext.Farks.Where(farks=>farks.Order.OrderId == orderId).Include(f => f.User).Include(f => f.Order).ToListAsync();
    }

    [HttpPut("fark/status/order/{orderId}")]
    public async Task<ActionResult<Farks>> UpdateFarkStatusByOrder(Guid orderId, string status){
      var fark = await _dbContext.Farks.Where(farks=>farks.Order.OrderId == orderId).Include(f => f.User).Include(f => f.Order).ToListAsync();
      if(fark is null){
        return BadRequest();
      }
      foreach(var item in fark){
        item.Status = status;
      }
      await _dbContext.SaveChangesAsync();
      return NoContent();
    }
    
    [HttpPut("fark/status/{id}")]
    public async Task<ActionResult<Farks>> UpdateFarkStatus(Guid id, string status){
      var fark = await _dbContext.Farks.Include(f => f.User).Include(f => f.Order).FirstOrDefaultAsync(fark => fark.FarkId == id);
      if(fark is null){
        return BadRequest();
      }
      fark.Status = status;
      await _dbContext.SaveChangesAsync();
      return NoContent();
    }

    //create fark
    [HttpPost("fark/create")]
    public async Task<ActionResult<Farks>> CreateOrder(CreateFarkRequest fark)
    {
        var user = await _dbContext.Users.FirstOrDefaultAsync( u=> u.UserId == fark.UserId);
        var order = await _dbContext.Orders.FirstOrDefaultAsync(o => o.OrderId == fark.OrderId);
        if (user is null || order is null)
        {
            return BadRequest();
        }

        if (user.FarkCoin == 0)
        {
            return BadRequest("Not enough Fark Coin");
        }

        user.FarkCoin -= 1;

        if (order.CurrentAmount == order.LimitAmount - 1)
        {
            order.Status = false;
        }

        order.CurrentAmount += 1;
        
        var newFark = new Farks
        {
            Menu = fark.Menu,
            Location = fark.Location,
            Status = fark.Status,
            User = user,
            Order = order,
        };
        _dbContext.Farks.Add(newFark);
        await _dbContext.SaveChangesAsync();
        return CreatedAtAction("GetFark", new { id = newFark.FarkId }, fark); 
    }
    
    [HttpDelete("fark/{id}")]
   public async Task<IActionResult> DeleteFark(Guid id)
   {
       var fark = await _dbContext.Farks.Include(o=>o.Order).FirstOrDefaultAsync(f => f.FarkId == id);
       if (fark is null)
       {
           return NotFound();
       }
       fark.Order.CurrentAmount -= 1;
       _dbContext.Farks.Remove(fark);
       await _dbContext.SaveChangesAsync();
       return NoContent();
   }
}
