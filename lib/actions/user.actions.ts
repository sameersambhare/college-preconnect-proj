import userModel from "../models/user";
import {connectDatabase} from "../connectdb";

interface UserData{
    name:string;
    email:string;
    collegename:string;
    branch:string;
    year:number;
    onboarded:boolean;
}
export async function createUser(userData:any){
    try{
        await connectDatabase();
        const user=await userModel.create(userData);
        return user;
    }
    catch(err:any){
        throw new Error(`Error in creating user: ${err.message}`);
}
}