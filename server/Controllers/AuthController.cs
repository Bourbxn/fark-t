using Microsoft.AspNetCore.Mvc;

namespace server.Controllers;

[ApiController]
[Route("[controller]")]
public class AuthController : ControllerBase
{
    private readonly ILogger<AuthController> _logger;

    public AuthController(ILogger<AuthController> logger)
    {
        _logger = logger;
    }

    [HttpGet("login")]
    public IEnumerable<string> Get1()
    {
        return Enumerable.Range(1, 5).Select(index => $"index: {index}")
        .ToArray();
    }
}
