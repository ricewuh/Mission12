import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Book } from '../types/Book';
import { addBook, fetchBookById, updateBook } from '../api/ProjectsAPI';

const BookForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  const [formData, setFormData] = useState<Book>({
    bookId: 0,
    title: '',
    author: '',
    publisher: '',
    isbn: '',
    category: '',
    classification: '', 
    pageCount: 0,
    price: 0
  });
  

  useEffect(() => {
    if (isEdit && id) {
      const loadBook = async () => {
        try {
          const data = await fetchBookById(parseInt(id));
          setFormData(data);
        } catch (error) {
          console.error('Error loading book');
        }
      };
      loadBook();
    }
  }, [id, isEdit]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isEdit) {
      await updateBook(formData.bookId, formData);
    } else {
      await addBook(formData);
    }

    navigate('/adminbooks');
  };

  return (
    <div className="container mt-4">
      <h2>{isEdit ? 'Edit Book' : 'Add New Book'}</h2>
      <form onSubmit={handleSubmit} className="row g-3">
        <input name="title" className="form-control" placeholder="Title" value={formData.title} onChange={handleChange} />
        <input name="author" className="form-control" placeholder="Author" value={formData.author} onChange={handleChange} />
        <input name="publisher" className="form-control" placeholder="Publisher" value={formData.publisher} onChange={handleChange} />
        <input name="isbn" className="form-control" placeholder="ISBN" value={formData.isbn} onChange={handleChange} />
        <input name="category" className="form-control" placeholder="Category" value={formData.category} onChange={handleChange} />
        <input name="classification" className="form-control" placeholder="Classification" value={formData.classification} onChange={handleChange}/>
        <input name="pageCount" type="number" className="form-control" placeholder="Page Count" value={formData.pageCount} onChange={handleChange} />
        <input name="price" type="number" step="0.01" className="form-control" placeholder="Price" value={formData.price} onChange={handleChange} />
        <div className="d-flex gap-2">
          <button type="submit" className="btn btn-success">{isEdit ? 'Update' : 'Add'}</button>
          <button type="button" className="btn btn-secondary" onClick={() => navigate('/adminbooks')}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default BookForm;
