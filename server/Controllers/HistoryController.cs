using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using server.Models;
using server.RequestModels;

namespace server.Controllers; 

[ApiController]
[Route("/api")]
public class HistoryController : ControllerBase {
    private readonly ILogger<HistoryController> _logger;
    private readonly ApplicationDbContext _dbContext;

    public HistoryController(ILogger<HistoryController> logger, ApplicationDbContext dbContext)
    {
        _logger = logger;
        _dbContext = dbContext;
    }

    [HttpGet("history")]
    public async Task<ActionResult<List<Histories>>> GetHistory()
    {
      return await _dbContext.Histories.ToListAsync();
    }

    [HttpGet("history/{userId}")]
    public async Task<ActionResult<List<Histories>>> GetHistoryByUserId(Guid userId)
    {
      return await _dbContext.Histories.Where(h => h.User.UserId == userId).Include(h => h.User).ToListAsync();
    }

    [HttpPost("history/create")]
    public async Task<ActionResult<Histories>> CreateHistory(CreateHistoryRequest history)
    {
        var user = await _dbContext.Users.FirstOrDefaultAsync(u => u.UserId == history.UserId);
        if(user is null){
          return BadRequest();
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
          User = user
        };
        _dbContext.Histories.Add(newHistory);
        await _dbContext.SaveChangesAsync();
        return CreatedAtAction("GetHistory", new { id = newHistory.HistoryId}, history);
    }
}

