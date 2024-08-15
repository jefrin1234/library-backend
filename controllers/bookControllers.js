const Book = require('../models/bookModel');

// Get all books
const getAllBooks = async (req, res) => {
  const authorId = req.query.author;
  let books;


  try {
    if (authorId) {
      // Find books by author ID and populate the author details
      books = await Book.find({ author: authorId }).populate('author', 'name');
    } else {
      // Find all books and populate the author details
      books = await Book.find().populate('author', 'name');
    }

    if (books.length === 0) {
      return res.status(404).json({
        message: "No books found",
        success: false,
        error: true,
      });
    }
    console.log("books fetched");
    res.json(books);
  } catch (err) {
    console.error('Error fetching books:', err);
    res.status(500).json({
      message: "Error fetching books",
      success: false,
      error: true,
    });
  }
};


// Get book by ID
const getBookById = async (req, res) => {
  try {
    const { bookId } = req.params;
    const book = await Book.findById(bookId).populate('author', 'name');
    
    if (!book) {
      return res.status(404).json({
        message: "Book not found",
        success: false,
        error: true
      });
    }
    
    res.status(200).json(book);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Error fetching book",
      success: false,
      error: true
    });
  }
};

// Add a new book
const addBook = async (req, res) => {
  try {
    const { title, author, bookDetails, publishedDate, image } = req.body;
    const existingBook = await Book.findOne({ title });
    
    if (existingBook) {
      return res.status(400).json({
        message: "Book already exists",
        success: false,
        error: true
      });
    }
    
    const book = new Book({ title, author, bookDetails, publishedDate, image });
    await book.save();
    
    res.status(201).json({
      message: "New book added",
      data: book,
      success: true,
      error: false
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Error adding book",
      success: false,
      error: true
    });
  }
};

// Update book by ID
const updateBookById = async (req, res) => {
  try {
  
    const { bookId } = req.params;
    console.log(bookId);
    console.log(req.body);
    const updatedBook = await Book.findByIdAndUpdate(bookId, req.body, { new: true });
    
    if (!updatedBook) {
      return res.status(404).json({
        message: "Book not found",
        success: false,
        error: true
      });
    }
    
    res.status(200).json({
      message: "Book updated",
      data: updatedBook,
      success: true,
      error: false
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Error updating book",
      success: false,
      error: true
    });
  }
};

// Delete book by ID
const deleteBookById = async (req, res) => {
  try {
    const { bookId } = req.params;
    const deletedBook = await Book.findByIdAndDelete(bookId);
    
    if (!deletedBook) {
      return res.status(404).json({
        message: "Book not found",
        success: false,
        error: true
      });
    }
    
    res.status(200).json({
      message: "Book deleted successfully",
      success: true,
      error: false
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Error deleting book",
      success: false,
      error: true
    });
  }
};

module.exports = {
  getAllBooks,
  getBookById,
  addBook,
  updateBookById,
  deleteBookById
};






