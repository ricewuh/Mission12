using Microsoft.EntityFrameworkCore;
using WaterProject.API.Data;

namespace WaterProject.Data
{
    public class BookDbContext : DbContext
    {
        public BookDbContext(DbContextOptions<BookDbContext> options) : base(options)
        {
        }
        public DbSet<Book> Books { get; set; }
    }
}