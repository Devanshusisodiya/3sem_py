require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')



const cors = require('cors')
const port = process.env.PORT || 8000
const app = express()
const user_routes = require('./routes/user_routes')
const book_routes = require('./routes/book_routes')

//  var options = {
//     "origin": "*",
//     "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
//     "Access-Control-Allow-Origin": 'https://oe-api.herokuapp.com/api/product/upload',
//     "preflightContinue": false,
//     "optionsSuccessStatus": 200
//   } 
app.use(cors());



mongoose.connect(
    process.env.DATABASE_URI,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
);

const db = mongoose.connection;
db.on('error', (error)=>{console.log(error)});
db.once('open', ()=>{console.log('Connected to Database')});
app.use(express.json())
app.use('/api/user',user_routes)
app.use('/api/book',book_routes)







app.listen(port,()=>{
    console.log(`Server listening to port ${port}`)
})