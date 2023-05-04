const BusModel = require('../models/busesModel')


const getAllbuses = async (req,res)=>{
    try{
        const allusers = await BusModel.find().populate('bus_name','company_name')
        if(!allusers){
            return res.status(500).json({msg:"No Buses Availble"})
        }
        res.json(allusers)
    }catch(err){
        res.json({msg:err.message})
    }  
}


const getSingleBus = async(req,res)=>{
    const {id} = req.params
    try{
        const bus = await BusModel.findById(id)
        if(!bus){
            return res.status(500).json({msg:"Bus not found"})
        }
        res.json(bus)
    }catch(err){
        res.json({msg:err.message}).status(404)
    }
}


const newSeat = async(req,res)=>{
    try{
    const {id} = req.params
    const bookedSeat = req.body.seat //array of user selected seats
    const currentSeat = req.body.currentSeat //setting updated seats value to this(prevSeat - current seat)
    await BusModel.findByIdAndUpdate(id, { $push: { booked_seats: {$each : bookedSeat } },$set:{available_seats : currentSeat} }, { new: true })
        .then(() => {
        res.json({msg:"Seat updated"});
        })
        .catch(err => res.json({msg:err.message}));
    }catch(err){
        res.json({msg:err.message})
    }
    
}

const searchBus = async(req,res)=>{
    const {depature,arrival,dep_date} = req.query
    try{
        const buses = await BusModel.find({
            depature_loc : depature,
            arrival_loc : arrival,
            depature_date : dep_date
        }).populate('bus_name',['company_name','logo'])
        if(!buses){
            return res.status(500).json({msg:"Bus not found"})
        }
        res.send(buses)
    }catch(err){
        res.json({msg:err})
    }
}

const addNewBus = async (req,res)=>{
    const busData = req.body
    try{
        const newBus = await new BusModel(busData)
        await newBus.save().then((doc)=>{
            res.json(doc).status(200)
        })
    }catch(err){
        res.json({msg:err.message})
    }
}


const updateBus = async(req,res)=>{
    const {id} = req.params //getting bus ID
    const newUpdate = req.body //getting newly updated data
    try{
        const updateBus = await BusModel.findByIdAndUpdate(id,newUpdate,{new:true})
        //check if update was successful
        if(!updateBus){
            return res.status(404).json({msg: "Bus not found"})
        }
        //resullts
        res.json(updateBus)
    }catch(err){
        res.json({msg: err.message}).status(500)
    }
}


const deleteBus = async (req,res)=>{
    const {id} = req.params
    try{
        const deletedbus = await BusModel.findByIdAndDelete(id,{new:true})
        if(!deletedbus){
            return res.status(404).json({msg:"Bus not found"})
        }
        res.json(deletedbus)
    }catch(err){
        res.status(500).json({msg:err.message})
    }
}


module.exports = {
    getAllbuses,
    getSingleBus,
    searchBus,
    addNewBus,
    updateBus,
    deleteBus,
    newSeat
}

