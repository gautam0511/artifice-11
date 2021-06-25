const express = require('express');

const router = express.Router();

const productController = require('../controller/product');

router.get('/products',productController.getProducts);
router.post('/product',productController.createProduct);

router.put('/product/:productId',productController.updateProduct);
router.delete('/product/:productId',productController.deleteProduct);
module.exports = router;
