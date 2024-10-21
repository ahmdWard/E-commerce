// login //sign up //forgetPassword //resetPassword //sendemil 

const jwt = require('jsonwebtoken')
const catchAsync = require('../middlewares/asyncWrapper');
const signToken = require('../utils/signToken')
const userModel = require('../models/userModel')
const AppError = require('../utils/appError')
const { promisify } = require('util');
const crypto = require('crypto')


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
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer'))
        token=req.headers.authorization.split(' ')[1]
    
     //check if the token is exist
     if(!token)
        return next(new AppError('login first to get the access')) 
    
     //check the validation of the token 
    const decoded = await promisify(jwt.verify)(token,process.env.JWT_SECRET)
    
    const currentUser = await userModel.findById(decoded.userId);

    //check if the user still exist 
    if (!currentUser) {
        return next(new AppError('The user belonging to this token does no longer exist.', 401));
    }

    next()

})


exports.forgerPassword= catchAsync(async(req,res,next)=>{

    const {email} =req.body

    if(!email)
        return next(new AppError('email is required'),400)

    const user = await userModel.findOne({email})
     
    console.log(user)
    if(!user)
        return next(new AppError('no user with this email'),404)

    const resetToken =user.generateResetToken()

    // everytime you save the model it validate the schema 
     await user.save({validateBeforeSave:false})


    res.status(200).json({
        status:"success",
        data:{
            user
        }
    })
    
})

exports.resetPassword = catchAsync(async(req,res,next)=>{

    const token = req.params.token

    const hashedToken = crypto.createHash('sha256').update(token).digest('hex')

    const user = await userModel.findOne({
        passwordResetToken:hashedToken,
        passwordResetTokenExpireAt:{$gt:Date.now()-1}
});

      // 2) If token has not expired, and there is user, set the new password

    if(!user){
        return next(new AppError('this token isnot valid or expired'),400)
    }

    user.password = req.body.password;
    user.passwordConfirm = req.body.passwordConfirm
    
    user.passwordResetToken=undefined
    user.passwordResetTokenExpireAt=undefined
    user.passwordChangedAt=Date.now()

    await user.save()

    res.status(200).json({
        status:"success",
        data:{
            user,
            message:'kolo bono'
        }
    })
})