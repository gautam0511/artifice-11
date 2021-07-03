
require('dotenv').config()
const path = require('path');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const multer = require('multer');
const {v4:uuidv4} = require('uuid');
app.use(bodyParser.json())
const MONGODB_URI = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.kutbe.mongodb.net/${process.env.MONGO_DATABASE}?retryWrites=true&w=majority`
//image uploader pending
// app.use('/images',express.static(path.join(__dirname,'images')));

// const fileStorage = multer.diskStorage({
//     destination:function(req,file,cb){
//         cb(null,'images')
//     },
//     filename:function(req,file,cb){
//         cb(null,uudiv4())
//     }
// })

// const fileFilter= (req,file,cb)=>{
//     if(file.mimetype === 'images/png' || file.mimetype === 'images/jpg' || file.mimetype === 'images/jpeg'){
//         cb(null,true)
//     }
//     else{
//         cb(null,false)
//     }

// }

// app.use(multer({storage:fileStorage,fileFilter:fileFilter}).single('image'))
const userRoutes =  require('./routes/user');
const productRoutes = require('./routes/product');
const cartRoutes = require('./routes/cart');

app.use((error,req,res,next)=>{
    const status = error.statusCode;
    const message = error.message;
    res.status(status).json({message:message});
})

app.use('/user',userRoutes);
app.use(productRoutes);
app.use(cartRoutes);
mongoose
.connect(MONGODB_URI)
.then(result=>{
    app.listen(1105);
})
.catch(err=>console.log(err))