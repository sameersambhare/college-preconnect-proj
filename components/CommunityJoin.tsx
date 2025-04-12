"use client"
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { joinCommunity, getCommunityInfo } from '@/lib/actions/community.actions';

const CommunityJoin = ({communityID, userId}: {communityID: string, userId: string}) => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [community, setCommunity] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCommunityData = async () => {
      try {
        const communityData = await getCommunityInfo(communityID, userId);
        setCommunity(communityData);
        setLoading(false);
      } catch (err: any) {
        console.error('Error fetching community:', err);
        setError(err.message || 'Failed to load community information');
        setLoading(false);
      }
    };

    fetchCommunityData();
  }, [communityID, userId]);

  const handleJoin = async () => {
    setIsSubmitting(true);
    setError('');
    
    try {
      await joinCommunity(communityID, userId);
      router.push(`/communities/${communityID}`);
    } catch (err: any) {
      console.error('Error joining community:', err);
      setError(err.message || 'Failed to join community');
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-8 text-center">
        <p className="text-gray-600">Loading community information...</p>
      </div>
    );
  }

  // Format date for display
  const createdDate = community?.createdAt 
    ? new Date(community.createdAt).toLocaleDateString('en-US', {
        year: 'numeric', 
        month: 'long', 
        day: 'numeric'
      })
    : '';

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      {/* Back Button */}
      <Link href={`/communities/${communityID}`} className="flex items-center text-gray-600 mb-6 hover:text-orange-500 transition-colors">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Back to Community
      </Link>
      
      <div className="text-center mb-8">
        <h4 className="text-orange-500 font-medium mb-2">Community Membership</h4>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Join {community?.communityname}
        </h1>
        <p className="text-gray-600">
          Connect with like-minded peers in this community
        </p>
      </div>

      <div className="bg-white p-8 rounded-lg">
        <div className="mb-8">
          <div className="flex items-center justify-center mb-6">
            <div className="w-20 h-20 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold text-3xl">
              {community?.communityname?.charAt(0).toUpperCase()}
            </div>
          </div>
          
          <h2 className="text-xl font-semibold text-gray-900 mb-2 text-center">{community?.communityname}</h2>
          <p className="text-gray-500 text-center mb-6">Created on {createdDate}</p>
          
          <div className="bg-gray-50 p-4 rounded-lg mb-6">
            <h3 className="font-semibold text-gray-900 mb-2">About</h3>
            <p className="text-gray-700">{community?.description}</p>
          </div>
          
          <div className="flex justify-center mb-6">
            <div className="flex items-center">
              <div className="bg-orange-100 rounded-full p-2 mr-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <div>
                <p className="text-sm text-gray-500">Members</p>
                <p className="font-semibold text-gray-900">{community?.members?.length || 0}</p>
              </div>
            </div>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}

        <div className="flex justify-center space-x-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push(`/communities/${communityID}`)}
            className="border-gray-300 text-gray-700"
          >
            Cancel
          </Button>
          <Button
            onClick={handleJoin}
            className="bg-orange-500 hover:bg-orange-600 text-white"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Joining...' : 'Join Community'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CommunityJoin;