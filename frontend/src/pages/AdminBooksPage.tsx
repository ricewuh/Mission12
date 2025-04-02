import { useEffect, useState } from 'react';
import { Book } from '../types/Book';
import { deleteBook, fetchBooks } from '../api/ProjectsAPI';
import { useNavigate } from 'react-router-dom';

const AdminBooksPage = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const navigate = useNavigate();

  const loadBooks = async () => {
    try {
      const data = await fetchBooks(100, 1, []);
      setBooks(data.books);
    } catch (error) {
      console.error('Failed to load books');
    }
  };

  const handleDelete = async (id: number) => {
    if (confirm('Are you sure you want to delete this book?')) {
      await deleteBook(id);
      loadBooks();
    }
  };

  useEffect(() => {
    loadBooks();
  }, []);

  return (
    <div className="container mt-4">
      <h2>Admin Book Management</h2>
      <button className="btn btn-primary mb-3" onClick={() => navigate('/adminbooks/new')}>
        Add New Book
      </button>

      {books.map((b) => (
        <div key={b.bookId} className="card mb-3 p-3 shadow-sm">
          <h5>{b.title}</h5>
          <p>Author: {b.author}</p>
          <div className="d-flex gap-2">
            <button className="btn btn-warning" onClick={() => navigate(`/adminbooks/edit/${b.bookId}`)}>Edit</button>
            <button className="btn btn-danger" onClick={() => handleDelete(b.bookId)}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AdminBooksPage;
