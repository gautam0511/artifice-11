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
        member = user;
        const token = jwt.sign({
            email: member.email,
            userId: member._id.toString()
        },
            'artific11secretcode',
            { expiresIn: '1hr' }
        )
        user.token.push(token)
        const resultUsers = await user.save()
        res.status(201).json({ token: token, message: 'Created', user: resultUsers })
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

        if(email === 'artifice117@gmail.com' && password ==='artifice11' ){
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
        
            
        
        
            // const adminuser = await User.findOne({ email: 'artifice117@gmail.com' })
            // if (adminuser) {
            //     const result = await bcrypt.compare(password, adminuser.password)
            //     if (result) {
            //         res.status(200).json({ message: 'Welcome Admin', adminuser: adminuser })
            //     }
            //     else {
            //         res.status(401).json({ message: 'sorry invalid details' })
            //     }
            // }
            // if(!adminuser){
            //     const user = await User.findOne({ email: email })
            //      const result = await bcrypt.compare(password, user.password)
            //      if (result) {
            //          res.status(200).json({ message: 'Authenticated', user: user })
            //      }
            //      else {
            //          res.status(401).json({ message: 'not authenticated' })
            //      }
            // }
    }
    catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next();
    }
}
// exports.putedit = async (req, res, next) => {
//     const userId = req.params.userId;

//     const updatedemail = req.body.email;
//     const updatedname = req.body.name;
//     const updatedphone = req.body.phone;
//     const updatedstate = req.body.state;
//     const updatedcity = req.body.city;
//     const updatedaddress = req.body.address;
//     const updatedpassword = req.body.password;
//     const updatedzip = req.body.zip;
//     try{
//         const user = await User.findById(userId)
//         user.email = updatedemail;
//         user.name = updatedname;
//         user.phone = updatedphone;
//         user.password = updatedpassword;
//         user.state = updatedstate;
//         user.city = updatedcity;
//         user.address = updatedaddress;
//         user.zip = updatedzip;
//         const result = await user.save()
//        res.status(200).json({message:'updated',user:result});
//     }
//     catch (err) {
//         if (!err.statusCode) {
//             err.statusCode = 500;
//         }
//         next();
//     }
// }

//