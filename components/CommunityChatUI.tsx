"use client"
import React, { useEffect, useState } from 'react'
import { pusherClient } from '@/lib/pusher'
import { sendCommunityMessage } from '@/lib/actions/message.actions'
import { usePathname } from 'next/navigation'

interface Imessage{
    communityId:string,
    text:string,
  }
interface CommunityChatUIProps{
  currentUserId:string,
}
const CommunityChatUI:React.FC<CommunityChatUIProps> = ({currentUserId}) => {
const pathname=usePathname()
const pathnameParts=pathname.split('/')
const communityId=pathnameParts[2]
  const [message,setMessage]=useState('')
  const [messages,setMessages]=useState<Imessage[]>([])
  useEffect(()=>{
    const loadChats=async()=>{
    }
    loadChats()
  })
  const onSendMessage=async()=>{
    const messageObj={
      communityId:communityId,
      senderId:currentUserId,
      text:message,
    }
    await sendCommunityMessage(messageObj);
  }
  useEffect(()=>{
    pusherClient.subscribe(communityId)
    pusherClient.bind('upcoming-com-message',(message:{text:string,senderId:string,createdAt:Date})=>{
      console.log(`REALTIME MSG: ${message.text}`)
    })
  },[])
  return (
    <div>CommunityChatUI</div>
  )
}

export default CommunityChatUI