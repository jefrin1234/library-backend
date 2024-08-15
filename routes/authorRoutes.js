const express = require('express')
const router = express.Router()
const {getAllAuthors,getAuthorById,addAuthor,updateAuthorById,deleteAuthorById} = require('../controllers/authorControllers')
const { checkLogin } = require('../middleWare/checkLogin')
router.get('/', getAllAuthors)
router.get('/:authorId',getAuthorById)
router.post('/',addAuthor)
router.patch('/:authorId',updateAuthorById)
router.delete('/:authorId',deleteAuthorById)


module.exports = router