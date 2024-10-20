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


exports.getUser = catchAsync(async(req,res,next)=>{

    const user = await userModel.findById(req.params.id)

    res.status(200).json({
        status:"success",
        data:{
            user
        }
    })
})

exports.updateUser= catchAsync(async(req,res,next)=>{

    const user = await userModel.findByIdAndUpdate(req.params.id,req.body,{
        new:true
    })

    res.status(200).json({
        status:"success",
        data:{
            user
        }
    })
})

exports.deleteUser= catchAsync(async(req,res,next)=>{

     await userModel.findByIdAndDelete(req.params)

    res.status(204).json({
        status:"success"
    })
})