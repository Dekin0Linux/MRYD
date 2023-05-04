const PaymentModel = require('../models/paymentModel')


const getAllPayment = (req,res)=>{
    res.send('get all payment')
}

const getPaymentById = (req,res)=>{
    res.send('get payment by id')
}

const searchPayment = (req,res)=>{
    const ref = req.body
    res.send('get payment by ref number')
}

const addPayment = (req,res)=>{
    res.send('add new payment')
}

const deletePayment = (req,res)=>{
    res.send('payment deleted')
}




module.exports = {
    getAllPayment,
    getPaymentById,
    searchPayment,
    addPayment,
    deletePayment
}