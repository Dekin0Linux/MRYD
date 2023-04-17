const mongoose = require('mongoose')

//creating the buses schema
const bookingSchema = mongoose.Schema({
   customer_id :{type: mongoose.Schema.Types.ObjectId, ref:'user'}, //ref:'user' this is the collection
   bus_id :{type: mongoose.Schema.Types.ObjectId, ref:'bus'},
//    depature_date : {type:Date, required : true},
//    depature_time : {type:String, required : true},
//    arrival_date : {type:Date, required : true},
//    arrival_time : {type:String, required : true},
   passengers : {type:Array , require:true},
   booking_status : {type: String , required: true},
   price : {type:Number , required:true },
   booking_number : {type:String , required : true}


},{timestamps:true})

//creating a booking model 
const BookingModel = mongoose.model('booking',bookingSchema)

module.exports = BookingModel;