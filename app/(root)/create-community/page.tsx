import React from 'react'
import { fetchUser } from '@/lib/actions/user.actions';
import Image from 'next/image';
import { currentUser } from '@clerk/nextjs/server'
import CommunityForm from '@/components/CommunityForm'
const page = async() => {
  const user = await currentUser();
  if(!user) return null;
  
  const email = user?.emailAddresses[0]?.emailAddress;
  const userInfo = await fetchUser(email);
  return (
    <div id="community-form" className="bg-gray-50 rounded-lg p-6 md:p-8">
    <h2 className="text-2xl font-bold text-gray-900 mb-6">Create a New Community</h2>
    <CommunityForm UserId={userInfo?._id} />
  </div>
  )
}

export default page