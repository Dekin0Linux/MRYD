const mongoose = require('mongoose')

//creating the buses schema
const companySchema = mongoose.Schema({
   company_name :{type: String, required:true},
   email : {type:String, required:true, unique:true },
   password :{type: String, required:true},
   phone :{type: String, required:true}, 
   logo :{type: String, required:true},
   address :{type: String, required:true}
},{timestamps:true})

//creating a booking model 
const companyModel = mongoose.model('company',companySchema)

module.exports = companyModel;