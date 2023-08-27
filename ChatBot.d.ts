import { ReactNode } from 'react';

// Define the message object type
interface ChatMessage {
  id: string;
  message: string;
  end: boolean;
}

// Define the props for the ChatBot component
interface ChatBotProps {
  steps: ChatMessage[];
}

// Define the ChatBot component
declare const ChatBot: React.FC<ChatBotProps>;

export default ChatBot;
