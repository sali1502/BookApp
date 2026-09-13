using System.Security.Claims;
using Backend.Data;
using Backend.DTOs;
using Backend.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Backend.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class QuotesController : ControllerBase
{
    private readonly AppDbContext _context;

    public QuotesController(AppDbContext context)
    {
        _context = context;
    }

    private int CurrentUserId =>
        int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Quote>>> GetQuotes()
    {
        return await _context.Quotes.Where(q => q.UserId == CurrentUserId).ToListAsync();
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Quote>> GetQuote(int id)
    {
        var quote = await _context.Quotes.FindAsync(id);
        if (quote == null || quote.UserId != CurrentUserId)
        {
            return NotFound();
        }
        return quote;
    }

    [HttpPost]
    public async Task<ActionResult<Quote>> CreateQuote([FromBody] CreateQuoteDto dto)
    {
        var quote = new Quote
        {
            Text = dto.Text,
            Author = dto.Author,
            UserId = CurrentUserId
        };

        _context.Quotes.Add(quote);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetQuote), new { id = quote.Id }, quote);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateQuote(int id, [FromBody] UpdateQuoteDto dto)
    {
        var quote = await _context.Quotes.FindAsync(id);
        if (quote == null || quote.UserId != CurrentUserId)
        {
            return NotFound();
        }

        quote.Text = dto.Text;
        quote.Author = dto.Author;

        await _context.SaveChangesAsync();
        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteQuote(int id)
    {
        var quote = await _context.Quotes.FindAsync(id);
        if (quote == null || quote.UserId != CurrentUserId)
        {
            return NotFound();
        }

        _context.Quotes.Remove(quote);
        await _context.SaveChangesAsync();
        return NoContent();
    }
}
