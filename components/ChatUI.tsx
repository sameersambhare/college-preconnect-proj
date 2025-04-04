"use client"

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { pusherClient } from '@/lib/pusher'
import { sendMessage, fetchMessages } from '@/lib/actions/message.actions'

interface User{
  name:string;
  profileimage:string,
  _id:string,
  collegename:string;

}
interface ChatUIProps {
  friends: User[]
  currentUserId: string
}
export default function ChatUI({ friends, currentUserId }: ChatUIProps) {
  const [message,setMessage]=useState('');
  const [selectedFriend, setSelectedFriend] = useState<User | null>(null)
  const [messages, setMessages] = useState<{ text: string; sender: string; receiver: string; createdAt: Date }[]>([])

  const onSendMessage=async()=>{
    if (!selectedFriend) return;
    const messageObj={
      text:message,
      sender:currentUserId,
      receiver:selectedFriend._id,
    }
    await sendMessage(messageObj)
    setMessage('')
  }
  useEffect(()=>{
    pusherClient.subscribe('college-preconnect')
    pusherClient.bind('upcoming-message',(message: { text: string; sender: string; receiver: string; createdAt: Date })=>{
      setMessages((prev)=>[...prev,message])
    }) 
    return () => {
      pusherClient.unsubscribe('college-preconnect')
      pusherClient.unbind('upcoming-message')
    }
  },[])

  useEffect(() => {
    const loadMessages = async () => {
      if (selectedFriend) {
        const messages = await fetchMessages(currentUserId, selectedFriend._id);
        setMessages(messages);
      }
    };
    loadMessages();
  }, [selectedFriend, currentUserId]);

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
                {messages.map((msg, index) => (
                  <div
                    key={index}
                    className={`flex items-start gap-2 ${
                      msg.sender === currentUserId ? 'justify-end' : ''
                    }`}
                  >
                    {msg.sender !== currentUserId && (
                      <div className="relative w-8 h-8">
                        <Image
                          src={selectedFriend?.profileimage || "/assets/avatar.png"}
                          alt={selectedFriend?.name || "Receiver"}
                          fill
                          className="rounded-full object-cover"
                        />
                      </div>
                    )}
                    <div
                      className={`rounded-lg p-3 max-w-[70%] ${
                        msg.sender === currentUserId
                          ? 'bg-orange-500 text-white'
                          : 'bg-gray-100'
                      }`}
                    >
                      <p className="text-sm">{msg.text}</p>
                      <span className="text-xs text-gray-500">
                        {new Date(msg.createdAt).toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </span>
                    </div>
                    {msg.sender === currentUserId && (
                      <div className="relative w-8 h-8">
                        <Image
                          src={friends.find(f => f._id === currentUserId)?.profileimage || "/assets/avatar.png"}
                          alt="Sender"
                          fill
                          className="rounded-full object-cover"
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Message Input */}
            <div className="p-4 border-t border-gray-200">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={message}
                  placeholder="Type a message..."
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      onSendMessage()
                    }
                  }}
                  className="flex-1 p-2 border border-gray-200 rounded-lg focus:outline-none focus:border-orange-500"
                />
                <button
                  className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600"
                  onClick={onSendMessage}
                >
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