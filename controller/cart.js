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
        console.log(product, productId)
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
exports.postOrder = (req, res, next) => {
   
}