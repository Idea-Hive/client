import { create } from "zustand";

interface ProjectStore {
    projectId: number | null;
    setProjectId: (id: number) => void;
}

export const useProjectStore = create<ProjectStore>((set) => ({
    projectId: null,
    setProjectId: (id) => set({ projectId: id }),
}));