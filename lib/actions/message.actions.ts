"use server"
import { pusherServer } from "../pusher"
import messageModel from "../models/message"
import { connectDatabase } from "../connectdb"
import communityMsgModel from "../models/communitymsg"
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
        const senderid=message.sender;
        const receiverid=message.receiver;
        const channelname=[senderid,receiverid].sort().join('-');
        await pusherServer.trigger(channelname,'upcoming-message', {
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
interface ImessageObj{
    communityId:string,
    text:string,
    senderId:string,
}
export const sendCommunityMessage=async(messageObj:ImessageObj)=>{
    try{
        await connectDatabase()
        const newMessage=await new communityMsgModel({
            communityId:messageObj.communityId,
            text: messageObj.text,
            createdAt:new Date(),
            sender:messageObj.senderId,
        })
        pusherServer.trigger(messageObj.communityId,'upcoming-com-message',{
            text:messageObj.text,
            createdAt:newMessage.createdAt,
            senderId:messageObj.senderId,
        })
    }
    catch(err:any){
        throw new Error(`Error in sending the message: ${err.message}`)
    }
}