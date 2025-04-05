import mongoose from "mongoose";

const communityMessageSchema = new mongoose.Schema({
    communityId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Community',
    },
    text: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
});
const communityMsgModel = mongoose.models.CommunityMessage || mongoose.model("CommunityMessage", communityMessageSchema);

export default communityMsgModel;