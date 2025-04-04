import React from 'react'
import { fetchUserById } from '@/lib/actions/user.actions'
import { currentUser } from '@clerk/nextjs/server'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Mail, Phone, MapPin, Calendar, GraduationCap, BookOpen, User } from 'lucide-react'

type tParams=Promise<{id:string}>
const Page = async ({ params }: {params:tParams}) => {
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

  // Format date of birth
  const formatDate = (dateString: string) => {
    if (!dateString) return 'Not provided';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  // Get year suffix
  const getYearSuffix = (year: number) => {
    if (year === 1) return "st";
    if (year === 2) return "nd";
    if (year === 3) return "rd";
    return "th";
  };

  // Capitalize first letter
  const capitalizeFirstLetter = (string: string) => {
    if (!string) return '';
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        {/* Profile Header */}
        <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-8">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="w-32 h-32 rounded-full bg-white flex items-center justify-center overflow-hidden border-4 border-white shadow-lg">
              {userInfo.profileimage ? (
                <Image 
                  src={userInfo.profileimage} 
                  alt={userInfo.name} 
                  width={128} 
                  height={128}
                  className="object-cover"
                />
              ) : (
                <span className="text-orange-500 font-bold text-5xl">
                  {userInfo.name.charAt(0).toUpperCase()}
                </span>
              )}
            </div>
            <div className="text-center md:text-left">
              <h1 className="text-3xl font-bold text-white">{userInfo.name}</h1>
              <p className="text-orange-100 mt-1 text-lg">{userInfo.email}</p>
              <div className="mt-4 flex flex-wrap gap-2 justify-center md:justify-start">
                <Button variant="outline" className="bg-white/20 text-white border-white/30 hover:bg-white/30">
                  <Mail className="h-4 w-4 mr-2" />
                  Message
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Profile Content */}
        <div className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Academic Information */}
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-800 border-b pb-2">Academic Information</h2>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <GraduationCap className="h-5 w-5 text-orange-500 mt-0.5" />
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">College</h3>
                    <p className="mt-1 text-gray-900">{userInfo.collegename || 'Not provided'}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <BookOpen className="h-5 w-5 text-orange-500 mt-0.5" />
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Branch</h3>
                    <p className="mt-1 text-gray-900">{userInfo.branch || 'Not provided'}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Calendar className="h-5 w-5 text-orange-500 mt-0.5" />
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Year</h3>
                    <p className="mt-1 text-gray-900">
                      {userInfo.year ? `${userInfo.year}${getYearSuffix(userInfo.year)} Year` : 'Not provided'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Personal Information */}
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-800 border-b pb-2">Personal Information</h2>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <User className="h-5 w-5 text-orange-500 mt-0.5" />
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Gender</h3>
                    <p className="mt-1 text-gray-900">{capitalizeFirstLetter(userInfo.gender) || 'Not provided'}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Calendar className="h-5 w-5 text-orange-500 mt-0.5" />
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Date of Birth</h3>
                    <p className="mt-1 text-gray-900">{formatDate(userInfo.dob)}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Phone className="h-5 w-5 text-orange-500 mt-0.5" />
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Mobile</h3>
                    <p className="mt-1 text-gray-900">{userInfo.mobile || 'Not provided'}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-orange-500 mt-0.5" />
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Address</h3>
                    <p className="mt-1 text-gray-900">{userInfo.address || 'Not provided'}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-orange-500 mt-0.5" />
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Location</h3>
                    <p className="mt-1 text-gray-900">
                      {[userInfo.city, userInfo.district, userInfo.state]
                        .filter(Boolean)
                        .join(', ') || 'Not provided'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Page