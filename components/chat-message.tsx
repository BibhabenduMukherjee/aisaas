"use client";

import { BeatLoader } from "react-spinners";
import { Copy, Loader2, Nfc, Play, Speaker } from "lucide-react";
import { useTheme } from "next-themes";

import { cn } from "@/lib/utils";
import { BotAvatar } from "@/components/bot-avatar";
import { UserAvatar } from "@/components/user-avatar";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useRef, useState } from "react";
import axios from "axios";

export interface ChatMessageProps {
  role: "system" | "user";
  content?: string;
  isLoading?: boolean;
  src?: string;
  textMode?: string;
}
type AudioElementType = HTMLAudioElement | null;
export const ChatMessage = ({
  role,
  content,
  textMode,
  isLoading,
  src,
}: ChatMessageProps) => {
  const { toast } = useToast();
  const { theme } = useTheme();
  const [isSpeackOn, setIsSpeackOn] = useState<boolean>(false);
  const [isSpeackAble, setIsSpeackAble] = useState<boolean>(
    textMode === "1" ? true : false
  );
  const audioRef = useRef<AudioElementType>(null);
  const [audioData, setAudioData] = useState("");
  const [a, sA] = useState<string>("");

  const playAudio = (audioData: string) => {
    if (audioRef.current) {
      audioRef.current.src = audioData;
      audioRef.current.onerror = (error) => {
        console.error("Audio playback error:", error);
      };

      // Load the audio source and then play it
      audioRef.current.load();
      audioRef.current
        .play()
        .then(() => {
          // Audio playback
          console.log("Audio playback started");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const onCopy = () => {
    if (!content) {
      return;
    }

    navigator.clipboard.writeText(content);
    toast({
      description: "Message copied to clipboard.",
      duration: 2000,
    });
  };
  async function handleSpeaker() {
    if (!content) return;
    //alert(content);
    try {
      setAudioData("");
      setIsSpeackOn(true);
      const response = await axios.post("/api/batch", { text: content });
      console.log(response);

      setAudioData(response.data);
      setIsSpeackOn(false);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div
      className={cn(
        "group flex items-start gap-x-2 max-w-2xl   py-4 w-full",
        role === "user" && "justify-end"
      )}
    >
      {role !== "user" && src && <BotAvatar src={src} />}
      <div className="rounded-md px-4 py-2 max-w-sm text-sm bg-primary/10">
        {isLoading ? (
          <BeatLoader color={theme === "light" ? "black" : "white"} size={5} />
        ) : (
          <p className="text-sm">{content}</p>
        )}
      </div>
      {role === "user" && <UserAvatar />}
      {role !== "user" && !isLoading && !isSpeackAble ? (
        <>
          {audioData ? (
            ""
          ) : (
            <Button
              onClick={onCopy}
              className="opacity-0 group-hover:opacity-100 transition"
              size="icon"
              variant="ghost"
            >
              <Copy className="w-4 h-4" />
            </Button>
          )}
        </>
      ) : (
        <>
          {isSpeackOn ? (
            ""
          ) : (
            <>
              {audioData ? (
                ""
              ) : (
                <Button
                  onClick={handleSpeaker}
                  className="opacity-0 group-hover:opacity-100 transition"
                  size="icon"
                  variant="ghost"
                >
                  <Nfc className="w-4 h-4" />

                  <div>
                    {audioData && <audio ref={audioRef} className=""></audio>}
                  </div>
                </Button>
              )}
            </>
          )}
        </>
      )}
      {role !== "user" && !isLoading && audioData ? (
        <Button
          onClick={() => {
            playAudio(audioData);
          }}
          className="opacity-0 group-hover:opacity-100 transition"
          size="icon"
          variant="ghost"
        >
          <Play className="w-4 h-4" />

          <div>{audioData && <audio ref={audioRef} className=""></audio>}</div>
        </Button>
      ) : (
        ""
      )}
      {role !== "user" && !isLoading && isSpeackOn && (
        <Button
          className="opacity-0 group-hover:opacity-100 transition"
          size="icon"
          variant="ghost"
        >
          <Loader2 className=" animate-spin  w-4 h-4" />
        </Button>
      )}
    </div>
  );
};
