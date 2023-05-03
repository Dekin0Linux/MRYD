const router = require('express').Router()
const {
    getAllbuses,
    getSingleBus,
    searchBus,
    addNewBus,
    updateBus,
    deleteBus,
    newSeat
} = require('../controllers/busesController')

//getting all bus /bus
router.get('/', getAllbuses)
//end of getting all buses

//search buses using from , to and date parameters /bus/search
router.get('/search',searchBus)
//end of pus search

//getting a single bus /bus/123456
router.get('/:id',getSingleBus)
//end of getting single bus

//getting a update bus seats /bus/123456
router.patch('/updateSeats/:id',newSeat)
//end of getting single bus


//adding new bus /bus
router.post('/',addNewBus)
//end of adding new bus route

//update a bus  /bus/123
router.patch('/:id',updateBus)
//end of update route


//delete a bus /bus/123
router.delete('/:id',deleteBus)
//end of delete route


module.exports = router