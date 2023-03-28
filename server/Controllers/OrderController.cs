using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using server.Models;

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
    public async Task<ActionResult<List<Orders>>> GetOrders()
    {
        return await _dbContext.Orders.ToListAsync();
    } 
    
    //get single order
    [HttpGet("order/{id}")]
    public async Task<ActionResult<List<Orders>>> GetOrder(Guid id)
    {
        return await _dbContext.Orders.Where(orders => orders.OrderId == id).ToListAsync();
    }
    
    //create order
    [HttpPost("order/create")]
    public async Task<ActionResult<Orders>> CreateOrder(Orders order)
    {
        _dbContext.Orders.Add(order);
        await _dbContext.SaveChangesAsync();
        return CreatedAtAction("GetOrder", new { id = order.OrderId }, order);
    }

   //delete order
   [HttpDelete("order/delete/{id}")]
   public async Task<IActionResult> DeleteOrder(Guid id)
   {
       var order = await _dbContext.Orders.FindAsync(id);
       if (order == null)
       {
           return NotFound();
       }
       _dbContext.Orders.Remove(order);
       await _dbContext.SaveChangesAsync();
       return NoContent();
   }
}
