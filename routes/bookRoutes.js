const express = require('express')
const router = express.Router()
const {getAllBooks,getBookById,addBook,updateBookById,deleteBookById} = require('../controllers/bookControllers')
router.get('/', getAllBooks)
router.get('/:bookId',getBookById)
router.post('/',addBook)
router.patch('/:bookId',updateBookById)
router.delete('/:bookId',deleteBookById)


module.exports = router