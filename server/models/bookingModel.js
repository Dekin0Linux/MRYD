const mongoose = require('mongoose')

//creating the buses schema
const bookingSchema = mongoose.Schema({
   customer_id :{type: mongoose.Schema.Types.ObjectId, ref:'user'}, //ref:'user' this is the collection
   bus_id :{type: mongoose.Schema.Types.ObjectId, ref:'bus'},
   passengers : {type:[Object] , require:true},
   booking_status : {type: String , required: true},
   price : {type:Number , required:true },
   booking_number : {type:String , required : true}


},{timestamps:true})

//creating a booking model 
const BookingModel = mongoose.model('booking',bookingSchema)

module.exports = BookingModel;