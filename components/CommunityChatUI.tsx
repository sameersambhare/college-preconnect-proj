"use client"

import { useEffect, useState, useRef } from 'react'
import Image from 'next/image'
import { useParams, useRouter } from 'next/navigation'
import { pusherClient } from '@/lib/pusher'
import { sendCommunityMessage, fetchCommunityMessages } from '@/lib/actions/message.actions'
import { getCommunityList, getCommunityInfo } from '@/lib/actions/community.actions'

interface Community {
  _id: string;
  communityname: string;
  description: string;
  createdAt: Date;
  members: string[];
}

interface CommunityChatUIProps {
  currentUserId: string
}

export default function CommunityChatUI({ currentUserId }: CommunityChatUIProps) {
  const params = useParams();
  const router = useRouter();
  const communityId = params.id as string;
  
  const [message, setMessage] = useState('');
  const [communities, setCommunities] = useState<Community[]>([]);
  const [selectedCommunity, setSelectedCommunity] = useState<Community | null>(null);
  const [messages, setMessages] = useState<{ text: string; sender: string; senderName: string; createdAt: Date }[]>([]);
  const [showCommunityList, setShowCommunityList] = useState(true);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);
  const [messagesLoading, setMessagesLoading] = useState(false);

  const scrollToBottom = () => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  };

  const onSendMessage = async () => {
    if (!selectedCommunity || !message.trim()) return;
    const messageObj = {
      text: message,
      sender: currentUserId,
      communityId: selectedCommunity._id,
    };
    
    try {
      await sendCommunityMessage(messageObj);
      setMessage('');
      setTimeout(scrollToBottom, 10);
    } catch (error) {
      console.error("Error sending message:", error);
      alert("Failed to send message. Please try again.");
    }
  };

  // Load communities the user is a member of
  useEffect(() => {
    const loadCommunities = async () => {
      try {
        setLoading(true);
        const userCommunities = await getCommunityList(currentUserId);
        setCommunities(userCommunities || []);
        
        // If we have the communityId from the URL, set it as selected
        if (communityId) {
          try {
            const community = await getCommunityInfo(communityId, currentUserId);
            if (community) {
              setSelectedCommunity(community);
            } else {
              console.error("Community not found or access denied");
            }
          } catch (error) {
            console.error("Error fetching community:", error);
          }
        }
        
        setLoading(false);
      } catch (error) {
        console.error("Error loading communities:", error);
        setLoading(false);
      }
    };
    
    loadCommunities();
  }, [currentUserId, communityId, router]);

  useEffect(() => {
    const loadMessages = async () => {
      if (selectedCommunity) {
        try {
          setMessagesLoading(true);
          console.log("Fetching messages for community:", selectedCommunity._id);
          const communityMessages = await fetchCommunityMessages(selectedCommunity._id);
          
          if (Array.isArray(communityMessages)) {
            setMessages(communityMessages);
            console.log("Loaded messages:", communityMessages.length);
          } else {
            console.error("Expected array of messages but got:", typeof communityMessages);
            setMessages([]);
          }
          
          // On mobile, switch to chat view when a community is selected
          if (window.innerWidth < 768) {
            setShowCommunityList(false);
          }
          
          setTimeout(scrollToBottom, 100);
          setMessagesLoading(false);
        } catch (error) {
          console.error("Error loading messages:", error);
          setMessagesLoading(false);
          setMessages([]);
        }
      }
    };
    
    if (selectedCommunity?._id) {
      loadMessages();
    }
  }, [selectedCommunity]);

  // Subscribe to Pusher channel for the selected community
  useEffect(() => {
    if (!selectedCommunity) return;
    
    const channelName = `community-${selectedCommunity._id}`;
    console.log("Subscribing to Pusher channel:", channelName);
    
    pusherClient.subscribe(channelName);
    
    const messageHandler = (newMessage: { text: string; sender: string; senderName: string; createdAt: Date }) => {
      console.log("Received new message:", newMessage);
      setMessages((prev) => [...prev, newMessage]);
      setTimeout(scrollToBottom, 10);
    };
    
    pusherClient.bind('community-message', messageHandler);
    
    return () => {
      console.log("Unsubscribing from Pusher channel:", channelName);
      pusherClient.unsubscribe(channelName);
      pusherClient.unbind('community-message', messageHandler);
    }
  }, [selectedCommunity]);

  // Handle community selection change
  const handleCommunitySelect = async (community: Community) => {
    setSelectedCommunity(community);
    
    // Update the URL without a full page reload
    router.push(`/communities/${community._id}/chat`, { scroll: false });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[calc(100vh-80px)]">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading communities...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row h-[calc(100vh-80px)]">
      {/* Left Sidebar - Communities List (hidden on mobile when chat is open) */}
      <div className={`${showCommunityList ? 'block' : 'hidden'} md:block w-full md:w-1/3 border-r border-gray-200 overflow-y-auto`}>
        <div className="p-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Communities</h2>
            {selectedCommunity && (
              <button
                className="md:hidden bg-gray-100 p-2 rounded-full"
                onClick={() => setShowCommunityList(false)}
              >
                <span className="sr-only">View chat</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              </button>
            )}
          </div>
          
          {communities.length === 0 ? (
            <div className="text-center p-4">
              <p className="text-gray-500">You're not a member of any communities yet.</p>
            </div>
          ) : (
            <div className="space-y-2">
              {communities.map((community) => (
                <div
                  key={community._id}
                  className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer hover:bg-gray-100 ${
                    selectedCommunity?._id === community._id ? 'bg-gray-100' : ''
                  }`}
                  onClick={() => handleCommunitySelect(community)}
                >
                  <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold">
                    {community.communityname.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h3 className="font-medium">{community.communityname}</h3>
                    <p className="text-sm text-gray-500">{community.members.length} members</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Right Section - Chat Area (hidden on mobile when community list is showing) */}
      <div className={`${showCommunityList ? 'hidden' : 'block'} md:block flex-1 flex flex-col`}>
        {selectedCommunity ? (
          <>
            {/* Chat Header */}
            <div className="p-4 border-b border-gray-200 flex items-center gap-3">
              <button 
                className="md:hidden mr-2"
                onClick={() => setShowCommunityList(true)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </button>
              <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold">
                {selectedCommunity.communityname.charAt(0).toUpperCase()}
              </div>
              <div>
                <h3 className="font-medium">{selectedCommunity.communityname}</h3>
                <p className="text-sm text-gray-500">{selectedCommunity.members.length} members</p>
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
              {messagesLoading ? (
                <div className="flex items-center justify-center h-full">
                  <div className="text-center">
                    <div className="w-6 h-6 border-2 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
                    <p className="text-gray-500">Loading messages...</p>
                  </div>
                </div>
              ) : messages.length === 0 ? (
                <div className="flex items-center justify-center h-full">
                  <div className="text-center p-4">
                    <h3 className="text-xl font-semibold text-gray-500">No messages yet</h3>
                    <p className="text-gray-400">Be the first to send a message in this community</p>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  {messages.map((msg, index) => (
                    <div
                      key={index}
                      className={`flex items-start gap-2 ${
                        msg.sender === currentUserId ? 'justify-end' : ''
                      }`}
                    >
                      {msg.sender !== currentUserId && (
                        <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-white font-bold">
                          {msg.senderName?.charAt(0).toUpperCase() || '?'}
                        </div>
                      )}
                      <div
                        className={`rounded-lg p-3 max-w-[70%] ${
                          msg.sender === currentUserId
                            ? 'bg-orange-500 text-white'
                            : 'bg-gray-100'
                        }`}
                      >
                        {msg.sender !== currentUserId && (
                          <p className="text-xs font-medium mb-1 text-gray-600">
                            {msg.senderName || 'Unknown user'}
                          </p>
                        )}
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
                        <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold">
                          {currentUserId.charAt(0).toUpperCase()}
                        </div>
                      )}
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>
              )}
            </div>

            {/* Message Input */}
            <div className="p-4 border-t border-gray-200 sticky bottom-0 bg-white">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={message}
                  placeholder="Type a message to the community..."
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' && message.trim()) {
                      onSendMessage();
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
              <h3 className="text-xl font-semibold text-gray-500">Select a community to start chatting</h3>
              <p className="text-gray-400">Choose a community from the list</p>
              <button 
                className="md:hidden mt-4 px-4 py-2 bg-gray-100 rounded-lg text-gray-700"
                onClick={() => setShowCommunityList(true)}
              >
                View Communities
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}