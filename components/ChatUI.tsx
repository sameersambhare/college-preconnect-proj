"use client"

import { useEffect, useState, useRef } from 'react'
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
  const [showFriendsList, setShowFriendsList] = useState(true);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  };

  const onSendMessage=async()=>{
    if (!selectedFriend || !message.trim()) return;
    const messageObj={
      text:message,
      sender:currentUserId,
      receiver:selectedFriend._id,
    }
    await sendMessage(messageObj)
    setMessage('')
    setTimeout(scrollToBottom, 10);
  }
  useEffect(()=>{
    const senderid=currentUserId;
    const receiverid=selectedFriend?._id;
    const channelname=[senderid,receiverid].sort().join('-');
    pusherClient.subscribe(channelname)
    pusherClient.bind('upcoming-message',(message: { text: string; sender: string; receiver: string; createdAt: Date })=>{
      setMessages((prev)=>[...prev,message])
      setTimeout(scrollToBottom, 10);
    }) 
    return () => {
      pusherClient.unsubscribe('college-preconnect')
      pusherClient.unbind('upcoming-message')
    }
  },[currentUserId, selectedFriend])

  useEffect(() => {
    const loadMessages = async () => {
      if (selectedFriend) {
        const messages = await fetchMessages(currentUserId, selectedFriend._id);
        setMessages(messages);
        // On mobile, switch to chat view when a friend is selected
        if (window.innerWidth < 768) {
          setShowFriendsList(false);
        }
        setTimeout(scrollToBottom, 10);
      }
    };
    loadMessages();
  }, [selectedFriend, currentUserId]);

  return (
    <div className="flex flex-col md:flex-row h-[calc(100vh-80px)]">
      {/* Left Sidebar - Friends List (hidden on mobile when chat is open) */}
      <div className={`${showFriendsList ? 'block' : 'hidden'} md:block w-full md:w-1/3 border-r border-gray-200 overflow-y-auto`}>
        <div className="p-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Messages</h2>
            {selectedFriend && (
              <button
                className="md:hidden bg-gray-100 p-2 rounded-full"
                onClick={() => setShowFriendsList(false)}
              >
                <span className="sr-only">View chat</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              </button>
            )}
          </div>
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

      {/* Right Section - Chat Area (hidden on mobile when friend list is showing) */}
      <div className={`${showFriendsList ? 'hidden' : 'block'} md:block flex-1 flex flex-col`}>
        {selectedFriend ? (
          <>
            {/* Chat Header */}
            <div className="p-4 border-b border-gray-200 flex items-center gap-3">
              <button 
                className="md:hidden mr-2"
                onClick={() => setShowFriendsList(true)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </button>
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
            <div 
              ref={messagesContainerRef}
              className="flex-1 p-4 overflow-y-auto" 
              style={{ 
                scrollBehavior: 'smooth', 
                maxHeight: 'calc(100vh - 220px)',
                height: 'auto'
              }}
            >
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
                      <span className={`text-xs ${
                        msg.sender === currentUserId ? 'text-white/80' : 'text-gray-500'
                      }`}>
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
                <div ref={messagesEndRef} />
              </div>
            </div>

            {/* Message Input */}
            <div className="p-4 border-t border-gray-200 sticky bottom-0 bg-white">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={message}
                  placeholder="Type a message..."
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' && message.trim()) {
                      onSendMessage()
                    }
                  }}
                  className="flex-1 p-2 border border-gray-200 rounded-lg focus:outline-none focus:border-orange-500"
                />
                <button
                  className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600"
                  onClick={onSendMessage}
                  disabled={!message.trim()}
                >
                  Send
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center p-4">
              <h3 className="text-xl font-semibold text-gray-500">Select a friend to start chatting</h3>
              <p className="text-gray-400">Choose a conversation from the list</p>
              <button 
                className="md:hidden mt-4 px-4 py-2 bg-gray-100 rounded-lg text-gray-700"
                onClick={() => setShowFriendsList(true)}
              >
                View Contacts
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
} 