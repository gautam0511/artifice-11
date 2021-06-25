const express = require('express');
const router = express.Router();
const userController = require('../controller/user');
const { body } = require('express-validator/check');

router.get('/signup',userController.getsignup);
router.post('/signup',[
    body('email').isEmail(),
    body('name').trim().isLength({min:5}),
    body('password').trim().isLength({min:5}),
    body('phone').isLength({min:9})
],userController.postsignup);
router.post('/login',userController.postLogin);
router.get('/login',userController.getlogin);

module.exports = router;