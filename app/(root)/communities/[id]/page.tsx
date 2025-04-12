"use server"
import React from 'react'
import { getCommunityInfo } from '@/lib/actions/community.actions';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { fetchUser } from '@/lib/actions/user.actions';
import { currentUser } from '@clerk/nextjs/server';
type tParams=Promise<{id:string}>
const CommunityDetailsPage = async({params}:{params:tParams}) => {
    // Get current user
    const user = await currentUser();
    let userInfo = null;
    if (user) {
      const email = user.emailAddresses[0]?.emailAddress;
      userInfo = await fetchUser(email);
    }
    const {id} = await params;
    const community = await getCommunityInfo(id,userInfo._id);
    // Check if user is a member
    const isMember = userInfo ? community.members.includes(userInfo._id) : false;
    
    // Format date for display
    const createdDate = new Date(community.createdAt).toLocaleDateString('en-US', {
      year: 'numeric', 
      month: 'long', 
      day: 'numeric'
    });

    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Back Button */}
        <Link href="/communities" className="flex items-center text-gray-600 mb-6 hover:text-orange-500 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Communities
        </Link>
        
        {/* Community Header */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
          <div className="bg-gradient-to-r from-orange-500 to-orange-600 h-32 md:h-48 relative">
            <div className="absolute bottom-0 left-0 transform translate-y-1/2 ml-8">
              <div className="w-20 h-20 md:w-28 md:h-28 bg-orange-100 rounded-full flex items-center justify-center text-orange-500 font-bold text-4xl border-4 border-white">
                {community.communityname.charAt(0).toUpperCase()}
              </div>
            </div>
          </div>
          
          <div className="pt-16 md:pt-20 px-8 pb-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">{community.communityname}</h1>
                <p className="text-gray-500 mt-1">Created on {createdDate}</p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3 mt-4 md:mt-0">
                {userInfo && !isMember && (
                  <Link href={`/communities/${id}/join`}>
                    <Button className="bg-orange-500 hover:bg-orange-600 text-white">
                      Join Community
                    </Button>
                  </Link>
                )}
                
                <Link href={`/communities/${id}/chat`}>
                  <Button className="bg-orange-500 hover:bg-orange-600 text-white flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
                    </svg>
                    Chat
                  </Button>
                </Link>
              </div>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg mb-6">
              <h2 className="font-semibold text-gray-900 mb-2">About</h2>
              <p className="text-gray-700">{community.description}</p>
            </div>
            
            <div className="flex flex-wrap gap-6">
              <div className="flex items-center">
                <div className="bg-orange-100 rounded-full p-2 mr-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Members</p>
                  <p className="font-semibold text-gray-900">{community.members?.length || 0}</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <div className="bg-orange-100 rounded-full p-2 mr-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Created</p>
                  <p className="font-semibold text-gray-900">{createdDate}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
}

export default CommunityDetailsPage;