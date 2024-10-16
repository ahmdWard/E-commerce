const productModel = require('../models/productModel')
const catchAsync = require('../middlewares/asyncWrapper')

exports.getAllProducts=catchAsync(async(req,res,next)=>{

    const products=await productModel.find()
    
    res.status(200).json({
        status:"success",
        length:products.length,
        data:{
            products
        }
    })

})
exports.createProduct=catchAsync(async(req,res,next)=>{
    
    const product= await productModel.create(req.body)

    res.status(201).json({
        status:"success",
        data:{
            product
        }
    })
})

exports.getProduct=catchAsync(async(req,res,next)=>{
    const product = await productModel.findById(req.params.id)
    res.status(201).json({
        status:"success",
        data:{
            product
        }
    })
})

exports.deleteProduct=catchAsync(async(req,res,next)=>{
    
    await productModel.findByIdAndDelete(req.params.id)
    res.status(204).json({
        status:"success"
    })
})

exports.updateProduct=catchAsync(async(req,res,next)=>{
       
    const product= await productModel.findByIdAndUpdate(req.params.id,req.body,{
        new:true
    })

    res.status(200).json({
        status:"success",
        data:{
            product
        }
    })
    
})

