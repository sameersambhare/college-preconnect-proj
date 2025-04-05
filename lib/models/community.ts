import mongoose from "mongoose";

const communitySchema=new mongoose.Schema({
    communityname:{
        type:String,
        required:true,
    },
    admin:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
    },
    description:{
        type:String,
        required:true,
    },
    members:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
        }
    ],
    createdAt:{
        type:Date,
        default:Date.now,
    }
})


 const CommunityModel = mongoose.models.Community || mongoose.model('Community', communitySchema);
 export default CommunityModel;