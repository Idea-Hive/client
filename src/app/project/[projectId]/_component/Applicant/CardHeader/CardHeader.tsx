import { Applicant } from "@/apis/project/projectApis";
import { Dispatch, SetStateAction } from "react";
import { useIdsForApplicant } from "../../../store/store";
import { CardState } from "../ApplicantCard";
import ApplicantCardControl from "./ApplicantCardControl";
import ProjectOwnerCardControlConfirmed from "./ProjectOwnerCardControlConfirmed";
import ProjectOwnerCardControlUnconfirmed from "./ProjectOwnerCardControlUnconfirmed";
import UserInfo from "./UserInfo";

export default function CardHeader({
    state,
    isEdit,
    setIsEdit,
    applicant,
    isReject,
    setIsReject,
}: {
    state: CardState;
    isEdit: boolean;
    setIsEdit: Dispatch<SetStateAction<boolean>>;
    applicant: Applicant;
    isReject: boolean;
    setIsReject: Dispatch<SetStateAction<boolean>>;
}) {
    const { projectCreatorId, loginUserId } = useIdsForApplicant();

    return (
        <div className={`flex justify-between ${projectCreatorId === loginUserId ? "items-center" : "items-start"}`}>
            <UserInfo applicant={applicant} state={state} />

            {!isEdit &&
                (projectCreatorId === loginUserId ? (
                    state === "CONFIRMED" ? (
                        <ProjectOwnerCardControlConfirmed applicantMemberId={applicant.memberId} applyId={applicant.applyId} />
                    ) : state === "UNDECIDED" ? (
                        <ProjectOwnerCardControlUnconfirmed applicantMemberId={applicant.memberId} applicantId={applicant.applyId} setIsReject={setIsReject} isReject={isReject} />
                    ) : null
                ) : state === "REJECTED" ? null : (
                    <ApplicantCardControl applicant={applicant} setIsEdit={setIsEdit} />
                ))}
        </div>
    );
}
