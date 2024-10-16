const mongoose= require('mongoose')

const Productschema = new mongoose.Schema({
    title:{
        type:String,
        required:[true,"product title is required"],
        min:[3,"too short title"],
        max:[50,"too long title"]

    },
    description:{
        type:String,
        required:[true,"product description is required"],
        minlength:[20,"too short description"]
    },
    price:{
        type:Number,
        required:[true,"product price is required"],
    },
    quantity:{
        type:Number,
        required:[true,"product quantity is required"]
    },
    sold:{
        type:Number,
        default:0
    },
    Image:String
})

module.exports=mongoose.model('product',Productschema)