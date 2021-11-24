const mongoose = require('mongoose')
const Book = mongoose.Schema({
    isbn:{
        type : String,
        required : true
    },
    name:{
        type : String,
        required : true
    },
   
    
    author:{
        type : String,
        required : true
    },
    price:{
        type : Number,
        required : true
    },
    copies:{
        type:Number,
        required:true
    }
    

    
})
module.exports = mongoose.model('book', Book);