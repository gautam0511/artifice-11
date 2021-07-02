const User = require('../models/user');
const bcrypt = require('bcryptjs');
const { validationResult} = require('express-validator/check');
const jwt = require('jsonwebtoken');



exports.getsignup = async (req, res, next) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        const error  = new Error('validation failed')
        error.statusCode = 422
        throw error;
    }
    try {
        const users = await User.find()
        res.status(200).json({ message: 'Hello customer', users: users })
    }
    catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next();
    }
}

exports.postsignup = async (req, res, next) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        const error  = new Error('validation failed')
        error.statusCode = 422
        throw error;
    }
    const email = req.body.email;
    const password = req.body.password;
    const name = req.body.name;
    const phone = req.body.phone;
    const city = req.body.city;
    const state = req.body.state;
    const address = req.body.address;
    const zip = req.body.zip;
    let member;
    try {
        const users = await User.find()
        const hashedpassword = await bcrypt.hash(password, 12)
        const user = new User({
            email: email,
            password: hashedpassword,
            name: name,
            phone: phone,
            city: city,
            address: address,
            state: state,
            zip: zip
        })
        const token = jwt.sign({
            email:user.email,
            userId :user._id
        },
        'resetpasswordsecretpasswordartifice11',
        { expiresIn:'10min'}
        )
        user.token.push(token)
        const resultUsers = await user.save()
        res.status(201).json({message: 'Created', user: resultUsers })
    }
    catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next();
    }
}

exports.getlogin = async (req, res, next) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        const error  = new Error('validation failed')
        error.statusCode = 422
        throw error;
    }
    const email = req.body.email;
    const password = req.body.password;
    try {
        const user = await User.find()
        

        res.status(200).json({ message: 'Login Your account' });
    }
    catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next();
    }

}

exports.postLogin = async (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
  
    
    try {
        
       
            if(email === 'artifice7@gmail.com' && password ==='artifice' ){
            
                res.json({message:'hello admin'})
            }
            else{
                const user = await User.findOne({email:email})
                if(!user){
                    const error = new Error('login failed')
                    error.statusCode = 422
                    throw error;
                }
                
                const result = await bcrypt.compare(password,user.password)
                if(result){
                    res.status(200).json({message:'welcome user'})
                }
                else{
                    res.status(401).json({message:'not exist'})
                }
            }        
        
           
    }
    catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next();
    }
}

exports.resetpassword = async(req,res,next)=>{
  
    const tokenId = req.params.token;
    const email = req.body.email;
    const newpassword = req.body.newpassword;
   
    try{
        const user = await User.findOne({email:email})
        
        if(user.token.toString() === tokenId.toString()){
            const hashedpassword = await bcrypt.hash(newpassword,12)
        user.password = hashedpassword;
        const result = await user.save()
        res.status(200).json({message:'updated'})
        }
        else{
            console.log('wrong token')
        }
        
    }
    catch(err){
        if(!err.statusCode){
            err.statusCode = 500
        }
        next();
    }

}