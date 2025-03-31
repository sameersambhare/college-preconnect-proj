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
    sendRequests:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'USER',
        }
    ],
    receivedRequests:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'USER',
        }
    ],
    connections:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'USER',
        }
    ],
    onboarded:{
        type:Boolean,
        default:false,
    }
})
const userModel=mongoose.models.USER||mongoose.model("USER",UserSchema);
export default userModel;