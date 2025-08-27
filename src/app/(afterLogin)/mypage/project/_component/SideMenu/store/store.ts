import { create } from "zustand";

interface UnSubmittedTaskStore {
    unSubmittedTask: number[];
    setUnSubmittedTask: (unSubmittedTask: number[]) => void;
}

export const useUnSubmittedTaskStore = create<UnSubmittedTaskStore>((set) => ({
    unSubmittedTask: [],
    setUnSubmittedTask: (unSubmittedTask: number[]) => set({ unSubmittedTask }),
}));
