using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using server.Models;
using server.RequestModels;

namespace server.Controllers;

[ApiController]
[Route("/api")]
public class OrderController : ControllerBase
{
    private readonly ILogger<OrderController> _logger;
    private readonly ApplicationDbContext _dbContext;

    public OrderController(ILogger<OrderController> logger, ApplicationDbContext dbContext)
    {
        _logger = logger;
        _dbContext = dbContext;
    }

    //get all order
    [HttpGet("order")]
    public async Task<ActionResult<List<Orders>>> GetOrders(string username)
    {
        var orders = await _dbContext.Orders.Where(o => o.User.Username != username).Include(o => o.User).ToListAsync();
        if(orders is null){
          return BadRequest();
        }
        return orders;
    } 

    //get single order
    [HttpGet("order/{id}")]
    public async Task<ActionResult<Orders?>> GetOrder(Guid id)
    {
      var order = await _dbContext.Orders.Include(o => o.User).FirstOrDefaultAsync(orders => orders.OrderId == id);
      if(order is null){
        return BadRequest();
      }
        return order;
    }
    
    //get my order
    [HttpGet("myorder/{userId}")]
    public async Task<ActionResult<List<Orders>>> GetMyOrder(Guid userId)
    {
        var orders = await _dbContext.Orders.Where(o=>o.User.UserId == userId).Include(o => o.User).ToListAsync();
        if(orders is null){
          return BadRequest();
        }
        return orders;
    }
    
    
    //create order
    [HttpPost("order/create")]
    public async Task<ActionResult<Orders>> CreateOrder(CreateOrderRequest order)
    {
        var user = await _dbContext.Users.FirstOrDefaultAsync( u=> u.UserId == order.UserId);
        if(user is null){
            return BadRequest();
        }

        var newOrder = new Orders
        {
            Restaurant = order.Restaurant,
            Category = order.Category,
            LimitAmount = order.LimitAmount,
            CurrentAmount = order.CurrentAmount,
            Status = order.Status,
            User = user
        };
        _dbContext.Orders.Add(newOrder);
        await _dbContext.SaveChangesAsync();
        return CreatedAtAction("GetOrder", new { id = newOrder.OrderId }, order); 
    }

   //delete order
   [HttpDelete("order/delete/{id}")]
   public async Task<IActionResult> DeleteOrder(Guid id)
   {
       var order = await _dbContext.Orders.FindAsync(id);
       var farkList = await _dbContext.Farks.Where(f => f.Order.OrderId == id).Include(f => f.Order).ToListAsync();
       if (order == null || farkList == null)
       {
           return NotFound();
       }
       foreach(Farks item in farkList){
         _dbContext.Farks.Remove(item);
       }
       _dbContext.Orders.Remove(order);
       await _dbContext.SaveChangesAsync();
       return NoContent();
   }
}
