const PaymentModel = require('../models/paymentModel')


const getAllPayment = async(req,res)=>{
    try{
        const allPayment = await PaymentModel.find()
        res.json(allPayment)
    }catch(err){
        res.json({msg:err.message})
    }
    
}

const getPaymentById = async(req,res)=>{
    const {id} = req.params
    try{
        const payment = await PaymentModel.findById(id)
        if(!payment){
            return
        }
        res.json(payment).status(200)

    }catch(err){
        res.status(400).json({msg:err.message})
    }
}

const searchPayment = (req,res)=>{
    const ref = req.body
    res.send('get payment by ref number')
}


const addPayment = async(req,res)=>{
    const data = req.body
    try{
        const payment = await new PaymentModel(data)
        if(!payment){
            res.json({msg:'Payment Not Successful'})
            return
        }
        await payment.save()
        res.json({msg : 'Payment Successful'}).status(200)
    }catch(err){
        res.status(400).json({msg:err})
    }
}

const deletePayment = async(req,res)=>{
    const {id} = req.params
    try{
        await PaymentModel.findByIdAndDelete(id).then(
            (payment)=>{res.json({msg:"Deleted Successfully"})}
        )
    }catch(err){
        res.status(400).json({msg:err.message})
    }
}




module.exports = {
    getAllPayment,
    getPaymentById,
    searchPayment,
    addPayment,
    deletePayment
}