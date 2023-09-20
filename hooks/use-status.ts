import { create } from 'zustand';

interface useComputeStatusStore {
  reqStatus: string;
  setRequestStatus: (stat : string) => void;
 
}

export const useComputeStatus = create<useComputeStatusStore>((set) => ({
    reqStatus : "",
    setRequestStatus : (stat) => set({reqStatus:stat})
}))