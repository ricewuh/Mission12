using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Bookstore.API.Data;

namespace Bookstore.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BooksController : ControllerBase
    {
        private BooksDbContext _context;

        public BooksController(BooksDbContext context) => _context = context;

        // ✅ GET: api/books?pageSize=5&pageNum=1
        [HttpGet]
        public IActionResult GetBooks(int pageSize = 5, int pageNum = 1, string? sortBy = "title")
        {
            var booksQuery = _context.Books.AsQueryable();

            // Sorting
            booksQuery = sortBy.ToLower() switch
            {
                "title" => booksQuery.OrderBy(b => b.Title),
                "author" => booksQuery.OrderBy(b => b.Author),
                "price" => booksQuery.OrderBy(b => b.Price),
                _ => booksQuery
            };

            // Pagination
            var books = booksQuery
                .Skip((pageNum - 1) * pageSize)
                .Take(pageSize)
                .ToList();

            var totalNumBooks = _context.Books.Count();

            var response = new
            {
                Books = books,
                TotalNumBooks = totalNumBooks
            };

            return Ok(response);
        }
    }
}