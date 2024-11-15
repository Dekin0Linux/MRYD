 const mongoose = require('mongoose')

 //all dates
const daysOfYear = [];
const year = new Date().getFullYear();
for (let i = 0; i < 365; i++) {
  const date = new Date(year, 0, i + 1);
  const isoDate = date.toISOString().slice(0, 10);
  daysOfYear.push(isoDate);
}

/**
 * @params reference a bus bus company
 */


 //creating the buses schema
const busSchema = mongoose.Schema({
      bus_name :{type: mongoose.Schema.Types.ObjectId ,ref:'company', required : true},
      bus_number : {type:String,required:true},
      bus_type : {type:String,required:true},
      depature_loc : {type:String,required:true},
      arrival_loc : {type:String,required:true},
      depature_date : {type: mongoose.Schema.Types.Mixed , default: daysOfYear },
      depature_time : {type:String,required:true},
      arrival_date : {type:String , reqiired: true},
      arrival_time : {type:String,required:true},
      total_seats : {type:Number,required:true},
      available_seats :{type: Number,
        default: function() {
          return this.total_seats;
        }
      },
      booked_seats : {type:[String]},
      seats_perRow : {type: Number, require:true},
      amenities : {type:Array},
      fare : {type:Number , required:true},
      rating:{type:String},
      station_name: {type:String,required:true}

},{timestamps:true})



busSchema.pre('save', function(next) {
  this.available_seats = this.total_seats - this.booked_seats.length;
  next();
});


 //creating a bus model 
 const BusModel = mongoose.model('bus',busSchema)

 module.exports = BusModel;







