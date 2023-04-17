const userModel = require('../models/usermodel')
const bcrypt = require('bcryptjs')

const getAllusers = async (req,res)=>{
    const allusers = await userModel.find()
    res.json(allusers)
}

const getSingleUser = async(req,res)=>{
    const {id} = req.params
    try{
        const user = await userModel.findById(id)
        if(!user){
            return res.status(500).json({msg:"User Not Found"})
        }
        res.json(user)
    }catch(err){
        res.status(404).json({msg:err.message})
    }  
}


const createNewUser = async (req,res)=>{
    try{
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(req.body.password,salt)
        const user = await new userModel({
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email,
            password: hashedPassword,
            phone: req.body.phone,
            address: req.body.address
        })
        if(!user){
            return res.status(500).res.json({msg:"User not Created"})
        }
        await user.save().then((doc)=>{
            res.json(doc).status(200)
        })
    }catch(err){
        res.status(404).json({msg:"This email is already Registed"})
    }
}



const loginUser = async(req,res)=>{
    //get use input
    const {email,password} = req.body
    const user = await userModel.findOne({email:email})
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }
    // //verify user password
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (passwordMatch) {
        return res.status(200).json({ message: 'Login successful'});        
    }
    return res.status(401).json({ message: 'Incorrect password' });
}



const resetPassword = async(req,res)=>{
    const {email,password} = req.body
    try{
        const user = await userModel.findOne({email})
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,salt)
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        //set user paswword field to new password
        user.password = hashedPassword
        await user.save()
        res.json({msg:"Password Updated"})
    }catch(err){
        res.status(500).json({ error: 'Server error' });
    }
    
    
}



const updateUser = async(req,res)=>{
    const {id} = req.params
    const newUpdate = req.body
    try{
        const updateUser = await userModel.findByIdAndUpdate(id,newUpdate,{new:true})
        //check if update was successful
        if(!updateUser){
            return res.status(404).json({msg: "User not found"})
        }
        //results
        res.json(updateUser)
    }catch(err){
        res.json({msg: err.message}).status(500)
    }
}


const deleteUser = async(req,res)=>{
    const {id} = req.params
    try{
        const deletedUser = await userModel.findByIdAndDelete(id,{new:true})
        if(!deletedUser){
            return res.status(404).json({msg:"Bus not found"})
        }
        res.json(deletedUser)
    }catch(err){
        res.status(500).json({msg:err.message})
    }
}




module.exports = {
    getAllusers,
    getSingleUser,
    createNewUser,
    loginUser,
    resetPassword,
    updateUser,
    deleteUser,
}


