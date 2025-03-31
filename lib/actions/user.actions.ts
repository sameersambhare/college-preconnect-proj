'use server'
import userModel from "../models/user";
import {connectDatabase} from "../connectdb";
import { revalidatePath } from "next/cache";

export async function fetchUser(userEmail:string){
    try{
        await connectDatabase();
        const user = await userModel.findOne({email:userEmail}).lean();
        return JSON.parse(JSON.stringify(user));
    }
    catch(err:any){
        throw new Error(`Error in fetching user: ${err.message}`);
    }
}

export async function updateUser(userData:any){
    const {name,email,collegename,branch,year,path}=userData;
    try{
        await connectDatabase();
        const updatedUser = await userModel.findOneAndUpdate(
            { email: email },
            {
                name: name,
                email: email,
                collegename: collegename,
                branch: branch,
                year: year,
                onboarded: true,
            },
            {
                upsert: true,
                new: true, // Return the updated document
            }
        ).lean();

        if(path==="/profile/edit"){
            revalidatePath(path);
        }
        
        return JSON.parse(JSON.stringify(updatedUser));
    }
    catch(err:any){
        throw new Error(`Error in creating user: ${err.message}`);
    }
}

export async function fetchAllUsers(userId:string){
    try{
        await connectDatabase();
        console.log(userId);
        const users = await userModel.find({_id:{$ne:userId}})
        console.log(users)
        return JSON.parse(JSON.stringify(users));
    }
    catch(err:any){
        throw new Error(`Error in fetching all users: ${err.message}`);
    }
}

export async function sendConnectionRequest(senderId:string,receiverId:string){
    try{
        await connectDatabase();
        
        // Check if request already exists
        const sender: any = await userModel.findById(senderId).lean();
        if (sender && sender.sendRequests && Array.isArray(sender.sendRequests) && 
            sender.sendRequests.some((id: any) => id.toString() === receiverId)) {
            return {success:false, message:"Connection request already sent"};
        }
        
        // If no existing request, proceed with sending
        await userModel.findByIdAndUpdate(senderId,{
            $push:{
                sendRequests:receiverId,
            }
        });
        await userModel.findByIdAndUpdate(receiverId,{
            $push:{
                receivedRequests:senderId,
            }
        });
        return {success:true, message:"Connection request sent"};
    }
    catch(err:any){
        throw new Error(`Error in sending connection request: ${err.message}`);
    }
}
