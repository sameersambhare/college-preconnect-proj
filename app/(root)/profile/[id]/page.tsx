import React from 'react'
import { fetchUserById } from '@/lib/actions/user.actions'
import { currentUser } from '@clerk/nextjs/server'
const Page = async ({ params }: {params:{id:string}}) => {
  const {id}=await params;
  const userInfo = await fetchUserById(id)
  const currentUserInfo = await currentUser()
  if (!userInfo) {
    return (
      <div className="max-w-md mx-auto p-6">
        <div className="bg-white rounded-lg shadow-sm p-10 text-center">
          <h2 className="text-xl font-semibold text-gray-700">User not found</h2>
          <p className="text-gray-500 mt-2">The profile you're looking for doesn't exist.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-md mx-auto p-6">
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        {/* Profile Header */}
        <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-6">
          <div className="flex flex-col items-center">
            <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center mb-4">
              <span className="text-orange-500 font-bold text-3xl">
                {userInfo.name.charAt(0).toUpperCase()}
              </span>
            </div>
            <h1 className="text-2xl font-bold text-white text-center">{userInfo.name}</h1>
            <p className="text-orange-100 mt-1 text-sm">{userInfo.email}</p>
          </div>
        </div>

        {/* Profile Content */}
        <div className="p-6">
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium text-gray-500">College</h3>
              <p className="mt-1 text-gray-900">{userInfo.collegename}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">Branch</h3>
              <p className="mt-1 text-gray-900">{userInfo.branch}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">Year</h3>
              <p className="mt-1 text-gray-900">{userInfo.year} Year</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Page