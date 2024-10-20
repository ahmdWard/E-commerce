const jwt = require('jsonwebtoken')

const signToken = (playlaod)=>{
    
   return jwt.sign({userId:playlaod},process.env.JWT_SECRET,{
        expiresIn:process.env.JWT_EXPIRE_IN
    })
  
}

module.exports=signToken