import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
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
    receiver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
});
const messageModel = mongoose.models.Message || mongoose.model("Message", messageSchema);

export default messageModel;