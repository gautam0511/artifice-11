const express = require('express');
const router = express.Router();
const cartController = require('../controller/cart');


router.post('/cart/:productId',cartController.postCart);
router.delete('/cart/:productId',cartController.removeCart);
router.post('/order',cartController.postOrder);
module.exports = router;