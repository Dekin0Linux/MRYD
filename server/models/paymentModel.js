const mongoose = require('mongoose')

//creating the buses schema
const PaymentSchema = mongoose.Schema({
    customer_id :{type: mongoose.Schema.Types.ObjectId, ref:'user'}, //ref:'user' this is the collection
    amount : {type: Number , require:true},
    paymentStatus: {type:String , required:true },
    refNumber : {type:String , required : true},
    date : {type:Date , required : true},

},{timestamps:true})

//creating a payment model 
const PaymentModel = mongoose.model('payment',PaymentSchema)

module.exports = PaymentModel;