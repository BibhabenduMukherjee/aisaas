"use client"
import React from 'react'
import { useChatBotModel } from '@/hooks/use-chatbot'
import { Button } from './ui/button'
function ChatBotCom() {
    const chatModal = useChatBotModel()
  return (
    <div>
          <div onClick={chatModal.onOpenChat} className=" cursor-pointer  fixed bottom-7 rounded-full right-2 w-10 h-10 bg-yellow-500">
          
</div>
    </div>
  )
}

export default ChatBotCom