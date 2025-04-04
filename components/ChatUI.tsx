"use client"

import { useState } from 'react'
import Image from 'next/image'
import { User } from '@/lib/models/user'

interface ChatUIProps {
  friends: User[]
  currentUserId: string
}

export default function ChatUI({ friends, currentUserId }: ChatUIProps) {
  const [selectedFriend, setSelectedFriend] = useState<User | null>(null)

  return (
    <div className="flex h-[calc(100vh-80px)]">
      {/* Left Sidebar - Friends List */}
      <div className="w-1/3 border-r border-gray-200 overflow-y-auto">
        <div className="p-4">
          <h2 className="text-xl font-semibold mb-4">Messages</h2>
          <div className="space-y-2">
            {friends.map((friend) => (
              <div
                key={friend._id}
                className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer hover:bg-gray-100 ${
                  selectedFriend?._id === friend._id ? 'bg-gray-100' : ''
                }`}
                onClick={() => setSelectedFriend(friend)}
              >
                <div className="relative w-12 h-12">
                  <Image
                    src={friend.profileimage || "/assets/avatar.png"}
                    alt={friend.name}
                    fill
                    className="rounded-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-medium">{friend.name}</h3>
                  <p className="text-sm text-gray-500">{friend.collegename}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Section - Chat Area */}
      <div className="flex-1 flex flex-col">
        {selectedFriend ? (
          <>
            {/* Chat Header */}
            <div className="p-4 border-b border-gray-200 flex items-center gap-3">
              <div className="relative w-10 h-10">
                <Image
                  src={selectedFriend.profileimage || "/assets/avatar.png"}
                  alt={selectedFriend.name}
                  fill
                  className="rounded-full object-cover"
                />
              </div>
              <div>
                <h3 className="font-medium">{selectedFriend.name}</h3>
                <p className="text-sm text-gray-500">Online</p>
              </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 p-4 overflow-y-auto">
              <div className="space-y-4">
                {/* Sample message - Replace with actual messages */}
                <div className="flex items-start gap-2">
                  <div className="bg-gray-100 rounded-lg p-3 max-w-[70%]">
                    <p className="text-sm">Hello! How are you?</p>
                    <span className="text-xs text-gray-500">10:30 AM</span>
                  </div>
                </div>
                <div className="flex items-start gap-2 justify-end">
                  <div className="bg-orange-500 text-white rounded-lg p-3 max-w-[70%]">
                    <p className="text-sm">I'm good, thanks! How about you?</p>
                    <span className="text-xs text-white/80">10:32 AM</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Message Input */}
            <div className="p-4 border-t border-gray-200">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  placeholder="Type a message..."
                  className="flex-1 p-2 border border-gray-200 rounded-lg focus:outline-none focus:border-orange-500"
                />
                <button className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600">
                  Send
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <h3 className="text-xl font-semibold text-gray-500">Select a friend to start chatting</h3>
              <p className="text-gray-400">Choose a conversation from the list</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
} 