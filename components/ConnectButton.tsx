"use client"

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { sendConnectionRequest } from '@/lib/actions/user.actions'
const ConnectButton = ({ userId, targetId }: { userId: string, targetId: string }) => {
  console.log(userId,targetId);
  const [isLoading, setIsLoading] = useState(false)
  const [status, setStatus] = useState<'idle' | 'success' | 'error' | 'already_sent'>('idle')
  const [message, setMessage] = useState("")
  
  const handleConnect = async () => {
    if (!userId) return
    
    try {
      setIsLoading(true)
      const response = await sendConnectionRequest(userId, targetId)
      
      if (response.success) {
        setStatus('success')
      } else {
        // Handle the case when request is already sent
        setStatus('already_sent')
        setMessage(response.message)
      }
    } catch (err) {
      console.log(err)
      setStatus('error')
    } finally {
      setIsLoading(false)
    }
  }
  
  if (status === 'success') {
    return (
      <Button disabled className="bg-green-500 text-white py-1 px-3 rounded text-sm">
        Request Sent
      </Button>
    )
  }
  
  if (status === 'already_sent') {
    return (
      <Button disabled className="bg-gray-300 text-gray-600 py-1 px-3 rounded text-sm">
        Already Sent
      </Button>
    )
  }
  
  return (
    <Button
      onClick={handleConnect}
      disabled={isLoading}
      className="bg-orange-500 hover:bg-orange-600 text-white font-medium py-1 px-3 rounded text-sm"
    >
      {isLoading ? 'Sending...' : 'Connect'}
    </Button>
  )
}

export default ConnectButton 