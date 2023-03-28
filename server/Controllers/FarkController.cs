using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using server.Models;

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
        return await _dbContext.Farks.ToListAsync();
    }

    [HttpGet("fark/{id}")]
    public async Task<ActionResult<List<Farks>>> GetFark(Guid id)
    {
        return await _dbContext.Farks.Where(farks => farks.FarkId == id).ToListAsync();
    }

    [HttpPost("fark/create")]
    public async Task<ActionResult<Farks>> CreateFark(Farks fark)
    {
        _dbContext.Farks.Add(fark);
        await _dbContext.SaveChangesAsync();
        return CreatedAtAction("GetFark", new { id = fark.FarkId }, fark);
    }
    
    [HttpDelete("fark/delete/{id}")]
   public async Task<IActionResult> DeleteFark(Guid id)
   {
       var fark = await _dbContext.Farks.FindAsync(id);
       if (fark == null)
       {
           return NotFound();
       }
       _dbContext.Farks.Remove(fark);
       await _dbContext.SaveChangesAsync();
       return NoContent();
   }
}