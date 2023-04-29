const express = require('express')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const cors = require('cors')
const path =require('path')

//Routes
const busesRoutes = require('./routes/busesRoute')
const bookingRoutes = require('./routes/bookingsRoute')
const usersRoutes = require('./routes/usersRoute')
const companyRoutes = require('./routes/companyRoute')

//config environment
dotenv.config()
//initalize app
const app = express()

//middlewares
app.use(express.json())
// Serve static files from the public folder
app.use(express.static(path.join(__dirname, 'public')));

// Serve static files from the client folder
app.use(express.static(path.join(__dirname, 'client')));
//cors middleware
app.use(cors())


//MONGODB CONNECTION
mongoose.connect(process.env.DB_URL ,{useNewUrlParser:true,dbName: 'myryd'})
.then(()=>{
    app.listen(process.env.PORT,()=>{
        console.log("server running")
    })
}).catch(err=>{
    console.log(err.message)
})
//end of connection


//buses routes
app.use('/bus',busesRoutes)
//booking routes
app.use('/booking', bookingRoutes)
//users routes
app.use('/user', usersRoutes)
//company routes
app.use('/company', companyRoutes)




