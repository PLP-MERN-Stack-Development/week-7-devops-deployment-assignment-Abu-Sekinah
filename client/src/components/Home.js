import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Home = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    isbn: '',
    publishedYear: '',
    genre: '',
    description: ''
  });

  // Fetch books from API
  const fetchBooks = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/books');
      setBooks(response.data.data || []);
      setError('');
    } catch (err) {
      console.error('Error fetching books:', err);
      setError('Failed to fetch books. Make sure the server is running.');
      setBooks([]);
    } finally {
      setLoading(false);
    }
  };

  // Load books when component mounts
  useEffect(() => {
    fetchBooks();
  }, []);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.title.trim() || !formData.author.trim()) {
      setError('Title and author are required!');
      return;
    }

    try {
      setError('');
      setSuccess('');
      
      const response = await axios.post('/api/books', {
        ...formData,
        publishedYear: formData.publishedYear ? parseInt(formData.publishedYear) : undefined
      });

      if (response.data.success) {
        setSuccess('Book added successfully!');
        setFormData({
          title: '',
          author: '',
          isbn: '',
          publishedYear: '',
          genre: '',
          description: ''
        });
        fetchBooks(); // Refresh the books list
      }
    } catch (err) {
      console.error('Error adding book:', err);
      setError(
        err.response?.data?.message || 
        'Failed to add book. Please try again.'
      );
    }
  };

  // Handle book deletion
  const handleDelete = async (bookId) => {
    if (!window.confirm('Are you sure you want to delete this book?')) {
      return;
    }

    try {
      await axios.delete(`/api/books/${bookId}`);
      setSuccess('Book deleted successfully!');
      fetchBooks(); // Refresh the books list
    } catch (err) {
      console.error('Error deleting book:', err);
      setError('Failed to delete book. Please try again.');
    }
  };

  // Format date for display
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="container">
      {/* Header */}
      <div className="header">
        <h1>📚 MERN Books Library</h1>
        <p>Manage your book collection with MongoDB, Express, React, and Node.js</p>
      </div>

      {/* Add Book Form */}
      <div className="form-container">
        <h2>📖 Add New Book</h2>
        
        {error && <div className="error">{error}</div>}
        {success && <div className="success">{success}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="title">Title *</label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Enter book title"
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="author">Author *</label>
              <input
                type="text"
                id="author"
                name="author"
                value={formData.author}
                onChange={handleInputChange}
                placeholder="Enter author name"
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="isbn">ISBN</label>
              <input
                type="text"
                id="isbn"
                name="isbn"
                value={formData.isbn}
                onChange={handleInputChange}
                placeholder="Enter ISBN"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="publishedYear">Published Year</label>
              <input
                type="number"
                id="publishedYear"
                name="publishedYear"
                value={formData.publishedYear}
                onChange={handleInputChange}
                placeholder="e.g., 2023"
                min="1000"
                max={new Date().getFullYear()}
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="genre">Genre</label>
              <input
                type="text"
                id="genre"
                name="genre"
                value={formData.genre}
                onChange={handleInputChange}
                placeholder="e.g., Fiction, Science, Biography"
              />
            </div>
          </div>
          
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Brief description of the book"
              rows="3"
            />
          </div>
          
          <button type="submit" className="btn btn-primary">
            Add Book to Library
          </button>
        </form>
      </div>

      {/* Books List */}
      <div className="books-section">
        <h2>📚 Your Books ({books.length})</h2>
        
        {loading ? (
          <div className="loading">Loading books...</div>
        ) : error && books.length === 0 ? (
          <div className="error">
            {error}
            <br />
            <small>Make sure MongoDB is running and the server is started.</small>
          </div>
        ) : books.length === 0 ? (
          <div className="no-books">
            <h3>No books in your library yet</h3>
            <p>Add your first book using the form above!</p>
          </div>
        ) : (
          <div className="books-grid">
            {books.map((book) => (
              <div key={book._id} className="book-card">
                <h3>{book.title}</h3>
                <p><strong>Author:</strong> {book.author}</p>
                {book.genre && <p><strong>Genre:</strong> {book.genre}</p>}
                {book.publishedYear && <p><strong>Published:</strong> {book.publishedYear}</p>}
                {book.isbn && <p><strong>ISBN:</strong> {book.isbn}</p>}
                {book.description && (
                  <p><strong>Description:</strong> {book.description}</p>
                )}
                
                <div className="book-meta">
                  <small>Added: {formatDate(book.createdAt)}</small>
                  <button 
                    onClick={() => handleDelete(book._id)}
                    className="btn btn-danger"
                    style={{ padding: '0.5rem 1rem', fontSize: '0.8rem' }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;