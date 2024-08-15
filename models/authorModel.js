const mongoose = require('mongoose')

const authorSchema = new mongoose.Schema({
  image:String,
  name:{
    type:String,
    required: true
  },
  bio:String,
  birthDate:String
})

const Author = mongoose.model('Author',authorSchema)

module.exports =  Author;