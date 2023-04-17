const companyModel = require('../models/busCompanyModel')
const bcrypt = require('bcryptjs')


const getAllCompanies = async (req,res)=>{
    try{
        const allcompanies = await companyModel.find()
        if(!allcompanies){
            return res.status(500).json({msg:"No Buses Availble"})
        }
        res.json(allcompanies )
    }catch(err){
        res.json({msg:err.message})
    }  
}


const getSingleCompany = async(req,res)=>{
    const {id} = req.params
    try{
        const company = await companyModel.findById(id)
        if(!company){
            return res.status(500).json({msg:"Bus not found"})
        }
        res.json(company)
    }catch(err){
        res.json({msg:err.message}).status(404)
    }
}


const addNewCompany = async (req,res)=>{
    try{
        const fileName = req.file
        //hashing password
        const salt = await  bcrypt.genSalt(10)
        const hashPassword =await  bcrypt.hash(req.body.password,salt)
        const registerCompany = await new companyModel({
            company_name : req.body.name,
            email : req.body.email,
            password : hashPassword,
            logo : fileName.filename,
            address : req.body.address,
            phone : req.body.phone
        })
        if(!registerCompany) {
            return res.json({msg:"We couldnt resgiter you"})
        }
        await registerCompany.save()
        res.json({msg:"Account Created"})
    }catch(err){
        res.json({msg :"This Email is registed already"})
    }
}


const loginCompany = async(req,res)=>{
    //get use input
    const {email,password} = req.body
    const company = await companyModel.findOne({email : email})

    if (!company) {
        return res.status(404).json({ message: 'Company not found' });
    }
    //verify user password
    const passwordMatch = await bcrypt.compare(password, company.password);
    if (passwordMatch) {
        return res.status(200).json({ message: 'Login successful' });
        res.redirect('/payment')
    }
    return res.status(401).json({ message: 'Incorrect password' });
}


const resetPassword = async(req,res)=>{
    const {email,password} = req.body
    try{
        const company = await companyModel.findOne({email})
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,salt)
        if (!company) {
            return res.status(404).json({ error: 'User not found' });
        }
        //set company paswword field to new password
        company.password = hashedPassword
        await company.save()
        res.json({msg:"Password Updated"})
    }catch(err){
        res.status(500).json({ error: 'Server error' });
    }
}


const updateCompany = async(req,res)=>{
    try{
        const {id} = req.params //getting bus ID
        const newUpdate = req.body //getting newly updated data
        const fileName = req.file //image file name
        const updateCompany = await companyModel.findByIdAndUpdate(id,{
            company_name: newUpdate.name,
            email : newUpdate.email,
            phone: newUpdate.phone,
            logo : fileName.filename,
            address : newUpdate.address
            
        },{new:true})
        //check if update was successful
        if(!updateCompany){
            return res.status(404).json({msg: "Bus not found"})
        }
        //resullts
        res.json(updateCompany)
    }catch(err){
        res.json({msg: err.message}).status(500)
    }
}


const deleteCompany = async (req,res)=>{
    const {id} = req.params ;
    try{
        const deletedCompany = await companyModel.findByIdAndDelete(id,{new:true})
        if(!deletedCompany){
            return res.status(404).json({msg:"Bus not found"})
        }
        res.json(deletedCompany).status(200)
    }catch(err){
        res.status(500).json({msg:err.message})
    }
}


module.exports = {
    getAllCompanies,
    getSingleCompany,
    addNewCompany,
    loginCompany,
    resetPassword,
    updateCompany,
    deleteCompany
}

