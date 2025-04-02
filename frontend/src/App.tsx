import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import BooksPage from './pages/BooksPage';
import CartPage from './pages/CartPage';
import AdminBooksPage from './pages/AdminBooksPage';
import BookForm from './pages/BookForm';
import CartSummary from './components/CartSummary';


function App() {
  return (
    <CartProvider>
      <Router>
      <CartSummary />
        <Routes>
          {/* Public Pages */}
          <Route path="/" element={<BooksPage />} />
          <Route path="/cart" element={<CartPage />} />

          {/* Admin Pages */}
          <Route path="/adminbooks" element={<AdminBooksPage />} />
          <Route path="/adminbooks/new" element={<BookForm />} />
          <Route path="/adminbooks/edit/:id" element={<BookForm />} />
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;
