require('dotenv').config()
const express = require('express')
const router = express.Router()
const Book = require('../models/book')
const User = require('../models/user')



router.get('/view-books', async (req,res)=>{
    try{
        const bookData =  await Book.find()
        res.json({bookData})
        console.log("books viewed")
    }catch(error){
        res.status(500)
    }
})

router.post('/reg-book', async (req, res)=>{
    
    const isbn = req.body.isbn
    const books = await Book.find()
    let state = 0
    for(var ind in books){
        if(isbn === books[ind].isbn){
            res.status(414).json({message: 'this book already exists'})
            state = 1
            break
        }
    }
    
    if(state === 0){
        const book = new Book({
            isbn: req.body.isbn,
            name: req.body.name,
            author: req.body.author,
            price: req.body.price,
            copies: req.body.copies            
            
    })   
        try{
            const newBook = await book.save()
            console.log(newBook)
            res.status(201).json({message: 'new book added', user: newBook})
            console.log("books added")
            
            
        }catch(error){
            res.status(400).json({message: error.message})
        }
    }
    
});
router.delete('/book-delete/:isbn', async function (req, res) {
    const isbn = req.params.isbn;
    const bookDel = await Book.deleteOne({isbn: isbn});
    res.status(221).json({message:"Updated Succesfully",doc:bookDel})
    console.log("books deleted")
});

router.post("/search_books",(req,res)=>{
    const searchedField = req.body.isbn
    Book.find({word:{$regex:searchedField,$options:"i"}})
    .then(data=>{
        res.json(data)
    })
})
router.post("/issueBook",async (req,res)=>{
    const name = req.body.username;
    const isbn = req.body.isbn;
    const query1 = {username:name}
    const query2 = {isbn:isbn}
    const book = await Book.findOne(query2)
    const copies = book.copies
    
    const update_doc1 = {
        $push:{
            "books":isbn
        }
    }
    const update_doc2 = {
        $set:{
            "copies":copies-1
        }
    }
    try{
        const result1 = await User.findOneAndUpdate(query1,update_doc1,{useFindAndModify : false , new:true})
        const result2 = await Book.findOneAndUpdate(query2,update_doc2,{useFindAndModify : false , new:true})
        res.status(221).json({message:"Updated Succesfully",doc:result1,result2})
    }
    catch(e){
        res.status(421).json({message : error.message})
    }
    
})





module.exports = router