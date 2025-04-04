"use server"
import { pusherServer } from "../pusher"
import messageModel from "../models/message"
import { connectDatabase } from "../connectdb"
interface messageType{
    text:string,
    sender:string,
    receiver:string,
}
export const sendMessage=async(message:messageType)=>{
    try{
        await connectDatabase();
        const newMessage=new messageModel({
            text:message.text,
            sender:message.sender,
            receiver:message.receiver,
            createdAt: new Date()
        })
        await newMessage.save();
        await pusherServer.trigger('college-preconnect','upcoming-message', {
            text: message.text,
            sender: message.sender,
            receiver: message.receiver,
            createdAt: newMessage.createdAt
        })
    }
    catch(err:any){
        throw new Error(`Error in sending the message: ${err.message}`)
    }
}

export const fetchMessages = async (senderId: string, receiverId: string) => {
    try {
        await connectDatabase();
        const messages = await messageModel.find({
            $or: [
                { sender: senderId, receiver: receiverId },
                { sender: receiverId, receiver: senderId }
            ]
        }).sort({ createdAt: 1 });
        return JSON.parse(JSON.stringify(messages));
    } catch (err: any) {
        throw new Error(`Error in fetching messages: ${err.message}`);
    }
};

