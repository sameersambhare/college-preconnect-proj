import { ProfileForm } from '@/components/ProfileForm'
import { redirect } from 'next/navigation'
import React from 'react'
import { fetchUser } from '@/lib/actions/user.actions'
import { currentUser } from '@clerk/nextjs/server'
const page = async () => {
  const user=await currentUser()
  if(!user){
    redirect("/sign-in")
  }
  const email=user?.emailAddresses[0].emailAddress;
  const userInfo=await fetchUser(email);
  return (
    <div>
      <ProfileForm email={user?.emailAddresses[0].emailAddress}/>
    </div>
  )
}

export default page