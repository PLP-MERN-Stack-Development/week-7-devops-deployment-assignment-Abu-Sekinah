const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Book title is required'],
    trim: true,
    maxlength: [100, 'Title cannot exceed 100 characters']
  },
  author: {
    type: String,
    required: [true, 'Author name is required'],
    trim: true,
    maxlength: [50, 'Author name cannot exceed 50 characters']
  },
  isbn: {
    type: String,
    unique: true,
    sparse: true,
    trim: true
  },
  publishedYear: {
    type: Number,
    min: [1000, 'Invalid publication year'],
    max: [new Date().getFullYear(), 'Publication year cannot be in the future']
  },
  genre: {
    type: String,
    trim: true
  },
  description: {
    type: String,
    trim: true,
    maxlength: [500, 'Description cannot exceed 500 characters']
  }
}, {
  timestamps: true // Adds createdAt and updatedAt fields
});

// Create indexes for better query performance
BookSchema.index({ title: 1 });
BookSchema.index({ author: 1 });

module.exports = mongoose.model('Book', BookSchema);