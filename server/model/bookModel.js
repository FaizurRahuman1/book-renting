const mongoose = require('mongoose')
const bookSchema = new mongoose.Schema({
   title: {
    type: String,
    required: true,
    trim: true
   },
   image: {
    type: Object,
    default: {
        url: "https://t3.ftcdn.net/jpg/04/34/72/82/240_F_434728286_OWQQvAFoXZLdGHlObozsolNeuSxhpr84.jpg"
    }
   },
   dec: {
    type: String,
    required: true,
    trim: true
   },
   price: {
    type: Number,
    required: true
   },
   author: {
    type: String,
    required: true
   },
   category: {
    type: String,
    required: true
   },
   pages: {
    type: Number,
    required: true
   },
   rentCost: {
    type: Number,
    required: true
   },
   isAvailable: {
     type: Boolean,
     default: true
   },
   numberOfCopy: {
    type: Number,
    required: true
   },
   rentedCopies: {
    type: Number,
    default: 0
   },
   isbn: {
    type: String,
    required: ""
   },
   isActive: {
    type: String,
    required: true
   }
},{
collection: 'books',
timestamps: true

})

module.exports = mongoose.model("Book", bookSchema)