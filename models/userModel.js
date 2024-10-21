const { default: mongoose } = require('mongoose')
const moongose= require('mongoose')
const validator = require('validator')
const bcrypt= require('bcrypt')
const crypto =require('crypto')

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
       },
    },
    phone:{
        type:String,
        required:[true,"phone is required"],
        match:/01[0-2,5]\d{1,8}/
    },
    active:{
        type:Boolean,
        default:true
    },
    passwordChangedAt:Date,
    passwordResetToken:String,
    passwordResetTokenExpireAt:Date,
    
})

// ecrypting password before saving

userSchema.pre('save',async function(next){

    if (!this.isModified('password')) return next();
    
    //hashing password
   this.password = await bcrypt.hash(this.password,12)
    
   this.passwordConfirm = undefined
   next()
})

userSchema.methods.correctPassword= async function(candidatePassword ,userPassword){

    return await bcrypt.compare(candidatePassword,userPassword)
}

userSchema.methods.generateResetToken = function(){


    const resetToken = crypto.randomBytes(32).toString('hex')

    console.log(resetToken);
    
    this.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex')

    console.log(this.passwordResetToken);
    

    this.passwordResetTokenExpireAt = Date.now()+10*60*1000

    return resetToken

}

module.exports=moongose.model("user",userSchema)





