import { useEffect, useState } from "react";
import { Book } from "../types/Book";
import { useCart } from "../context/CartContext";

function BookList({ selectedCategories }: { selectedCategories: string[] }) {
  const [books, setBooks] = useState<Book[]>([]);
  const [pageSize, setPageSize] = useState<number>(10);
  const [pageNum, setPageNum] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchBooks = async () => {
      const categoryParams = selectedCategories
        .map((cat) => `bookCategories=${encodeURIComponent(cat)}`)
        .join("&");

      const response = await fetch(
        `https://localhost:5000/Book?pageSize=${pageSize}&pageNum=${pageNum}${
          selectedCategories.length ? `&${categoryParams}` : ""
        }`
      );
      const data = await response.json();
      setBooks(data.books);
      setTotalPages(Math.ceil(data.totalNumBooks / pageSize));
    };
    fetchBooks();
  }, [pageSize, pageNum, selectedCategories]);

  return (
    <>
      {/* Bootstrap Grid: .row and .col-md-6 .col-lg-4 */}
      <div className="row">
        {books.map((b) => (
          <div key={b.bookId} className="col-md-6 col-lg-4 mb-4">
            <div id="bookCard" className="card shadow h-100">
              <div className="card-body d-flex flex-column">
                <h5 className="card-title mb-3">{b.title}</h5>
                <ul className="list-unstyled flex-grow-1">
                  <li><strong>Author:</strong> {b.author}</li>
                  <li><strong>Publisher:</strong> {b.publisher}</li>
                  <li><strong>ISBN:</strong> {b.isbn}</li>
                  <li><strong>Classification:</strong> {b.classification}</li>
                  <li><strong>Category:</strong> {b.category}</li>
                  <li><strong>Pages:</strong> {b.pageCount}</li>
                  <li><strong>Price:</strong> ${b.price.toFixed(2)}</li>
                </ul>
                <button
                  className="btn btn-success mt-auto"
                  onClick={() =>
                    addToCart({
                      bookId: b.bookId,
                      title: b.title,
                      quantity: 1,
                      price: b.price,
                    })
                  }
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="mb-3">
        <button
          className="btn btn-outline-secondary me-2"
          disabled={pageNum === 1}
          onClick={() => setPageNum(pageNum - 1)}
        >
          Previous
        </button>

        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i + 1}
            className={`btn me-1 ${
              pageNum === i + 1 ? "btn-primary" : "btn-outline-primary"
            }`}
            onClick={() => setPageNum(i + 1)}
          >
            {i + 1}
          </button>
        ))}

        <button
          className="btn btn-outline-secondary ms-2"
          disabled={pageNum === totalPages}
          onClick={() => setPageNum(pageNum + 1)}
        >
          Next
        </button>
      </div>

      {/* Page Size Selector (Bootstrap-styled) */}
      <label>
        Results per page:{" "}
        <select
          className="form-select d-inline w-auto"
          value={pageSize}
          onChange={(p) => {
            setPageSize(Number(p.target.value));
            setPageNum(1);
          }}
        >
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="20">20</option>
        </select>
      </label>
    </>
  );
}

export default BookList;
