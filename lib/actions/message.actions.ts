"use server"
import { pusherServer } from "../pusher"
import messageModel from "../models/message"
import { connectDatabase } from "../connectdb"
import communityMsgModel from "../models/communitymsg"
import userModel from "../models/user"

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
    sender:string,
}

export const sendCommunityMessage = async(messageObj: ImessageObj) => {
    try {
        await connectDatabase();
        
        // Get sender info to include the sender name
        const sender = await userModel.findById(messageObj.sender);
        if (!sender) {
            throw new Error("Sender not found");
        }
        
        const newMessage = new communityMsgModel({
            communityId: messageObj.communityId,
            text: messageObj.text,
            sender: messageObj.sender,
            senderName: sender.name,
            createdAt: new Date()
        });
        
        await newMessage.save();
        
        // Trigger the pusher event with the channel named after the community
        const channelName = `community-${messageObj.communityId}`;
        await pusherServer.trigger(channelName, 'community-message', {
            text: messageObj.text,
            sender: messageObj.sender,
            senderName: sender.name,
            createdAt: newMessage.createdAt
        });
        
        return JSON.parse(JSON.stringify(newMessage));
    } catch (err: any) {
        throw new Error(`Error in sending the community message: ${err.message}`);
    }
}

export const fetchCommunityMessages = async (communityId: string) => {
    try {
        await connectDatabase();
        
        // Get all messages for this community
        const messages = await communityMsgModel.find({
            communityId: communityId
        }).sort({ createdAt: 1 });
        
        return JSON.parse(JSON.stringify(messages));
    } catch (err: any) {
        throw new Error(`Error in fetching community messages: ${err.message}`);
    }
};