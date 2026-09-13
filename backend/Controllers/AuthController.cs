using Backend.DTOs;
using Backend.Services;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly IAuthService _authService;
    private readonly IConfiguration _configuration;

    public AuthController(IAuthService authService, IConfiguration configuration)
    {
        _authService = authService;
        _configuration = configuration;
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] RegisterDto dto)
    {
        if (string.IsNullOrWhiteSpace(dto.Username) || string.IsNullOrWhiteSpace(dto.Password))
        {
            return BadRequest(new { message = "Användarnamn och lösenord krävs." });
        }

        var result = await _authService.RegisterAsync(dto);
        if (result == null)
        {
            return BadRequest(new { message = "Användarnamnet upptaget." });
        }

        SetAuthCookie(result.Token);
        return Ok(new { username = result.Username });
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginDto dto)
    {
        if (string.IsNullOrWhiteSpace(dto.Username) || string.IsNullOrWhiteSpace(dto.Password))
        {
            return BadRequest(new { message = "Användarnamn och lösenord krävs." });
        }

        var result = await _authService.LoginAsync(dto);
        if (result == null)
        {
            return Unauthorized(new { message = "Felaktigt användarnamn eller lösenord." });
        }

        SetAuthCookie(result.Token);
        return Ok(new { username = result.Username });
    }

    [HttpPost("logout")]
    public IActionResult Logout()
    {
        Response.Cookies.Delete("bookapp_auth");
        return NoContent();
    }

    private void SetAuthCookie(string token)
    {
        var secure = bool.Parse(_configuration["AuthCookie:Secure"] ?? "false");
        var sameSite = Enum.Parse<SameSiteMode>(
            _configuration["AuthCookie:SameSite"] ?? nameof(SameSiteMode.Lax));

        Response.Cookies.Append("bookapp_auth", token, new CookieOptions
        {
            HttpOnly = true,
            SameSite = sameSite,
            Secure = secure,
            Expires = DateTimeOffset.UtcNow.AddDays(7),
            IsEssential = true
        });
    }
}
