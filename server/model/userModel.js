const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    name: {
        type:String,
        required:true,
        trim: true
    },
    email: {
        type:String,
        required: true,
        trim:true,
        unique:true
    },
    address:{
        type:String,
        default: {}
    },
    mobile: {
       type:String,
       required: true,
       trim:true,
       unique:true
    },
    password:{
        type:String,
        required: true,
        trim:true,
        unique:true
    },
    role: {
        type: String,
        default: "user"
    },
    image: {
        type:Object,
        default: {}
    },
    isActive: {
        type:Boolean,
        default:true
    },
    validateEmail: {
        type: Boolean,
        default: false
    },
    validateMobile: {
        type:String,
        default:false
    }
},{
    collection: "users",
    timestamps:true
})

module.exports = mongoose.model("user", UserSchema)