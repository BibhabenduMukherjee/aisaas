"use client";
import React, { FormEvent, useEffect, useState } from "react";

import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { Separator } from "./ui/separator";
import { useChatBotModel } from "@/hooks/use-chatbot";
import { useRouter } from "next/navigation";
import { Input } from "./ui/input";
import AiChatMessage from "./AiChatMessage";
import { useCompletion } from "ai/react";
import { ChatMessageProps } from "./chat-message";
import { ChatForm } from "./chat-form";
function ChatBot() {
  const chatModal = useChatBotModel();
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();
  const [userMessages, setUserMessages] = useState<ChatMessageProps[]>([]);
  const { input, handleInputChange, isLoading, handleSubmit, setInput } =
    useCompletion({
      api: "/api/customchatbot",
      onFinish: (_prompt, completion) => {
        const systemMessage: ChatMessageProps = {
          role: "system",
          content: completion,
        };
        setUserMessages((current) => [...current, systemMessage]);
        setInput("");

        // router.refresh();
      },
    });

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    const userMessage: ChatMessageProps = {
      role: "user",
      content: input,
    };

    setUserMessages((current) => [...current, userMessage]);
    handleSubmit(e);
  };

  if (!isMounted) {
    return null;
  }
  return (
    <div>
      <Dialog
        className=" bg-amber-50 text-black/90 dark:text-white/70  dark:bg-slate-900  w-[370px] md:w-[480px]"
        open={chatModal.isOpenChat}
        handler={chatModal.onCloseChat}
      >
        <DialogBody divider>
          <div className="flex  flex-col max-h-screen">
            <div className = "flex">

            </div>
            <AiChatMessage messages={userMessages} isLoading={isLoading} />
            <div className="flex w-full items-center  space-x-2 mb-4 ">
              <ChatForm
                variant={"BotChatForm"}
                isLoading={isLoading}
                input={input}
                handleInputChange={handleInputChange}
                onSubmit={onSubmit}
              />
            </div>
          </div>
        </DialogBody>
      </Dialog>
    </div>
  );
}

export default ChatBot;
