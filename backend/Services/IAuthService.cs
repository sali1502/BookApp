using Backend.DTOs;
using Backend.Models;

namespace Backend.Services;

public interface IAuthService
{
    Task<AuthResponseDto?> RegisterAsync(RegisterDto dto);
    Task<AuthResponseDto?> LoginAsync(LoginDto dto);
    string CreateToken(User user);
}
