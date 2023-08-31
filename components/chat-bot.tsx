"use client"
import React, { useEffect, useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog'
import { Button } from './ui/button'
import { Separator } from './ui/separator'
import { useChatBotModel } from '@/hooks/use-chatbot'
import { Input } from './ui/input'
import  AiChatMessage  from './AiChatMessage'
function ChatBot() {
    const chatModal = useChatBotModel()
    const [isMounted, setIsMounted] = useState(false);
    useEffect(() => {
        setIsMounted(true);
      }, []);
    


  if (!isMounted) {
    return null;
  }
  return (
    <div>
         <Dialog open={chatModal.isOpenChat} onOpenChange={chatModal.onCloseChat}>
      <DialogContent>
        <DialogHeader className="space-y-4">
          <DialogTitle className="text-center">
            Your Personalized AI Assitance
          </DialogTitle>
          {/* <DialogDescription className="text-center space-y-2">
            Create
            <span className="text-sky-500 mx-1 font-medium">Custom AI</span>
            Companions!
          </DialogDescription> */}
        </DialogHeader>
        <Separator />
        <div className="flex flex-col max-w-lg ">
        <AiChatMessage/>
         <div className="flex w-full items-center space-x-2">
         <Input type="email" placeholder="Email" />
         
        <Button type="submit">Ask</Button>
         </div>
        
        </div>
      </DialogContent>
    </Dialog>
    </div>
  )
}

export default ChatBot