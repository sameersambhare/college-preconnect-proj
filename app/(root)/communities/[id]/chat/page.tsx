"use server"
import React from 'react'
import { currentUser } from '@clerk/nextjs/server'
import { fetchUser } from '@/lib/actions/user.actions'
import CommunityChatUI from '@/components/CommunityChatUI'

const page = async() => {
  const user=await currentUser()
  if(!user) return null
  const email=user?.emailAddresses[0]?.emailAddress;
  const userInfo=await fetchUser(email)
  const currentUserId=userInfo?._id;
  return (
    <div>
      <CommunityChatUI currentUserId={currentUserId}/>
    </div>
  )
}

export default page