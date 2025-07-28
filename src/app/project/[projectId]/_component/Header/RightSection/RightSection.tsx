import Button from "@/components/Button";
import { ShareIcon, ViewIcon } from "@/components/icons/icons";
import Toast from "@/components/Toast";
import { useUserInfo } from "@/hooks/queries";
import { useParams } from "next/navigation";
import { useState } from "react";
import { useProjectDetail } from "../../../hooks/Hooks";
import ApplicantButton from "./ApplicantButton";
import Like from "./Like";
import ProjectOwnerControl from "./ProjectOwnerControl";
import RecruitAdditionalMemberButton from "./RecruitAdditionalMemberButton";
import StartProjectButton from "./StartProjectButton";

export default function RightSection() {
    const { projectId } = useParams();
    const { user } = useUserInfo();
    const { project } = useProjectDetail(Number(projectId), user);

    const [isCopied, setIsCopied] = useState<boolean>(false);

    if (!project) return null;
    return (
        <div className="flex flex-col justify-between">
            <div className="flex gap-3 items-center text-sm text-black">
                <div
                    className="flex gap-1.5 items-center cursor-pointer"
                    onClick={() => {
                        navigator.clipboard.writeText(window.location.href);
                        setIsCopied(true);
                    }}
                >
                    <ShareIcon />
                    공유하기
                </div>
                <div className="flex gap-1.5 items-center">
                    <Like />
                </div>
                <div className="flex gap-1.5 items-center">
                    <ViewIcon />
                    {project.viewCnt}
                </div>

                {user && project.creatorId === user.id && <ProjectOwnerControl />}
            </div>

            {user && (
                <div className="flex justify-end">
                    {/* 프로젝트 작성자 && 프로젝트 시작 전 */}
                    {project.creatorId === user.id && project.projectStatus === "RECRUITING" && <StartProjectButton projectId={project.projectId} isNew={project.isNew} />}
                    {/* 프로젝트 작성자 && 프로젝트 진행중 */}
                    {project.creatorId === user.id && project.projectStatus === "IN_PROGRESS" && <RecruitAdditionalMemberButton projectId={project.projectId} />}
                    {/* 지원자 && 아직 지원 안함 */}
                    {project.creatorId !== user.id && project.projectStatus === "RECRUITING" && !project.isApply && <ApplicantButton projectId={project.projectId} memberId={user.id} />}
                    {/* 지원자 && 지원 했음(확정도 포함) */}
                    {project.creatorId !== user.id && project.isApply && <Button label="지원완료" disabled={true} className="w-fit px-6" onClick={() => {}} />}
                </div>
            )}
            {isCopied && <Toast message="링크가 복사되었습니다." type="success" onClose={() => setIsCopied(false)} />}
        </div>
    );
}
