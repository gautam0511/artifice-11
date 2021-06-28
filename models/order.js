const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('../models/user');
const Product = require('../models/product');
const orderSchema = new Schema({
    products:[
        {
            productId:{
                type:Object,
               
                
            },
            quantity:{
                type:Number,
                required:true
            }
        }
    ],
    user:{
        name:{
            type:String,
            required:true
        },
        userId:{
            type:Schema.Types.ObjectId,
            required:true,
            ref:'User'
        }
    }
})