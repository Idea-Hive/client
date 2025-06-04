import { Applicant } from "@/apis/project/projectApis";
import { useState } from "react";
import CardBody from "./CardBody";
import CardHeader from "./CardHeader";
import CardRejectSection from "./CardRejectSection";
import EditCard from "./EditCard";
import RejectCard from "./RejectCard";

export default function Card({ state, applicant, projectCreatorName }: { state: "default" | "locked" | "confirm" | "reject"; applicant: Applicant; projectCreatorName: string }) {
    const [isEdit, setIsEdit] = useState<boolean>(false); // 수정 모드 변경
    const [isReject, setIsReject] = useState<boolean>(false); // 거절 모드 변경

    return (
        <div className="w-full border border-n400 rounded-lg p-6 flex flex-col gap-4">
            {/* 프로젝트 지원자(projectCreatorId !== memberId) or 프로젝트 개설자 (어차피 프로젝트 개설자는 지원 자체를 못함) */}
            <CardHeader state={state} isEdit={isEdit} setIsEdit={setIsEdit} applicant={applicant} isReject={isReject} setIsReject={setIsReject} />

            {isEdit ? <EditCard setIsEdit={setIsEdit} applicant={applicant} /> : <CardBody applicant={applicant} />}
            {isReject && <RejectCard applicantMemberId={applicant.memberId} setIsReject={setIsReject} />}

            {applicant.isAccepted === "REJECTED" && <CardRejectSection projectCreatorName={projectCreatorName} rejectionMessage={applicant.rejectionMessage} />}
        </div>
    );
}
