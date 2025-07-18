const express = require('express');
const router = express.Router();
const Book = require('../models/Book');

// GET /api/books - Get all books
router.get('/', async (req, res) => {
  try {
    const books = await Book.find().sort({ createdAt: -1 });
    res.json({
      success: true,
      count: books.length,
      data: books
    });
  } catch (error) {
    console.error('Error fetching books:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching books',
      error: error.message
    });
  }
});

// GET /api/books/:id - Get a single book
router.get('/:id', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({
        success: false,
        message: 'Book not found'
      });
    }
    res.json({
      success: true,
      data: book
    });
  } catch (error) {
    console.error('Error fetching book:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching book',
      error: error.message
    });
  }
});

// POST /api/books - Add a new book
router.post('/', async (req, res) => {
  try {
    const { title, author, isbn, publishedYear, genre, description } = req.body;

    // Validation
    if (!title || !author) {
      return res.status(400).json({
        success: false,
        message: 'Title and author are required'
      });
    }

    const newBook = new Book({
      title,
      author,
      isbn,
      publishedYear,
      genre,
      description
    });

    const savedBook = await newBook.save();
    
    res.status(201).json({
      success: true,
      message: 'Book added successfully',
      data: savedBook
    });
  } catch (error) {
    console.error('Error adding book:', error);
    
    // Handle validation errors
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        error: error.message
      });
    }
    
    // Handle duplicate key error (unique constraint)
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'A book with this ISBN already exists'
      });
    }

    res.status(500).json({
      success: false,
      message: 'Error adding book',
      error: error.message
    });
  }
});

// PUT /api/books/:id - Update a book
router.put('/:id', async (req, res) => {
  try {
    const updatedBook = await Book.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedBook) {
      return res.status(404).json({
        success: false,
        message: 'Book not found'
      });
    }

    res.json({
      success: true,
      message: 'Book updated successfully',
      data: updatedBook
    });
  } catch (error) {
    console.error('Error updating book:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating book',
      error: error.message
    });
  }
});

// DELETE /api/books/:id - Delete a book
router.delete('/:id', async (req, res) => {
  try {
    const deletedBook = await Book.findByIdAndDelete(req.params.id);

    if (!deletedBook) {
      return res.status(404).json({
        success: false,
        message: 'Book not found'
      });
    }

    res.json({
      success: true,
      message: 'Book deleted successfully',
      data: deletedBook
    });
  } catch (error) {
    console.error('Error deleting book:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting book',
      error: error.message
    });
  }
});

module.exports = router;