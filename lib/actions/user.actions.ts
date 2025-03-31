'use server'
import userModel from "../models/user";
import {connectDatabase} from "../connectdb";
import { revalidatePath } from "next/cache";
export async function fetchUser(userEmail:string){
    try{
        await connectDatabase();
        const user=await userModel.findOne({email:userEmail});
        return user;
    }
    catch(err:any){
        throw new Error(`Error in fetching user: ${err.message}`);
    }
}
export async function updateUser(userData:any){
    const {name,email,collegename,branch,year,path}=userData;
    try{
        await connectDatabase();
        return userModel.findOneAndUpdate({
            email:email,
        },{
            name:name,
            email:email,
            collegename:collegename,
            branch:branch,
            year:year,
            onboarded:true,
        },{
            upsert:true,
        });

        if(path==="/profile/edit"){
            revalidatePath(path);
        }
    }
    catch(err:any){
        throw new Error(`Error in creating user: ${err.message}`);
}
}
export async function fetchAllUsers(){
    try{
        await connectDatabase();
        const users=await userModel.find({});
        return users;
    }
    catch(err:any){
        throw new Error(`Error in fetching all users: ${err.message}`);
    }
}
