const BookingModel = require('../models/bookingModel')

const getAllBooking = async(req,res)=>{
    try{
        const allBooking = await BookingModel.find().populate('customer_id') // this is the key /property name of our id ref
        if(!allBooking){
            return res.json({msg:"No booking available"}).status(500)
        }
        res.json(allBooking).status(200)
    }catch(err){
        res.json({msg:err.message}).status(404)
    }
}

const getBookingByPin = async(req,res)=>{
    const {pin} = req.body
    try{
        const allBooking = await BookingModel.find({booking_number:pin}).populate('bus_id',['bus_number','station_name','arrival_date','arrival_time','depature_loc','arrival_loc','depature_time']) //populate('customer_id' this is the key /property name of our id ref)
        if(!allBooking){
            return res.json({msg:"No booking available"}).status(500)
        }
        res.json(allBooking).status(200)
    }catch(err){
        res.json({msg:err.message,note:'Check your Pin'}).status(404)
    }
}


const getSingleBooking = async(req,res)=>{
    const {id} = req.params
    try{
        const allBooking = await BookingModel.findById(id).populate(['customer_id','bus_id'])
        if(!allBooking){
            return res.json({msg:"No booking available"}).status(500)
        }
        res.json(allBooking).status(200)
    }catch(err){
        res.json({msg:err.message}).status(404)
    }
}

const newBooking = async(req,res)=>{
    const bookingData = req.body
    try{
        const addBooking = await new BookingModel(bookingData)
        await addBooking.save()
        res.json(addBooking).status(200)
    }catch(err){
        res.json({msg:err.message}).status(404)
    }
}


const updateBooking = async (req,res)=>{
    const {id} = req.params
    const newUpdate = req.body
    try{
        const updateBooking = await BookingModel.findByIdAndUpdate(id,newUpdate,{new:true})
        //check if update was successful
        if(!updateBooking){
            return res.status(404).json({msg: "Bus not found"})
        }
        //resullts
        res.json({msg:"Booking Updated"})
    }catch(err){
        res.json({msg: err.message}).status(500)
    }
}


const deleteBooking = async(req,res)=>{
    const {id} = req.params
    try{
        const deletedBooking = await BookingModel.findByIdAndDelete(id)
        if(!deletedBooking){
            return res.json({msg:"Booking not found"}).status(404)
        }
        res.json({msg:"User deleted Successfully"})
    }catch(err){
        res.json({msg:err.message}).status(500)
    }
}


module.exports = {
    getAllBooking,
    getBookingByPin,
    getSingleBooking,
    newBooking,
    updateBooking,
    deleteBooking
}