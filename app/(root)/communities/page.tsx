"use server"
import React from 'react'
import { getAllCommunities } from '@/lib/actions/community.actions';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const CommunityPage = async() => {
  const communities = await getAllCommunities();
  const hasCommunities = communities?.length > 0;
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Communities</h1>
          <p className="text-gray-600 mt-2">Connect with peers in your field of interest</p>
        </div>
        
        <Link href='/create-community'>
          <Button className="bg-orange-500 hover:bg-orange-600 text-white">
              Create Community
            </Button>
          </Link>
      </div>

      {hasCommunities ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {communities.map((community: any, index: number) => (
            <div 
              key={index} 
              className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow duration-300"
            >
              <div className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center text-orange-500 font-bold text-xl">
                    {community.communityname.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900">{community.communityname}</h2>
                    <p className="text-sm text-gray-500">{community.members?.length || 0} members</p>
                  </div>
                </div>
                
                <p className="text-gray-700 mb-4 line-clamp-2">{community.description}</p>
                
                <div className="flex justify-between items-center">
                  <Link href={`/communities/${community._id}/join`}>
                    <Button 
                      variant="outline" 
                      className="border-orange-500 text-orange-500 hover:bg-orange-50"
                    >
                      Join Community
                    </Button>
                  </Link>
                  <Link href={`/communities/${community._id}`}>
                    <Button variant="ghost" className="text-gray-600">
                      View Details
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-gray-50 rounded-lg p-8 text-center mb-12">
          <div className="w-24 h-24 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">No Communities Found</h2>
          <p className="text-gray-600 mb-6">Be the first to create a community and connect with others!</p>
          <Link href='/create-community'>
          <Button className="bg-orange-500 hover:bg-orange-600 text-white">
              Create Your First Community
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
}

export default CommunityPage;