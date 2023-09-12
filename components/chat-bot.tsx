"use client"
import React, { FormEvent, useEffect, useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog'

import { Separator } from './ui/separator'
import { useChatBotModel } from '@/hooks/use-chatbot'
import { useRouter } from "next/navigation";
import { Input } from './ui/input'
import  AiChatMessage  from './AiChatMessage'
import { useCompletion } from 'ai/react'
import { ChatMessageProps } from './chat-message'
import { ChatForm } from './chat-form'
function ChatBot() {
    const chatModal = useChatBotModel()
    const [isMounted, setIsMounted] = useState(false);
    const router = useRouter()
    const [userMessages , setUserMessages] = useState<ChatMessageProps[]>([]);
    const {input , handleInputChange , isLoading, handleSubmit,setInput} = useCompletion({
      api : "/api/customchatbot",
      onFinish : (_prompt , completion)=>{
         const systemMessage : ChatMessageProps = {
          role : "system",
          content : completion
         }
         setUserMessages((current) => [...current, systemMessage]);
         setInput("");

        // router.refresh();
      }
    });

    useEffect(() => {
        setIsMounted(true);
      }, []);
    
  const onSubmit = (e: FormEvent<HTMLFormElement>)=>{
    const userMessage: ChatMessageProps = {
      role: "user",
      content: input
    };

    setUserMessages((current) => [...current,userMessage])
    handleSubmit(e);
  }

  if (!isMounted) {
    return null;
  }
  return (
    <div>
         <Dialog open={chatModal.isOpenChat} onOpenChange={chatModal.onCloseChat}>
      <DialogContent className="" >
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
        <div className="flex flex-col   ">
          
        <AiChatMessage messages={userMessages} isLoading = {isLoading}/>
         <div className="flex w-full items-center space-x-2 ">
          <ChatForm variant = {"BotChatForm"} isLoading={isLoading} input = {input} handleInputChange={handleInputChange} onSubmit={onSubmit} />
         </div>
        
        </div>
      </DialogContent>
    </Dialog>
    </div>
  )
}

export default ChatBot