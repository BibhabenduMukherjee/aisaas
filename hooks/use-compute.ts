import { create } from 'zustand';

interface useCreateComputeStore {
  isOpenCreate: boolean;
  onOpenCreate: () => void;
  onCloseCreate: () => void;
}



interface useStatusComputeStore {
    isOpenStatus: boolean;
    onOpenStatus: () => void;
    onCloseStatus: () => void;
  }
  


export const useCreateCompute = create<useCreateComputeStore>((set) => ({
    isOpenCreate: true,
    onOpenCreate: () => set({ isOpenCreate: true }),
    onCloseCreate: () => set({ isOpenCreate: false }),
}))

export const useStatusCompute = create<useStatusComputeStore>((set) => ({
    isOpenStatus: false,
    onOpenStatus: () => set({ isOpenStatus: true }),
    onCloseStatus: () => set({ isOpenStatus: false }),
}))