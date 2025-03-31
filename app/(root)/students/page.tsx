import { fetchAllUsers, fetchUser } from '@/lib/actions/user.actions'
import React from 'react'
import Image from 'next/image'
import { currentUser } from '@clerk/nextjs/server'
import ConnectButton from '@/components/ConnectButton'
import { redirect } from 'next/navigation'

const page = async () => {

  const user=await currentUser()
  const email = user?.emailAddresses[0]?.emailAddress || "";
  const userInfo = await fetchUser(email);
  if(!userInfo?.onboarded) redirect('/onboarding')

  const users = await fetchAllUsers(userInfo._id);
  
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-8 text-center">Connect with Students</h1>
      
      <div className="bg-white rounded-lg shadow overflow-hidden">
        {/* Table header */}
        <div className="grid grid-cols-6 gap-4 px-6 py-4 bg-gray-50 border-b border-gray-200 font-medium text-gray-700">
          <div className="col-span-2">Student</div>
          <div>College</div>
          <div>Branch</div>
          <div>Year</div>
          <div>Action</div>
        </div>
        
        {/* Table body */}
        <div className="divide-y divide-gray-200">
          {users.map((item:any, index:any) => (
            <div key={index} className="grid grid-cols-6 gap-4 px-6 py-4 hover:bg-gray-50 items-center">
              <div className="col-span-2 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center shrink-0">
                  <Image 
                    src="/assets/avatar.png" 
                    alt={`${item.name}'s avatar`} 
                    width={30} 
                    height={30}
                    className="rounded-full"
                  />
                </div>
                <div>
                  <div className="font-medium text-gray-900">{item.name}</div>
                  <div className="text-sm text-gray-500">{item.email}</div>
                </div>
              </div>
              
              <div className="text-gray-600 truncate">{item.collegename}</div>
              <div className="text-gray-600 truncate">{item.branch}</div>
              <div className="text-gray-600">{item.year}</div>
              
              <div>
                <ConnectButton userId={userInfo?._id} targetId={item._id} />
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {users.length === 0 && (
        <div className="text-center py-10 text-gray-500">
          No students found
        </div>
      )}
    </div>
  )
}

export default page
