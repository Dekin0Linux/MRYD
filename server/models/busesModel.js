 const mongoose = require('mongoose')

 //all dates
const daysOfYear = [];
const year = new Date().getFullYear();
for (let i = 0; i < 365; i++) {
  const date = new Date(year, 0, i + 1);
  const isoDate = date.toISOString().slice(0, 10);
  daysOfYear.push(isoDate);
}


 //creating the buses schema
const busSchema = mongoose.Schema({
      bus_name :{type: mongoose.Schema.Types.ObjectId ,ref:'company', required : true},
      //  bus_logo : {type: mongoose.Schema.Types.ObjectId ,ref:'company', required : true},
      bus_number : {type:String,required:true},
      bus_type : {type:String,required:true},
      depature_loc : {type:String,required:true},
      arrival_loc : {type:String,required:true},
      depature_date : {type: mongoose.Schema.Types.Mixed , default: daysOfYear },
      depature_time : {type:String,required:true},
      arrival_date : {type:String , reqiired: true},
      arrival_time : {type:String,required:true},
      total_seats : {type:Number,required:true},
      available_seats :{type:Number,required:true},
      booked_seats : {type:[String]},
      seats_perRow : {type: Number, require:true},
      amenities : {type:Array},
      fare : {type:Number , required:true},
      rating:{type:String},
      station_name: {type:String,required:true}

},{timestamps:true})

 //creating a bus model 
 const BusModel = mongoose.model('bus',busSchema)

 module.exports = BusModel;


//all dates
// const daysOfYear = [];
// const year = new Date().getFullYear();
// for (let i = 0; i < 365; i++) {
//   const date = new Date(year, 0, i + 1);
//   const isoDate = date.toISOString().slice(0, 10);
//   daysOfYear.push(isoDate);
// }

// Set the availability to all the days of the year
// const newBusModel = mongoose.model('newBus', newBusSchema);
// const newBus = new newBusModel({
//   name: "Bus 1",
//   origin: "City A",
//   destination: "City B",
//   availability: daysOfYear,
// });







