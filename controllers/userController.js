const userModel= require('../models/userModel')
const catchAsync= require('../middlewares/asyncWrapper')

exports.createUser=catchAsync(async(req,res,next)=>{

    const user = await userModel.create(req.body)

    res.status(201).json({
        status:"success",
        data:{
            user
        }
    })
})

exports.getAllUsers = catchAsync(async(req,res,next)=>{
    
    const users= await userModel.find()

    res.status(201).json({
        status:"success",
        length:users.length,
        data:{
            users
        }
    })
})