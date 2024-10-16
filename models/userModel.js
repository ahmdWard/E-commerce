const { default: mongoose } = require('mongoose')
const moongose= require('mongoose')
const validator = require('validator')

const userSchema= new mongoose.Schema({
    firstName:{
        type:String,
        required:[true,"first name is required"]
    },
    lastName:{
        type:String,
        required:[true,"last name is required"]
    },
    email:{
        type:String,
        required:[true,"email is required"],
        unique:[true,"email must be unique"],
        validate:[validator.isEmail,"email is not valid"]

    },
    image:String,
    password:{
        type:String,
        required:[true,"password is required"],
        minlength:[10,"password is too short"]
    },
    passwordConfirm:{
        type:String,
        required:[true,"password Confirm  is required"],
       validate:{
        validator:function(el){
            return el===this.password
        },
        message: 'Passwords are not the same!'
       }
    },
    phone:{
        type:String,
        required:[true,"phone is required"],
        match:/01[0-2,5]\d{1,8}/
    },
    active:{
        type:Boolean,
        default:true
    }
    

})

module.exports=moongose.model("user",userSchema)