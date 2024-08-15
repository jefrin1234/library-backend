const Author = require("../models/authorModel");

// Get all authors
const getAllAuthors = async (req, res) => {
  try {
    const authors = await Author.find();
    res.status(200).json(authors);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Error fetching authors",
      success: false,
      error: true
    });
  }
};

// Get author by ID
const getAuthorById = async (req, res) => {
  
   try{
    const { authorId } = req.params;
    const author = await Author.findById(authorId);
    
    if (!author) {
      return res.status(404).json({
        message: "Author not found",
        success: false,
        error: true
      });
    }
    
    res.status(200).json(author);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Error fetching author",
      success: false,
      error: true
    });
  }
};

// Add a new author
const addAuthor = async (req, res) => {
  try {
    const { name, bio, birthDate } = req.body;
    const existingAuthor = await Author.findOne({ name });
    
    if (existingAuthor) {
      return res.status(400).json({
        message: "Author already exists",
        success: false,
        error: true
      });
    }
    
    const author = new Author({ name, bio, birthDate });
    await author.save();
    
    res.status(201).json({
      message: "Author added successfully",
      data: author,
      success: true,
      error: false
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: err.message,
      success: false,
      error: true
    });
  }
};

// Update author by ID
const updateAuthorById = async (req, res) => {
  try {
    const { authorId } = req.params;
    const updatedAuthor = await Author.findByIdAndUpdate(authorId, req.body, { new: true });
    
    if (!updatedAuthor) {
      return res.status(404).json({
        message: "Author not found",
        success: false,
        error: true
      });
    }
    
    res.status(200).json({
      message: "Author updated successfully",
      data: updatedAuthor,
      success: true,
      error: false
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Error updating author",
      success: false,
      error: true
    });
  }
};

// Delete author by ID
const deleteAuthorById = async (req, res) => {
  try {
    const { authorId } = req.params;
    const deletedAuthor = await Author.findByIdAndDelete(authorId);
    
    if (!deletedAuthor) {
      return res.status(404).json({
        message: "Author not found",
        success: false,
        error: true
      });
    }
    
    res.status(200).json({
      message: "Author deleted successfully",
      success: true,
      error: false
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Error deleting author",
      success: false,
      error: true
    });
  }
};

module.exports = {
  getAllAuthors,
  getAuthorById,
  addAuthor,
  updateAuthorById,
  deleteAuthorById
};
