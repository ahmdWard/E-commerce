// login //sign up //forgetPassword //resetPassword //sendemil 

const jwt = require('jsonwebtoken')
const catchAsync = require('../middlewares/asyncWrapper');
const signToken = require('../utils/signToken')
const userModel = require('../models/userModel')
const AppError = require('../utils/appError')


const createAndSendToken = (user,statusCode,res)=>{

    const token = signToken(user._id); 

    res.status(statusCode).json({
        status:'success',
        token,
        data:{
            user
        }
    })
}

exports.signUp= catchAsync(async(req,res,next)=>{

    const {email , password , passwordConfirm ,phone,firstName,lastName} =req.body
    const user = await userModel.create({
        firstName,
        lastName,
        email,
        password,
        passwordConfirm,
        phone
    })
 
    createAndSendToken(user , 201 , res)
    
})

exports.login =catchAsync(async(req,res,next)=>{

    const {email , password} = req.body

    // check if the email and password exist 

    if(!email||!password){
        return next(new AppError('email and password are required',400))
    }

    const user = await userModel.findOne({email}).select('+password')

    // check if the user and password is correct 

    if(!user || !(await user.correctPassword(password,user.password)))
        return next(new AppError('email or password is incorrect'),401)

    user.password=undefined


    createAndSendToken(user , 200 , res)
})

exports.protect = catchAsync(async(req,res,next)=>{

    let token 

    // getting token
    if(req.headers.authorization||req.headers.authorization.startsWith('Barear'))
        token=req.headers.authorization.split('')[1]
    
     //check if the token is exist
     if(!token)
        return next(new AppError('login first to get the access')) 
    
     //check the validation of the token 
    const decoded = await promisify(jwt.verify)(token,process.env.JWT_SECRET)

    

})