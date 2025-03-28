import { useEffect, useState } from "react";
import { Book } from "../types/Book";
import { useCart } from "../context/CartContext";

function BookList({ selectedCategories }: { selectedCategories: string[] }) {
  const [books, setBooks] = useState<Book[]>([]);
  const [pageSize, setPageSize] = useState<number>(10);
  const [pageNum, setPageNum] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const { addToCart } = useCart(); // ✅ Use cart context

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
      {books.map((b) => (
        <div id="bookCard" className="card mb-3" key={b.bookId}>
          <h3 className="card-title">{b.title}</h3>
          <div className="card-body">
            <ul className="list-unstyled">
              <li><strong>Author:</strong> {b.author}</li>
              <li><strong>Publisher:</strong> {b.publisher}</li>
              <li><strong>ISBN:</strong> {b.isbn}</li>
              <li><strong>Classification:</strong> {b.classification}</li>
              <li><strong>Category:</strong> {b.category}</li>
              <li><strong>Page Count:</strong> {b.pageCount}</li>
              <li><strong>Price:</strong> ${b.price}</li>
            </ul>
            <button
              className="btn btn-success"
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
      ))}

      <div className="mb-3">
        <button disabled={pageNum === 1} onClick={() => setPageNum(pageNum - 1)}>
          Previous
        </button>

        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i + 1}
            onClick={() => setPageNum(i + 1)}
            disabled={pageNum === i + 1}
          >
            {i + 1}
          </button>
        ))}

        <button disabled={pageNum === totalPages} onClick={() => setPageNum(pageNum + 1)}>
          Next
        </button>
      </div>

      <label>
        Results per page:{" "}
        <select
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
