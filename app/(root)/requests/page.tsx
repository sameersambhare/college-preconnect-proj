import { showsendRequests } from '@/lib/actions/user.actions';
import { fetchUser } from '@/lib/actions/user.actions';
import React from 'react'
import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const RequestsPage = async () => {
  const user=await currentUser();
  if(!user) redirect("/sign-in")
  const email=user.emailAddresses[0].emailAddress
  const userInfo=await fetchUser(email)
  if(!userInfo?.onboarded) redirect('/onboarding')
  const requests=await showsendRequests(userInfo._id);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Sent Requests</h1>
        <p className="text-gray-600 mt-2">Connection requests you've sent to other students.</p>
      </div>

      {requests.length === 0 ? (
        <div className="bg-white rounded-lg shadow-sm p-10 text-center">
          <div className="flex flex-col items-center gap-4">
            <h2 className="text-xl font-semibold text-gray-700">No sent requests</h2>
            <p className="text-gray-500 max-w-md">
              You haven't sent any connection requests yet. Start building your network!
            </p>
            <Link href="/students">
              <Button className="mt-4 bg-orange-500 hover:bg-orange-600">
                Find Students
              </Button>
            </Link>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="flex items-center px-6 py-4 bg-gray-50 border-b border-gray-100">
            <div className="w-12 mr-4"></div>
            <div className="flex-1 font-medium text-gray-600">Student</div>
            <div className="w-32 text-center font-medium text-gray-600 hidden sm:block">Branch</div>
            <div className="w-24 text-center font-medium text-gray-600 hidden sm:block">Year</div>
            <div className="w-28 text-center font-medium text-gray-600">Status</div>
            <div className="w-28 text-center font-medium text-gray-600">Action</div>
          </div>
          
          {requests.map((request: any) => (
            <div key={request._id} className="flex items-center px-6 py-4 border-b border-gray-100 hover:bg-gray-50">
              <div className="w-12 mr-4">
                <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center">
                  <span className="text-orange-500 font-bold">
                    {request.name.charAt(0).toUpperCase()}
                  </span>
                </div>
              </div>
              
              <div className="flex-1">
                <h3 className="font-medium text-gray-900">{request.name}</h3>
                <p className="text-xs text-gray-500">{request.collegename}</p>
              </div>
              
              <div className="w-32 text-center text-gray-600 text-sm hidden sm:block">{request.branch}</div>
              <div className="w-24 text-center text-gray-600 text-sm hidden sm:block">{request.year}</div>
              
              <div className="w-28 text-center">
                <span className="inline-block py-1 px-2 bg-yellow-50 text-yellow-600 rounded text-xs font-medium">
                  Pending
                </span>
              </div>
              
              <div className="w-28 text-center">
                <Link href={`/profile/${request._id}`}>
                  <Button variant="outline" size="sm" className="text-xs">View Profile</Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default RequestsPage