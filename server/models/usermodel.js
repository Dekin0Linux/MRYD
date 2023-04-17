const mongoose = require('mongoose')

//creating the buses schema
const userSchema = mongoose.Schema({
   firstname :{type: String,required : true},
   lastname : {type:String,required:true},
   email : {type:String, required:true, unique:true },
   password: {type:String,required:true},
   phone : {type:String,required:true},
   address : {type:String,required:true},

},{timestamps:true})

//creating a bus model 
const userModel = mongoose.model('user',userSchema)

module.exports = userModel;