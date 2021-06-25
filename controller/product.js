const Product = require('../models/product');

// ** for normal users **
exports.getProducts = async (req, res, next) => {
    try {
        const products = await Product.find()
        res.status(200).json({ message: 'All products', products: products })
    }
    catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next();
    }
}
//** for admin only **
exports.createProduct = async (req, res, next) => {
    const title = req.body.title;
    const price = req.body.price;
    const description = req.body.description;
   
    //imageurl 
    try {
        const products = await Product.find()
        const product = new Product({
            title: title,
            price: price,
            description: description
         
        })
        const result = await product.save()
        res.status(201).json({ message: 'created' });
    }
    catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next();
    }
}

exports.updateProduct = async (req, res, next) => {
    const productId = req.params.productId;
    const updatedtitle = req.body.title;
    const updatedprice = req.body.price;
    const updatedescription = req.body.description;
    try {

        const product = await Product.findById(productId)
        product.title = updatedtitle;
        product.description = updatedescription;
        product.price = updatedprice;

        const result = await product.save()
        res.status(200).json({ message: 'updated' });
    }
    catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next();
    }
}

exports.deleteProduct = async (req, res, next) => {
    const productId = req.params.productId;

    try {
        const result = await Product.findByIdAndRemove(productId)
        res.status(200).json({ message: 'Deleted' });

    }
    catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next();
    }
}