const router = require('express').Router()
const {
    getAllBooking,
    getSingleBooking,
    getBookingByPin,
    newBooking,
    updateBooking,
    deleteBooking
} = require('../controllers/bookingsController')

//getting all bus
router.get('/',getAllBooking)

//getting booking by pin
router.get('/book',getBookingByPin)

//getting a single booking
router.get('/:id',getSingleBooking)
//end of single book

//adding new booking
router.post('/',newBooking)
//end of adding a booking

//update a bookin
router.patch('/:id',updateBooking)


//delete a booking
router.delete('/:id',deleteBooking)


module.exports = router