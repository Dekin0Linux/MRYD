 const mongoose = require('mongoose')

 //creating the buses schema
 const busSchema = mongoose.Schema({
    bus_name :{type: mongoose.Schema.Types.ObjectId ,ref:'company', required : true},
   //  bus_logo : {type: mongoose.Schema.Types.ObjectId ,ref:'company', required : true},
    bus_number : {type:String,required:true},
    bus_type : {type:String,required:true},
    depature_loc : {type:String,required:true},
    arrival_loc : {type:String,required:true},
    depature_date : {type:String , required : true },
    depature_time : {type:String,required:true},
    arrival_date : {type:String , reqiired: true},
    arrival_time : {type:String,required:true},
    total_seats : {type:Number,required:true},
    available_seats :{type:Number,required:true},
    booked_seats : {type:[String], unique: true, sparse : true},
    seats_perRow : {type: Number, require:true},
    amenities : {type:Array},
    fare : {type:Number , required:true},
    rating:{type:String},
    station_name: {type:String,required:true}

 },{timestamps:true})

 //creating a bus model 
 const BusModel = mongoose.model('bus',busSchema)

 module.exports = BusModel;