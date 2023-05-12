const jwt = require('jsonwebtoken')



const requireAuth=(req,res,next)=>{
    const token = req.cookies.login //get user login token
    if(token){
        jwt.verify(token,process.env.SECRET,(err,decodedToken)=>{
            if(err){
                res.redirect('/login') //if token is not valid refirect user
            }else{
                next() //else run the next middleware
            }
        })
    }else{
        res.redirect('/login') //if theres no token take user to login screen
    }
}

module.exports = requireAuth