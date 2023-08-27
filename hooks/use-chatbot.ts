import { create } from 'zustand';

interface useChatBotStore {
  isOpenChat: boolean;
  onOpenChat: () => void;
  onCloseChat: () => void;
}

export const useChatBotModel = create<useChatBotStore>((set) => ({
    isOpenChat: false,
    onOpenChat: () => set({ isOpenChat: true }),
    onCloseChat: () => set({ isOpenChat: false }),
}))