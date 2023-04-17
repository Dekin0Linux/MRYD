const router = require('express').Router()
const multer = require('multer')
const companyModel = require('../models/busCompanyModel')
const {
    getAllCompanies,
    getSingleCompany,
    addNewCompany,
    loginCompany,
    resetPassword,
    updateCompany,
    deleteCompany
} = require('../controllers/companyController')

const storage = multer.diskStorage({
    destination : (req,file,cb)=>{
        cb(null , './images')
    },
    filename : (req,file,cb)=>{
        const file_name = Date.now() +file.originalname
        cb(null, file_name)
    }
})
const uploadFile = multer({
    storage : storage ,
    fileFilter: async function (req, file, cb) {
        // Check if email already exists
        const emailExists = await companyModel.findOne({ email: req.body.email });
        if (emailExists) {
          return cb(new Error('Email already exists.'));
            
        }
        cb(null, true);
      }
})

//getting all bus /bus
router.get('/',getAllCompanies)
//end of getting all buses

//getting a single bus /bus/123456
router.get('/:id',getSingleCompany)
//end of getting single bus

//adding new bus /bus
router.post('/register', uploadFile.single('logo'), addNewCompany)
//end of adding new bus bus


//login a company
router.post('/login',loginCompany)


//reset password
router.put('/reset-password',resetPassword)
// end of password reset

//update a bus company /123
router.patch('/:id',uploadFile.single('logo'),updateCompany)
//end of update route


//delete a bus /bus/123
router.delete('/:id',deleteCompany)
//end of delete route


module.exports = router