const mongoose = require('mongoose')
const Author = require('./authorModel')

const bookSchema = new mongoose.Schema({
  title:{
    type:String,
    required:true
  },
 
  author:{
   type: mongoose.Schema.Types.ObjectId,
   ref:'Author',
   required:true
   
  },
  image:String,
  bookDetails:String,
  publishedDate:String
})

const Book = mongoose.model('Book',bookSchema)

module.exports =  Book