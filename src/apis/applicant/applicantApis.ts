import { Apis } from "@/utils/api";

interface HandleApplicantDecisionRequest {
    projectId: number;
    memberId: number;
    decision: "CONFIRMED" | "REJECTED" | "UNDECIDED";
    rejectionMessage: string;
}

export const handleApplicantDecisionApi = async (body: HandleApplicantDecisionRequest) => {
    try {
        console.log("handleApplicantDecisionApi body:::", body);
        const token = document.cookie
            .split("; ")
            .find((row) => row.startsWith("token="))
            ?.split("=")[1];
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
    message: string;
}

export const updateApplicantApplicationMessageApi = async (body: UpdateApplicantApplicationMessageRequest) => {
    try {
        const token = document.cookie
            .split("; ")
            .find((row) => row.startsWith("token="))
            ?.split("=")[1];
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
