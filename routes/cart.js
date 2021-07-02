const express = require('express');
const router = express.Router();
const cartController = require('../controller/cart');


router.post('/cart/:productId/:userId',cartController.postCart);
router.delete('/cart/:productId:/userId',cartController.removeCart);
router.post('/order/:userId',cartController.postOrder);
router.get('/wishlist/:userId',cartController.getWishlist);
router.post('/wishlist/:userId/:productId',cartController.postwishlist)
router.delete('/wishlist/:productId',cartController.removeWishlist);
module.exports = router;