"use client"
import React from 'react'
import { useChatBotModel } from '@/hooks/use-chatbot'
import { Button } from './ui/button'
import Image from 'next/image'
function ChatBotCom() {
    const chatModal = useChatBotModel()
  return (
    <div>
          <div onClick={chatModal.onOpenChat} className=" cursor-pointer  fixed bottom-7 rounded-full right-2 w-10 h-10 ">
           <Image src= "https://cdn.sanity.io/images/l2tpt56d/production/95a3a6e889732e7ac0362cc4fd2fb1fa7ef49f63-4167x4167.png" loading='lazy'  alt="" fill />
          </div>
    </div>
  )
}

export default ChatBotCom