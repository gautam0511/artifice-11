const express = require('express');
const router = express.Router();
const cartController = require('../controller/cart');


router.post('/cart/:productId',cartController.postCart);
router.delete('/cart/:productId',cartController.removeCart);
module.exports = router;