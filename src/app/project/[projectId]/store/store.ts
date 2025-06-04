import { create } from "zustand";

interface IdsForApplicant {
    projectId: number;
    loginUserId: number | undefined;
    projectCreatorId: number;
    setProjectId: (projectId: number) => void;
    setLoginUserId: (loginUserId: number | undefined) => void;
    setProjectCreatorId: (projectCreatorId: number) => void;
}

export const useIdsForApplicant = create<IdsForApplicant>((set) => ({
    projectId: 0,
    loginUserId: undefined,
    projectCreatorId: 0,
    setProjectId: (projectId: number) => set({ projectId }),
    setLoginUserId: (loginUserId: number | undefined) => set({ loginUserId }),
    setProjectCreatorId: (projectCreatorId: number) => set({ projectCreatorId }),
}));
