"use server"
import { connectDatabase } from "../connectdb";
import CommunityModel from "../models/community";

export const createCommunity = async (communityname: string, admin: string, description: string) => { 
    try {
        await connectDatabase();
        const newCommunity = await CommunityModel.create({
            communityname,
            description,
            admin,
            members: [admin],
        });
        return JSON.parse(JSON.stringify(newCommunity));
    } catch (err: any) {
        throw new Error(`Error in creating the community: ${err.message}`);
    }
};

export const getAllCommunities = async () => {
    try {
        await connectDatabase();
        const communities = await CommunityModel.find();
        return JSON.parse(JSON.stringify(communities));
    } catch (err: any) {
        throw new Error(`Error in getting all communities: ${err.message}`);
    }
};

export async function getCommunityInfo(communityId:string) {
    try{
        await connectDatabase()
        const communityInfo=await CommunityModel.findById(communityId)
        return JSON.parse(JSON.stringify(communityInfo))
    }
    catch(err:any){
        throw new Error(`Error in fetching the community details: ${err.message}`)
    }
}
