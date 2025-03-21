import { useEffect, useState } from "react";
import { Book } from "./types/Book"; // ✅ Ensure correct path

function BookList() {
  const [books, setBooks] = useState<Book[]>([]);
  const [pageSize, setPageSize] = useState<number>(5);
  const [pageNum, setPageNum] = useState<number>(1);
  const [totalItems, setTotalItems] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [sortBy, setSortBy] = useState<string>("title"); // ✅ Sorting state

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch(
          `http://localhost:4000/api/books?pageSize=${pageSize}&pageNum=${pageNum}&sortBy=${sortBy}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch books");
        }

        const data = await response.json();
        console.log("Fetched books:", data); // ✅ Debugging

        setBooks(data.books || []);
        setTotalItems(data.totalNumBooks);
        setTotalPages(Math.ceil(data.totalNumBooks / pageSize));
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };

    fetchBooks();
  }, [pageSize, pageNum, sortBy]); // ✅ Re-fetch when sorting changes

  return (
    <div className="container mt-4">
      <h2 className="mb-4">📚 Online Bookstore</h2>

      {/* Sorting Dropdown */}
      <div className="mb-3">
        <label className="me-2"><strong>Sort by:</strong></label>
        <select 
          value={sortBy} 
          onChange={(e) => setSortBy(e.target.value)}
          className="form-select w-auto d-inline-block"
        >
          <option value="title">Title</option>
          <option value="author">Author</option>
          <option value="price">Price</option>
        </select>
      </div>

      {/* Books Table */}
      {books.length > 0 ? (
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Title</th>
              <th>Author</th>
              <th>Publisher</th>
              <th>ISBN</th>
              <th>Category</th>
              <th>Pages</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book) => (
              <tr key={book.bookId}>
                <td>{book.title}</td>
                <td>{book.author}</td>
                <td>{book.publisher}</td>
                <td>{book.isbn}</td>
                <td>{book.category}</td>
                <td>{book.pageCount}</td>
                <td>${book.price.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No books available.</p>
      )}

      {/* Pagination Controls */}
      <div className="pagination-controls d-flex align-items-center mt-3">
        <button 
          className="btn btn-secondary me-2"
          disabled={pageNum === 1}
          onClick={() => setPageNum(pageNum - 1)}
        >
          Previous
        </button>

        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index + 1}
            onClick={() => setPageNum(index + 1)}
            className={`btn me-1 ${pageNum === index + 1 ? "btn-primary" : "btn-outline-primary"}`}
          >
            {index + 1}
          </button>
        ))}

        <button 
          className="btn btn-secondary ms-2"
          disabled={pageNum === totalPages}
          onClick={() => setPageNum(pageNum + 1)}
        >
          Next
        </button>
      </div>

      {/* Page Size Selector */}
      <div className="mt-3">
        <label><strong>Results per page:</strong></label>
        <select 
          value={pageSize} 
          onChange={(e) => setPageSize(Number(e.target.value))}
          className="form-select w-auto d-inline-block ms-2"
        >
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="20">20</option>
        </select>
      </div>
    </div>
  );
}

export default BookList;
