import { create } from "zustand";

interface ApplicantCardState {
    expandedCards: Record<number, boolean>;
    selectedApplicants: number[];
    setExpanded: (applicantId: number, isExpanded: boolean) => void;
    toggleSelected: (applicantId: number) => void;
    // 필요한 다른 상태와 액션들을 추가할 수 있습니다
}

export const useApplicantCardStore = create<ApplicantCardState>((set) => ({
    expandedCards: {},
    selectedApplicants: [],
    setExpanded: (applicantId, isExpanded) =>
        set((state) => ({
            expandedCards: { ...state.expandedCards, [applicantId]: isExpanded },
        })),
    toggleSelected: (applicantId) =>
        set((state) => ({
            selectedApplicants: state.selectedApplicants.includes(applicantId) ? state.selectedApplicants.filter((id) => id !== applicantId) : [...state.selectedApplicants, applicantId],
        })),
}));
