"use server"
import { connectDatabase } from "../connectdb";
import contactModel from "../models/contact";
import { redirect } from "next/navigation";

export async function SendContactMessage({name,email,subject,message}:{name:string,email:string,subject:string,message:string}) {
    try{
        await connectDatabase();
        const contactmessage=await contactModel.create({name,email,subject,message});
        console.log(contactmessage+'has been sent successfully from server');
        return JSON.parse(JSON.stringify(contactmessage))
    }
    catch(err:any){
        throw new Error(`Error in sending the contact message: ${err.message}`);
    }
}