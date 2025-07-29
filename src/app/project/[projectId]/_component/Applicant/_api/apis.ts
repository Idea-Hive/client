import { Apis } from "@/utils/api";

interface HandleApplicantDecisionRequest {
    projectId: number;
    userId: number;
    applyId: number;
    decision: "CONFIRMED" | "REJECTED" | "UNDECIDED";
    rejectionMessage: string;
}

export const handleApplicantDecisionApi = async (body: HandleApplicantDecisionRequest) => {
    try {
        return await Apis.postAuth("/project/apply/decision", body);
    } catch (error) {
        console.error("onHandleApplicantDecision Error:::", error);
        throw error;
    }
};

// 지원자 지원 메시지 수정
interface UpdateApplicantApplicationMessageRequest {
    projectId: number;
    memberId: number;
    applyId: number;
    message: string;
}

export const updateApplicantApplicationMessageApi = async (body: UpdateApplicantApplicationMessageRequest) => {
    try {
        return await Apis.postAuth("/project/apply/update", body);
    } catch (error) {
        console.error("onUpdateApplicantApplicationMessage Error:::", error);
        throw error;
    }
};
