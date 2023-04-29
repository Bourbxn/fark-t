using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using server.Models;
using JwtRegisteredClaimNames = Microsoft.IdentityModel.JsonWebTokens.JwtRegisteredClaimNames;

namespace server.Controllers;

[ApiController]
[Route("/api")]
public class AuthController : ControllerBase
{
    private readonly ApplicationDbContext _dbContext;
    public IConfiguration _configuration;

    public AuthController(IConfiguration configuration, ApplicationDbContext dbContext)
    {
        _configuration = configuration;
        _dbContext = dbContext;
    }
    
    [HttpPost("login")]
    public async Task<IActionResult> Login(string username, string password)
    {
        var user =  await _dbContext.Users.FirstOrDefaultAsync(user => user.Username == username);
        if (user is null)
        {
            return NotFound();
        }

        if (password == user.Password)
        {
            var jwt = _configuration.GetSection("Jwt").Get<Jwt>();
            var claims = new[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, jwt.Subject),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                new Claim(JwtRegisteredClaimNames.Iat, DateTime.UtcNow.ToString()),
                new Claim("Id", user.UserId.ToString()),
                new Claim("Username", user.Username),
                new Claim("Password", user.Password),
            };
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwt.key));
            var login = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
            var token = new JwtSecurityToken(
                jwt.Issuer,
                jwt.Audience,
                claims,
                expires: DateTime.Now.AddMinutes(30),
                signingCredentials: login
            );
            return Ok(new JwtSecurityTokenHandler().WriteToken(token));
        }
        else
        {
            return BadRequest();
        }
    }
    
}
