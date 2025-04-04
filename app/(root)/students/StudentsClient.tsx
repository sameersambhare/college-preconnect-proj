"use client"

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import ConnectButton from '@/components/ConnectButton'
import StudentFilters from '@/components/StudentFilters'
import { filterStudents } from '@/lib/actions/user.actions'
import { Button } from '@/components/ui/button'
import { User } from 'lucide-react'

interface StudentsClientProps {
  initialUsers: any[]
  currentUserId: string
}

export default function StudentsClient({ initialUsers, currentUserId }: StudentsClientProps) {
  const [users, setUsers] = useState<any[]>([])
  const [filteredUsers, setFilteredUsers] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  useEffect(() => {
    // Filter out the current user and users in their connections array
    const filteredInitialUsers = initialUsers.filter(user => 
      user._id !== currentUserId && 
      !initialUsers.find(u => u._id === currentUserId)?.connections?.includes(user._id)
    );
    
    setUsers(filteredInitialUsers);
    setFilteredUsers(filteredInitialUsers);
  }, [initialUsers, currentUserId]);

  const handleFilterChange = async (filters: any) => {
    try {
      setLoading(true)
      
      // Use the server action to filter students
      const result = await filterStudents({
        ...filters,
        currentUserId
      })
      setFilteredUsers(result)
    } catch (error) {
      console.error("Error filtering students:", error)
      setFilteredUsers([])
    } finally {
      setLoading(false)
    }
  }

  // Get unique values for filters
  const colleges = [...new Set(users.map(user => user.collegename))].filter(Boolean)
  const branches = [...new Set(users.map(user => user.branch))].filter(Boolean)
  const years = [...new Set(users.map(user => user.year))].filter(Boolean)
  const cities = [...new Set(users.map(user => user.city))].filter(Boolean)
  const districts = [...new Set(users.map(user => user.district))].filter(Boolean)
  const states = [...new Set(users.map(user => user.state))].filter(Boolean)
  const genders = [...new Set(users.map(user => user.gender))].filter(Boolean)

  return (
    <div className="container mx-auto py-6 md:py-10 px-4 md:px-6">
      <h1 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8 text-center">Connect with Students</h1>
      
      <StudentFilters
        colleges={colleges}
        branches={branches}
        years={years}
        cities={cities}
        districts={districts}
        states={states}
        genders={genders}
        onFilterChange={handleFilterChange}
      />

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <p>Loading students...</p>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          {/* Table header - hidden on mobile */}
          <div className="hidden md:grid md:grid-cols-6 gap-4 px-6 py-4 bg-gray-50 border-b border-gray-200 font-medium text-gray-700">
            <div className="col-span-2">Student</div>
            <div>College</div>
            <div>Branch</div>
            <div>Year</div>
            <div>Action</div>
          </div>
          
          {/* Table body */}
          <div className="divide-y divide-gray-200">
            {filteredUsers.map((item:any, index:any) => (
              <div key={index} className="block md:grid md:grid-cols-6 gap-4 px-4 md:px-6 py-4 hover:bg-gray-50">
                {/* Mobile view - card style */}
                <div className="md:hidden mb-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center shrink-0">
                      <Image 
                        src={item.profileimage || "/assets/avatar.png"} 
                        alt={`${item.name}'s avatar`} 
                        width={40} 
                        height={40}
                        className="rounded-full"
                      />
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">{item.name}</div>
                      <div className="text-sm text-gray-500">{item.email}</div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2 mb-3">
                    <div>
                      <span className="text-xs text-gray-500">College:</span>
                      <div className="text-sm text-gray-700">{item.collegename}</div>
                    </div>
                    <div>
                      <span className="text-xs text-gray-500">Branch:</span>
                      <div className="text-sm text-gray-700">{item.branch}</div>
                    </div>
                    <div>
                      <span className="text-xs text-gray-500">Year:</span>
                      <div className="text-sm text-gray-700">{item.year}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 mt-3">
                    <ConnectButton userId={currentUserId} targetId={item._id} />
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => router.push(`/profile/${item._id}`)}
                      className="flex items-center gap-1"
                    >
                      <User className="h-4 w-4" />
                      Profile
                    </Button>
                  </div>
                </div>
                
                {/* Desktop view - table style */}
                <div className="hidden md:flex md:col-span-2 items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center shrink-0">
                    <Image 
                      src={item.profileimage || "/assets/avatar.png"} 
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
                
                <div className="hidden md:block text-gray-600 truncate">{item.collegename}</div>
                <div className="hidden md:block text-gray-600 truncate">{item.branch}</div>
                <div className="hidden md:block text-gray-600">{item.year}</div>
                
                <div className="hidden md:flex items-center gap-2">
                  <ConnectButton userId={currentUserId} targetId={item._id} />
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => router.push(`/profile/${item._id}`)}
                    className="flex items-center gap-1"
                  >
                    <User className="h-4 w-4" />
                    Profile
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {!loading && filteredUsers.length === 0 && (
        <div className="text-center py-10 text-gray-500">
          No students found
        </div>
      )}
    </div>
  )
} 