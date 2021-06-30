const User = require('../models/user');
const Product = require('../models/product');
const userController = require('../controller/user');
const path = require('path')
const Order = require('../models/order');
// c loggedin = require('../loggedin');
// console.log(loggedin);

exports.postCart = async (req, res, next) => {
    const productId = req.params.productId;
    const name = req.body.name;
    try {
        const product = await Product.findById(productId)
        const user = await User.findOne({ name: name })
        // in the real project you to connect the user by req.user not by name 
        const result = await user.addToCart(product)
        res.status(200).json({ message: 'added to cart', user: result })
    }
    catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next();
    }

}
exports.removeCart = async (req, res, next) => {
    const productId = req.params.body;
    const name = req.body.name;
    try {
        const product = await Product.findById(productId)
        const user = await User.findOne({ name: name })
        const result = await user.removeFromCart(productId)
        res.status(200).json({ message: 'product deleted' })
    }
    catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next();
    }
}
exports.postOrder = async (req, res, next) => {
    const name  =  req.body.name;
    try{
        const user = await User.findOne({name:name})
       
        const users = await user.populate('cart.items.productId').execPopulate()
        
        const products = await users.cart.items.map(i=>{
            return {
                quantity:i.quantity,
                product:{...i.productId._doc}
            }
           
        })
        console.log( products)
         const order = new Order ({
             user:{
                 email:users.email,
                 userId:users._id
             },
             products:products
         })
        const result = await order.save()

        //clearcart
      
        res.status(200).json({message:'order',order:result})
        
    }
    catch(err){
        if(!err.statusCode){
            err.statusCode = 500;
        }
        next()
    }
}
exports.getWishlist = async(req,res,next)=>{
  const userId = req.params.userId;
  try{
    const user = await User.findById(userId)
   res.status(200).json({message:'wishlisht',wishlisht:user.wishlist})
  }
  catch(err){
      if(!err.statusCode){
          err.statusCode = 500
      }
      next()
  }
}
exports.postwishlist = async(req,res,next)=>{
    const productId = req.params.productId;
    const name = req.body.name;
    try{
        const user = await User.findOne({name:name})
        const product = await Product.findById(productId)
        const result = await user.addToWishlist(product)
        res.status(200).json({message:'added to wishlist'})
    }
    catch(err){
        if(!err.statusCode){
            err.statusCode = 500;
        }
        next()
    }
}

exports.removeWishlist = async(req,res,next)=>{
    const productId = req.params.productId;
    const name = req.body.name;
    try{
        const user = await User.findOne({name:name})
        const product = await User.findById(productId)
        const result = await user.removeWishlist(productId)
        res.status(200).json({message:'deleted'})
    }
    catch(err){
        if(!err.statusCode){
            err.statusCode = 500
        }
        next();
    }
}