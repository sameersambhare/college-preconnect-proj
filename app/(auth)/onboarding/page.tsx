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
  
  const userData={
    name: userInfo?.name,
    email: userInfo?.email,
    collegename: userInfo?.collegename,
    branch: userInfo?.branch,
    mobile: userInfo?.mobile,
    address: userInfo?.address,
    city: userInfo?.city,
    state: userInfo?.state,
    gender: userInfo?.gender,
    year: userInfo?.year,
    dob: userInfo?.dob,
    district: userInfo?.district,
    onboarded: userInfo?.onboarded,
  }
  return (
    <div>
      <ProfileForm userData={userData}/>
    </div>
  )
}

export default page