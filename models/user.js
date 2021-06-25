const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({

email:{
    type:String,
    required:true
},

password:{
    type:String,
    required:true
},
name:{
    type:String,
    required:true
},
phone:{
    type:Number,
    required:true
},

address:{
    type:String,
    required:true
},

state:{
    type:String,
    required:true
},

city:{
    type:String,
    required:true
},
zip:{
    type:Number,
    required:true
}

})

module.exports = mongoose.model('User',userSchema);