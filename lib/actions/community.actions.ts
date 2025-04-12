"use server"
import { connectDatabase } from "../connectdb";
import CommunityModel from "../models/community";
import userModel from "../models/user";
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

export async function getCommunityInfo(communityId: string, userId?: string) {
    try {
        await connectDatabase()
        const communityInfo = await CommunityModel.findById(communityId)
        
        if (!communityInfo) {
            throw new Error("Community not found");
        }
        
        if (userId && !communityInfo.members.includes(userId)) {
            // User is not a member, handle accordingly
            // For now, still return the community info but client can check membership
        }
        
        return JSON.parse(JSON.stringify(communityInfo))
    }
    catch(err: any) {
        throw new Error(`Error in fetching the community details: ${err.message}`)
    }
}

export async function getCommunityList(userId: string) {
    try {
        await connectDatabase();
        
        const user = await userModel.findById(userId).populate('communities');
        
        if (!user) {
            throw new Error("User not found");
        }
        
        return JSON.parse(JSON.stringify(user.communities));
    } catch (err: any) {
        throw new Error(`Error fetching user's communities: ${err.message}`);
    }
}

export async function joinCommunity(communityId: string, userId: string) {
    try {
        await connectDatabase();
        const community = await CommunityModel.findById(communityId);
        const user = await userModel.findById(userId)
        
        if (!community || !user) {
            throw new Error("Community or user not found")
        }
        
        if (community.members.includes(userId)) {
            return JSON.parse(JSON.stringify(community));
        }
        
        community.members.push(user._id)
        user.communities.push(community._id)
        await community.save()
        await user.save()
        
        return JSON.parse(JSON.stringify(community))
    }
    catch(err: any) {
        throw new Error(`Error in joining the community: ${err.message}`)
    }
}
