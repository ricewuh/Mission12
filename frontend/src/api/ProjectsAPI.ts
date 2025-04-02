import { Book } from '../types/Book';

interface FetchBooksResponse {
  books: Book[];
  totalNumBooks: number;
}

const API_URL = 'https://bookstore-joseph-backend.azurewebsites.net/Book';

export const fetchBooks = async (
  pageSize: number,
  pageNum: number,
  selectedCategories: string[]
): Promise<FetchBooksResponse> => {
  const categoryParams = selectedCategories
    .map((cat) => `bookCategories=${encodeURIComponent(cat)}`)
    .join('&');

  const response = await fetch(
    `${API_URL}?pageSize=${pageSize}&pageNum=${pageNum}${
      selectedCategories.length ? `&${categoryParams}` : ''
    }`
  );

  if (!response.ok) {
    throw new Error('Failed to fetch books');
  }

  return await response.json();
};

export const addBook = async (newBook: Book): Promise<Book> => {
  const response = await fetch(`${API_URL}/AddBook`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newBook),
  });

  if (!response.ok) {
    throw new Error('Failed to add book');
  }

  return await response.json();
};

export const updateBook = async (
  bookId: number,
  updatedBook: Book
): Promise<Book> => {
  const response = await fetch(`${API_URL}/UpdateBook/${bookId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updatedBook),
  });

  if (!response.ok) {
    throw new Error('Failed to update book');
  }

  return await response.json();
};

export const deleteBook = async (bookId: number): Promise<void> => {
  const response = await fetch(`${API_URL}/DeleteBook/${bookId}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error('Failed to delete book');
  }
};

export const fetchBookById = async (bookId: number): Promise<Book> => {
    try {
      const response = await fetch(`${API_URL}/GetBookById/${bookId}`);
  
      if (!response.ok) {
        throw new Error('Failed to fetch book by ID');
      }
  
      return await response.json();
    } catch (error) {
      console.error('Error fetching book by ID:', error);
      throw error;
    }
  };
  