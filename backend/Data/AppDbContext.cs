using Backend.Models;
using Microsoft.EntityFrameworkCore;

namespace Backend.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
    {
    }

    public DbSet<User> Users => Set<User>();
    public DbSet<Book> Books => Set<Book>();
    public DbSet<Quote> Quotes => Set<Quote>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // Seed 3 sample Books
        modelBuilder.Entity<Book>().HasData(
            new Book
            {
                Id = 1,
                Title = "Sagan om Ringen",
                Author = "J.R.R. Tolkien",
                PublishDate = new DateTime(1954, 7, 29),
                UserId = 1
            },
            new Book
            {
                Id = 2,
                Title = "1984",
                Author = "George Orwell",
                PublishDate = new DateTime(1949, 6, 8),
                UserId = 1
            },
            new Book
            {
                Id = 3,
                Title = "Stolthet och fördom",
                Author = "Jane Austen",
                PublishDate = new DateTime(1813, 1, 28),
                UserId = 1
            }
        );

        // Seed 5 sample Quotes ("Mina citat")
        modelBuilder.Entity<Quote>().HasData(
            new Quote
            {
                Id = 1,
                Text = "Det enda vi har att frukta är fruktan själv.",
                Author = "Franklin D. Roosevelt",
                UserId = 1
            },
            new Quote
            {
                Id = 2,
                Text = "Ett osökande liv är inte värt att leva.",
                Author = "Sokrates",
                UserId = 1
            },
            new Quote
            {
                Id = 3,
                Text = "Bli den förändring du vill se i världen.",
                Author = "Mahatma Gandhi",
                UserId = 1
            },
            new Quote
            {
                Id = 4,
                Text = "Det är aldrig för sent att bli vad du kunde ha varit.",
                Author = "George Eliot",
                UserId = 1
            },
            new Quote
            {
                Id = 5,
                Text = "Kunskap är makt.",
                Author = "Francis Bacon",
                UserId = 1
            }
        );
    }
}
