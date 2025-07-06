import { MemberResponse } from "@/apis/project/manageApis";
import { create } from "zustand";

interface TeamStore {
    members: MemberResponse[];
    setMembers: (members: MemberResponse[]) => void;
}

export const useTeamStore = create<TeamStore>((set) => ({
    members: [],
    setMembers: (members) => set({ members }),
}));