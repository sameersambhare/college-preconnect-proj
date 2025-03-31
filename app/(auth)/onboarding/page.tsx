import { ProfileForm } from '@/components/ProfileForm'
import { redirect } from 'next/navigation'
import React from 'react'
import { currentUser } from '@clerk/nextjs/server'
const page = async () => {
  const user=await currentUser()
  if(!user){
    redirect("/sign-in")
  }
  return (
    <div>
      <ProfileForm email={user?.emailAddresses[0].emailAddress}/>
    </div>
  )
}

export default page