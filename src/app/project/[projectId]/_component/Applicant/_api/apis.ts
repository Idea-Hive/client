import { Apis } from "@/utils/api";
import { getToken } from "@/utils/utils";

interface HandleApplicantDecisionRequest {
    projectId: number;
    userId: number;
    applyId: number;
    decision: "CONFIRMED" | "REJECTED" | "UNDECIDED";
    rejectionMessage: string;
}

export const handleApplicantDecisionApi = async (body: HandleApplicantDecisionRequest) => {
    try {
        const token = getToken();

        return await Apis.post("/project/apply/decision", body, {
            withCredentials: true,
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
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
        const token = getToken();
        return await Apis.post("/project/apply/update", body, {
            withCredentials: true,
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    } catch (error) {
        console.error("onUpdateApplicantApplicationMessage Error:::", error);
        throw error;
    }
};
