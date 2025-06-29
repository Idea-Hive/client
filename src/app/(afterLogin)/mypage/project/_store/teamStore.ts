import { create } from "zustand";

interface TeamMember {
    id: number;
    name: string;
    job: string;
    profileUrl: string;
    isDeleted: boolean;
    isVerified: boolean;
}

interface TeamStore {
    members: TeamMember[];
    setMembers: (members: TeamMember[]) => void;
}

export const useTeamStore = create<TeamStore>((set) => ({
    members: [],
    setMembers: (members) => set({ members }),
}));