"use client"
import React, { useEffect, useState } from 'react'
import { ChatMessage, ChatMessageProps } from './chat-message'

function AiChatMessage({messages , isLoading}:{messages : ChatMessageProps[] , isLoading : boolean}) {

  const [fakeLoading , setFakeLoading] = useState<boolean>(messages.length === 0 ? true : false)

  useEffect(()=>{
    const timeId = setTimeout(()=>{
      setFakeLoading(false)
    },1000)

    return ()=>{
      clearTimeout(timeId)
    }
  },[])
  return (
    <div className = "flex-1  justify-center overflow-scroll    mb-6">
     <ChatMessage  textMode="1"   isLoading={fakeLoading} content='This is AI Assistant for you' role = "system"/>
     {/* loop over the actual help conversaion */}
     {messages.map((item)=>(
      <ChatMessage key={item.content}  textMode='1'  isLoading={false} content={item.content} role = {item.role}/>
     ))}

     {isLoading && <ChatMessage role = {"system"} isLoading={isLoading}/>}

    </div>
  )
}

export default AiChatMessage