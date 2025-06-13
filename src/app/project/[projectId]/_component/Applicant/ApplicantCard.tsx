import { Applicant } from "@/apis/project/projectApis";
import { useIdsForApplicant } from "@/app/project/[projectId]/store/store";
import Card from "./Card";
import LockedCard from "./LockedCard";

export type CardState = "CONFIRMED" | "UNDECIDED" | "REJECTED";
export default function ApplicantCard({ state, applicant, projectCreatorName }: { state: CardState; applicant: Applicant; projectCreatorName: string }) {
    const { projectCreatorId, loginUserId } = useIdsForApplicant();

    // 프로젝트 개설자도 아니고, 해당 지원자도 아니면
    if (projectCreatorId !== loginUserId && applicant.memberId !== loginUserId) return <LockedCard />;
    // 프로젝트 개설자 이거나, 지원자이면
    else return <Card state={applicant.isAccepted} applicant={applicant} projectCreatorName={projectCreatorName} />;
}
