const router = require('express').Router()
const {
    getAllusers,
    getSingleUser,
    createNewUser,
    loginUser,
    resetPassword,
    updateUser,
    deleteUser,
} = require('../controllers/usersController')

//getting all users
router.get('/',getAllusers)

//getting a single user
router.get('/:id', getSingleUser)

//adding new user(Register user)
router.post('/register', createNewUser)

//login a user
router.post('/login',loginUser)
//end of user login


//reset password
router.put('/reset-password',resetPassword)

//update a user
router.patch('/:id', updateUser)


//delete a user
router.delete('/:id',deleteUser)
//logout





module.exports = router