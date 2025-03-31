import mongoose from "mongoose";
const UserSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    collegename:{
        type:String,
        required:true,
    },
    branch:{
        type:String,
        required:true,
    },
    year:{
        type:Number,
        required:true,  
    },
    onboarded:{
        type:Boolean,
        default:false,
    }
})
const userModel=mongoose.models.USER||mongoose.model("USER",UserSchema);
export default userModel;