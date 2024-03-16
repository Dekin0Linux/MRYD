const mongoose = require('mongoose')

//creating the buses schema
const companySchema = mongoose.Schema({
   companyName : {type: String, required: true},
   email : {type:String, required:true, unique:true },
   password :{type: String, required:true},
   phone :{type: String, required:true}, 
   logo :{type: String, required:true},
   address :{type: String, required:true},
   isRegistered : {type: String, required:true},
   operatingCities : {type:[String], required:true},
   manager_name : {type: String}
   
},{timestamps:true})

//creating a booking model 
const companyModel = mongoose.model('company',companySchema)

module.exports = companyModel;