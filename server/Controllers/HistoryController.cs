using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using server.Models;
using server.RequestModels;

namespace server.Controllers; 

[ApiController]
[Route("/api")]
[Authorize]
public class HistoryController : ControllerBase {
    private readonly ApplicationDbContext _dbContext;

    public HistoryController( ApplicationDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    [HttpGet("history/{userId}")]
    public async Task<ActionResult<List<Histories>>> GetHistory(Guid userId)
    {
      var histories = await _dbContext.Histories.Where(h => h.User.UserId == userId).Include(h => h.User).OrderByDescending(h => h.Date).ToListAsync();
      if(histories is null){
        return NotFound();
      }
      return histories;
    }

    [HttpPost("history/create")]
    public async Task<ActionResult<Histories>> CreateHistory(CreateHistoryRequest history)
    {
        var user = await _dbContext.Users.FirstOrDefaultAsync(u => u.UserId == history.UserId);
        if(user is null){
          return NotFound();
        }
        var newHistory = new Histories{
          Date = DateTime.Now,
          Role = history.Role,
          CoinSpending = history.CoinSpending,
          Restaurant = history.Restaurant,
          Category = history.Category,
          Owner = history.Owner,
          Menu = history.Menu,
          Location = history.Location,
          User = user,
          OrderFarkId = history.OrderFarkId,
        };
        _dbContext.Histories.Add(newHistory);
        await _dbContext.SaveChangesAsync();
        return CreatedAtAction("GetHistory", new { userId = newHistory.User.UserId }, history);
    }

    [HttpPut("history/update/{orderFarkId}")]
    public async Task<ActionResult> updateHistory(Guid orderFarkId, UpdateFarkRequest historyRequest)
    {
      var history = await _dbContext.Histories.FirstOrDefaultAsync(h => h.OrderFarkId == orderFarkId);
      if(history is null){
        return NotFound();
      }
      history.Menu = historyRequest.Menu;
      history.Location = historyRequest.Location;
      await _dbContext.SaveChangesAsync();
      return NoContent();
    }
}

