const router = require('express').Router()
const {
    getAllPayment,
    getPaymentById,
    searchPayment,
    addPayment,
    deletePayment
} = require('../controllers/paymentsController')

router.get('/',getAllPayment)

router.get('/:id',getPaymentById)

router.get('/searchpayment',searchPayment)

router.post('/',addPayment)

router.delete('/:id',deletePayment)


module.exports = router