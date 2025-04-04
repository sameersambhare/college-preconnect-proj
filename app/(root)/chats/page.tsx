import { fetchConnections, fetchUser } from '@/lib/actions/user.actions';
import { currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation';
import React from 'react'
import ChatUI from '@/components/ChatUI';

const page = async () => {
  const user = await currentUser();
  if (!user) return null;
  
  const email = user?.emailAddresses[0]?.emailAddress;
  const userInfo = await fetchUser(email)
  if (!userInfo?.onboarded) redirect('/onboarding')
  
  const friends = await fetchConnections(userInfo._id);

  return (
    <div className="container mx-auto">
      <ChatUI friends={friends} currentUserId={userInfo._id} />
    </div>
  )
}

export default page