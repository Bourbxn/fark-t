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
      return await _dbContext.Histories.Include(h => h.User).Include(h => h.Order).Include(h => h.Fark).ToListAsync();
    }

}

